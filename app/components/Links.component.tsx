import Link from 'next/link';
import { ProfileClient } from './ProfileClient';
import { useUserContext } from '@/contexts';

export const Links = () => {
  const { user } = useUserContext();

  return (
    <>
      <Link href="/how-to-play">Guide</Link>
      <Link href="/warriors">Warriors</Link>
      {user && <Link href="/campaign">Campaign</Link>}
      {user && <Link href="/nation">Nation</Link>}
      {user && <Link href="/enlist">Enlist</Link>}

      <ProfileClient user={user} />
    </>
  );
};
