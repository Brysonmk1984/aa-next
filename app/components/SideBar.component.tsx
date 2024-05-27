'use client';

import { slide as Menu } from 'react-burger-menu';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Links } from './Links.component';

interface SidebarProps {
  menuOpen: boolean;
  handleOnClose: (isOpen: boolean) => void;
}
export const Sidebar = ({ menuOpen, handleOnClose }: SidebarProps) => {
  return (
    <Menu isOpen={menuOpen} onClose={() => handleOnClose(false)} right>
      {/* <a href="/armies" className="font-serif">
        Armies
      </a>
      <a href="/campaign">Campaign</a>
      <a href="/nations">Nations</a>

      {user && <a href="/kingdom">Kingdom</a>}
      {user && <a href="/buy">Buy</a>}

      <ProfileClient className={'bm-item w-full'} user={user} isLoading={isLoading} /> */}

      <Links />
    </Menu>
  );
};
