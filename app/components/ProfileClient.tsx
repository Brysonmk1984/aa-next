'use client';

import { ResolvedUser } from '@/types';
import Link from 'next/link';
import { ComponentType } from 'react';

interface IProfileClient {
  user: ResolvedUser | null;
}
export const ProfileClient: ComponentType<IProfileClient> = ({ user }) => {
  if (!user) return <Link href="/api/auth/login">Login</Link>;

  return user && <Link href="/api/auth/logout">Logout</Link>;
};
