import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ContentWrapper } from './components/ContentWrapper.component';
import { getAuth0Session } from './actions/getAuth0Session.action';
import { Nation, NationArmy, User } from './types';
import { decode } from 'jsonwebtoken';
import { NationProvider } from './contexts';
import { getNationAndArmies, handleUserUpdateCheck } from './services';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AoA',
  description: 'An incremental strategy game set in a realm of medieval fantasy',
};

interface Session {
  user: User;
  accessToken: string;
}

const handleSession = async (
  session: Session,
): Promise<
  | {
      nation: Nation;
      armies: NationArmy[];
    }
  | undefined
> => {
  if (session) {
    const decodedToken = decode(session.accessToken);
    if (typeof decodedToken === 'string' || decodedToken === null) {
      return;
    }

    if (Date.now() >= decodedToken.exp * 1000) {
      console.log(
        'EXPIRED Access token',
        Date.now(),
        decodedToken.exp,
        `Now is later than exp date: ${Date.now() > decodedToken.exp}`,
      );
      return;
    }

    const { id: userId } = await handleUserUpdateCheck(session.user);

    return await getNationAndArmies(userId);
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth0Session();
  let nation: Nation = null;
  let armies: NationArmy[] = [];

  const result = await handleSession(session);

  if (result) {
    ({ nation, armies } = result);
  }
  return (
    <html lang="en">
      <UserProvider>
        <NationProvider nation={nation} armies={armies}>
          <body className={inter.className}>
            <ContentWrapper>{children}</ContentWrapper>
          </body>
        </NationProvider>
      </UserProvider>
    </html>
  );
}
