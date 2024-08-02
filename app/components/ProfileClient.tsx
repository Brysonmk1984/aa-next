'use client';

import { ResolvedUser } from '@/types';
import { ComponentType } from 'react';

interface IProfileClient {
  user: ResolvedUser | null;
}
export const ProfileClient: ComponentType<IProfileClient> = ({ user }) => {
  if (!user) return <a href="/api/auth/login">Login</a>;

  return user && <a href="/api/auth/logout">Logout</a>;
};
