'use client';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';

interface IProfileClient {
  className?: string;
  user: UserProfile | undefined;
  isLoading: boolean;
}
export default function ProfileClient(props: IProfileClient) {
  const { user, isLoading, className = '' } = props;
  console.log({ user });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!user)
    return (
      <a href="/api/auth/login" className={className}>
        Login
      </a>
    );

  return (
    user && (
      <a href="/api/auth/logout" className={className}>
        Logout
      </a>
    )
  );
}
