import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from './components/Header';
import Footer from './components/Footer';
import { Sidebar } from './components/SideBar.component';
import { useState } from 'react';
import { ContentWrapper } from './components/ContentWrapper.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AoA',
  description: 'An incremental strategy game set in a realm of medieval fantasy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <ContentWrapper>{children}</ContentWrapper>
        </body>
      </UserProvider>
    </html>
  );
}
