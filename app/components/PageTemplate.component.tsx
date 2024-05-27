import Image from 'next/image';
import { ComponentType, ReactNode } from 'react';

interface PageTemplateProps {
  children: ReactNode;
}

export const PageTemplate: ComponentType<PageTemplateProps> = ({ children }) => {
  return (
    <main className="flex min-h-[50%] flex-col items-center justify-between p-24">
      <section className="page-content w-full mx-auto">
        <div className="absolute left-1/2 ml-[-170px] mt-[-70px]">
          <Image src={'/images/aa_seal.png'} width={200} height={141} alt="wax seal" />
        </div>

        <div className="py-24 px-12">{children}</div>
      </section>
    </main>
  );
};
