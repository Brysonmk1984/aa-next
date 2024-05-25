'use client';

import ProfileClient from './ProfileClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="flex justify-between p-2">
      <div className="flex items-center gap-5">
        <Image
          id="logo"
          className=" opacity-75"
          src="/images/aa_monogram.png"
          height={115}
          width={115}
          alt="Armies of Avalore"
        />

        <div>
          <h1 className="text-5xl opacity-90 font-sans">
            Armies <span className=" text-xl">of</span> Avalore
          </h1>
          <p className=" opacity-75">An incremental strategy game set in a realm of medieval fantasy</p>
        </div>
      </div>
      <nav className="flex gap-6 justify-end items-center font-serif text-xl">
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
