import Image from 'next/image';
import { API_ENDPOINT } from './configs/environment.config';

import { getSession } from '@auth0/nextjs-auth0';
import { ResolvedUser, User } from './types';
import { getArmies } from './services/army';
import { handleUserUpdateCheck } from './services/user';
import { Session } from 'inspector';

export default async function Home() {
  const userSession = await getSession();

  if (!!userSession?.user) {
    await handleUserUpdateCheck(userSession.user as User);
  }

  const armies = await getArmies();

  return (
    <main className="flex min-h-[50%] flex-col items-center justify-between p-24">
      <section className="page-content w-full  mx-auto ">
        <div className=" w-1/2 mx-auto text-center">
          <p className="">
            <span>List of armies:</span>
          </p>
        </div>

        <div className="text-center">
          <ul>
            {armies.map((army) => (
              <li key={army.id}>{army.name}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
