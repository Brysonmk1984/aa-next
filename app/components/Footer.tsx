'use client';

import ProfileClient from './ProfileClient';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="p-2 relative  bg-black h-[350px] text-center border-t-2 border-t-red">
      <div className="z-20 relative block w-full h-full ">
        <div className="flex flex-col items-center justify-center h-full">
          <strong className="font-bold text-xl ">
            &copy; Armies <span className="font-thin text-sm">of</span> Avalore {new Date().getFullYear()}
          </strong>

          <p className="text-sm">An incremental strategy game set in a realm of medieval fantasy</p>
        </div>
      </div>

      <div className=" z-10 absolute top-10 left-1/2 ml-[-125px]">
        <Image id="watermark" className=" opacity-25" src="/images/aa_monogram.png" height={250} width={250} alt="" />
      </div>
    </footer>
  );
}
