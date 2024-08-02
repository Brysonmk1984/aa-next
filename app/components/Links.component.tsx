import Link from 'next/link';
import { ProfileClient } from './ProfileClient';
import { useNationContext, useUserContext } from '@/contexts';

export const Links = () => {
  const { user } = useUserContext();
  const { campaign } = useNationContext();

  return (
    <>
      <Link href="/how-to-play">Guide</Link>
      <Link href="/warriors">Warriors</Link>
      {user && (
        <Link href={(campaign?.highestLevelCompleted ?? 0) > 1 ? '/campaign/levels' : '/campaign'}>Campaign</Link>
      )}
      {user && <Link href="/nation">Nation</Link>}
      {user && <Link href="/enlist">Enlist</Link>}

      <ProfileClient user={user} />
    </>
  );
};
