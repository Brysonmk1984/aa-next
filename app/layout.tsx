import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider as AuthZeroUserProvider } from '@auth0/nextjs-auth0/client';
import { ContentWrapper } from './components/ContentWrapper.component';
import { Auth0Session, getAuth0Session } from './actions/getAuth0Session.action';
import { decode } from 'jsonwebtoken';
import { NationProvider } from './contexts';
import { getHighestLevelCompleted, getNationAndArmies, handleUserUpdateCheck } from './services';
import UserProvider from './contexts/user/User.context';
import { ResolvedSessionInfo, initialProviderValues } from './configs/initialValues.config';
import { NationCampaignDetails } from './types/campaign.type';
import { determineIncome } from './utils';

export const fetchCache = 'force-no-store';

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
      `Now is later than exp date: ${Date.now() > (decodedToken?.exp ?? 0)}`,
    );
    return initialProviderValues;
  }

  const user = await handleUserUpdateCheck(session.user);

  const { nation, armies } = await getNationAndArmies(user.id);

  const highestLevelCompleted = await getHighestLevelCompleted(nation.id);
  nation.income = determineIncome(highestLevelCompleted);
  const campaign: NationCampaignDetails = {
    highestLevelCompleted,
  };

  return {
    user,
    nation,
    armies,
    campaign,
  };
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth0Session();

  const { user, nation, armies, campaign } = await getProviderData(session);

  return (
    <html lang="en">
      <AuthZeroUserProvider>
        <UserProvider user={user} isAuthenticated={!!user}>
          <NationProvider nation={nation} armies={armies} campaign={campaign}>
            <body className={inter.className}>
              <ContentWrapper>{children}</ContentWrapper>
            </body>
          </NationProvider>
        </UserProvider>
      </AuthZeroUserProvider>
    </html>
  );
}
