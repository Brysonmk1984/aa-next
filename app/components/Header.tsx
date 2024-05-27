'use client';

import ProfileClient from './ProfileClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { Links } from './Links.component';

interface HeaderProps {
  setOpenSidebar: (open: boolean) => void;
}

export default function Header({ setOpenSidebar }: HeaderProps) {
  return (
    <header>
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-5">
          <Link href={'/'}>
            <Image
              id="logo"
              className=" opacity-75"
              src="/images/aa_monogram.png"
              height={115}
              width={115}
              alt="Armies of Avalore"
            />
          </Link>

          <div>
            <div id="siteTitle" className="sm:text-5xl text-4xl opacity-90 font-sans">
              <Link href={'/'}>
                Armies <span className="sm:text-xl text-sm">of</span> Avalore
              </Link>
            </div>
            <p className="sm:block hidden opacity-75">
              An incremental strategy game set in a realm of medieval fantasy
            </p>
          </div>
        </div>
        <nav id="desktop-nav" className=" lg:flex  hidden gap-6  justify-end items-center font-serif text-xl">
          <Links />
        </nav>
      </div>
      <div className=" absolute right-4 top-4" onClick={() => setOpenSidebar(true)}>
        <GiHamburgerMenu className=" lg:hidden hover:text-light-ivory cursor-pointer block text-4xl" />
      </div>
    </header>
  );
}
