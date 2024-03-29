'use client';
import Image from 'next/image';

export default function ProfileClient({ user, isLoading }: { user: UserProfile | undefined; isLoading: boolean }) {
  if (isLoading) return <div>Loading...</div>;
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
