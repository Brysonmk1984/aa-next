import TdBuyCell from '@/components/TdBuyCell';
import { getArmies } from '@/services/army';
import { getNationAndArmies, getCampaignLevels, getCampaignLevelDetails } from '@/services/nation';
import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser, User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import { LevelList } from './LevelList.component';

export default async function Campaign() {
  const { user } = (await getSession()) as { user: User };
  const {
    resolvedUser: { id: userId },
  } = (await handleUserUpdateCheck(user)) as { resolvedUser: ResolvedUser };
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
        <LevelList levels={campaignLevels} highestLevel={highestLevel} />
      </section>
    </main>
  );
}
