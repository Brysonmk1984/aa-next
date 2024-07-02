'use client';

import { useRouter } from 'next/navigation';

export const CampaignDescription = () => {
  const router = useRouter();
  return (
    <>
      <p className="ml-6">
        There is currently one game mode available - the campaign. You start out as a small faction attempting to live
        independently from other nations, but competing nations have the same idea. You'll need to fight to expand your
        territory by defeating neighboring nations. Your standing army starts out small; just a mere 100 militia men. In
        order to progress through the campaign your nation will have to face ever-larger and more diverse armies and so
        it will take time to acquire enough gold grow your forces to a point where you can defeat a neighboring nation.
        The first opposing nation call timidly call themselves "The Fretfull Ones" and have a standing army of 1,000
        Militia. What will it take to conquer these wheyfaced neighbors?
      </p>
      <button className="btn btn-red" onClick={() => router.push('/campaign/levels')}>
        Begin
      </button>
    </>
  );
};
