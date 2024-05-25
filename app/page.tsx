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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <p className="flex justify-center  border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <span>List of armies:</span>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <ul>
          {armies.map((army) => (
            <li key={army.id}>{army.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
