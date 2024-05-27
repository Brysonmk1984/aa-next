'use client';
import { ComponentType, ReactNode, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Sidebar } from './SideBar.component';

interface ContentWrapperProps {
  children: ReactNode;
}

export const ContentWrapper: ComponentType<ContentWrapperProps> = ({ children }) => {
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
