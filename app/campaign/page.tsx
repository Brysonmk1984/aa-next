import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser, User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { LevelList } from './LevelList.component';
import { getCampaignLevels } from '@/services/campaign';
import { cookies } from 'next/headers';

export default async function Campaign() {
  const { user } = (await getSession()) as { user: User };

  await handleUserUpdateCheck(user);

  let campaignLevels: Array<CampaignLevel>;
  let highestLevel: number = 1;
  try {
    campaignLevels = await getCampaignLevels();
    console.log('ASDASDASDDASASDAS', campaignLevels.length);
  } catch (error) {
    throw error;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Campaign</h1>
      <section className="w-full">
        <LevelList levels={campaignLevels} highestLevel={highestLevel} />
      </section>
    </main>
  );
}
