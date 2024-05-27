import Image from 'next/image';
import { API_ENDPOINT } from './configs/environment.config';

import { getSession } from '@auth0/nextjs-auth0';
import { ResolvedUser, User } from './types';
import { getArmies } from './services/army';
import { handleUserUpdateCheck } from './services/user';
import { Session } from 'inspector';
import { PageTemplate } from './components/PageTemplate.component';

export default async function Home() {
  const userSession = await getSession();

  if (!!userSession?.user) {
    await handleUserUpdateCheck(userSession.user as User);
  }

  const armies = await getArmies();

  return (
    <PageTemplate>
      <div className=" w-1/2 mx-auto text-center">
        <h1>List of armies</h1>

        <div className="text-center">
          <ul>
            {armies.map((army) => (
              <li key={army.id}>{army.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageTemplate>
  );
}
