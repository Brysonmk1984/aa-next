'use client';

import ProfileClient from './ProfileClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';

interface HeaderProps {
  setOpenSidebar: (open: boolean) => void;
}

export default function Header({ setOpenSidebar }: HeaderProps) {
  const { user, isLoading } = useUser();

  return (
    <header>
      <div className="flex justify-between p-2">
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
            <h1 className="sm:text-5xl text-2xl opacity-90 font-sans">
              Armies <span className="sm:text-xl text-sm">of</span> Avalore
            </h1>
            <p className="sm:block hidden opacity-75">
              An incremental strategy game set in a realm of medieval fantasy
            </p>
          </div>
        </div>
        <nav id="desktop-nav" className=" lg:flex  hidden gap-6  justify-end items-center font-serif text-xl">
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
      </div>
      <div className=" absolute right-4 top-4" onClick={() => setOpenSidebar(true)}>
        <GiHamburgerMenu className=" lg:hidden hover:text-light-ivory cursor-pointer block text-4xl" />
      </div>
    </header>
  );
}
