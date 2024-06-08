import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import ProfileClient from './ProfileClient';

export const Links = () => {
  const { user, isLoading } = useUser();
  return (
    <>
      <Link href="/campaign">Campaign</Link>
      {user && <Link href="/nation">Nation</Link>}
      {user && <Link href="/armies">Enlist</Link>}

      <ProfileClient user={user} isLoading={isLoading} />
    </>
  );
};
