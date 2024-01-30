'use client';

import ProfileClient from './ProfileClient';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="flex justify-between  p-6">
      <div>
        <h1 className="text-red">Armies of Avalore</h1>
        <p>An incremental strategy game set in a realm of medieval fantasy</p>
        <p>Battle for territory and control the Avalore! </p>
      </div>
      <nav className="flex gap-3 justify-end">
        <a href="/armies">Armies</a>
        <a href="/campaign">Campaign</a>
        <a href="/nations">Nations</a>
        {user && (
          <>
            <a href="/kingdom">Kingdom</a>
            <a href="/buy">Buy</a>
          </>
        )}

        <ProfileClient user={user} isLoading={isLoading} />
      </nav>
    </header>
  );
}
