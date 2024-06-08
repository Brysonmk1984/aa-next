import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ContentWrapper } from './components/ContentWrapper.component';
import { getAuth0Session } from './actions/getAuth0Session.action';
import { Nation, NationArmy } from './types';

import { NationProvider } from './contexts';
import { getNationAndArmies, handleUserUpdateCheck } from './services';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AoA',
  description: 'An incremental strategy game set in a realm of medieval fantasy',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth0Session();
  let nation: Nation = null;
  let armies: NationArmy[] = [];
  console.log('HERERRRERERE', session);

  if (session) {
    const { id: userId } = await handleUserUpdateCheck(session.user);
    ({ nation, armies } = await getNationAndArmies(userId));
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
