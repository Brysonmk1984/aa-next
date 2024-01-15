import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser, User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { getSession, getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { LevelList } from './LevelList.component';
import { cookies } from 'next/headers';
import { getCampaignLevels } from '@/actions/getCampaignLevels.action';

export default async function Campaign() {
  const session = await getSession();

  let campaignLevels: Array<CampaignLevel>;
  let highestLevel: number = 1;
  try {
    campaignLevels = await getCampaignLevels();
  } catch (error) {
    throw error;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Campaign</h1>
      <section className="w-full">
        <LevelList levels={campaignLevels} highestLevel={highestLevel} session={session} />
      </section>
    </main>
  );
}
