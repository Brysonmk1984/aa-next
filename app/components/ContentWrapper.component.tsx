'use client';
import { ComponentType, ReactNode, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Sidebar } from './SideBar.component';

export const ContentWrapper: ComponentType<{ children: ReactNode }> = ({ children }) => {
  const [openSideBar, setOpenSidebar] = useState(false);
  return (
    <>
      <Sidebar menuOpen={openSideBar} handleOnClose={(isOpen) => setOpenSidebar(isOpen)} />
      <Header setOpenSidebar={setOpenSidebar} />
      {children}
      <Footer />
    </>
  );
};
