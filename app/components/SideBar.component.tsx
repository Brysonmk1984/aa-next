'use client';

import { slide as Menu } from 'react-burger-menu';
import { Links } from './Links.component';

interface SidebarProps {
  menuOpen: boolean;
  handleOnClose: (isOpen: boolean) => void;
}
export const Sidebar = ({ menuOpen, handleOnClose }: SidebarProps) => {
  return (
    <Menu isOpen={menuOpen} onClose={() => handleOnClose(false)} right>
      <Links />
    </Menu>
  );
};
