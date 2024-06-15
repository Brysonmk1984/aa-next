import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider as AuthZeroUserProvider } from '@auth0/nextjs-auth0/client';
import { ContentWrapper } from './components/ContentWrapper.component';
import { Auth0Session, getAuth0Session } from './actions/getAuth0Session.action';
import { decode } from 'jsonwebtoken';
import { NationProvider } from './contexts';
import { getNationAndArmies, handleUserUpdateCheck } from './services';
import UserProvider from './contexts/user/User.context';
import { ResolvedSessionInfo, initialProviderValues } from './configs/initialValues.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AoA',
  description: 'An incremental strategy game set in a realm of medieval fantasy',
};

const getProviderData = async (session: Auth0Session): Promise<ResolvedSessionInfo> => {
  if (!(session.user && session.accessToken)) {
    return initialProviderValues;
  }

  const decodedToken = decode(session.accessToken);
  if (typeof decodedToken === 'string' || typeof decodedToken === undefined || decodedToken === null) {
    return initialProviderValues;
  } else if (Date.now() >= (decodedToken?.exp ?? 0) * 1000) {
    console.log(
      'EXPIRED Access token',
      Date.now(),
      decodedToken.exp,
      `Now is later than exp date: ${Date.now() > decodedToken.exp}`,
    );
    return initialProviderValues;
  }

  const user = await handleUserUpdateCheck(session.user);

  const { nation, armies } = await getNationAndArmies(user.id);

  return {
    user,
    nation,
    armies,
  };
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth0Session();

  const { user, nation, armies } = await getProviderData(session);

  console.log(user, nation, armies);

  return (
    <html lang="en">
      <AuthZeroUserProvider>
        <UserProvider user={user}>
          <NationProvider nation={nation} armies={armies}>
            <body className={inter.className}>
              <ContentWrapper>{children}</ContentWrapper>
            </body>
          </NationProvider>
        </UserProvider>
      </AuthZeroUserProvider>
    </html>
  );
}
