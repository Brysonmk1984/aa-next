'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <a href="/api/auth/login">Login</a>;

  return (
    user && (
      <div>
        <a href="/api/auth/logout">Logout</a>
        {user?.picture ? (
          <Image src={user.picture} width={50} height={50} alt={user?.name || ''} />
        ) : (
          <h3>{user?.nickname ?? user?.name ?? user.email}</h3>
        )}
      </div>
    )
  );
}
