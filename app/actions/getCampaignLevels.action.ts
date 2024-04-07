'use server';

import { API_ENDPOINT } from '@/configs/environment.config';
import { CampaignLevel, CampaignLevelReward } from '@/types/campaign.type';

type CampaignLevelAndRewardsResponse = [Array<Omit<CampaignLevel, 'reward'>>, Record<string, CampaignLevelReward>];

export async function getCampaignLevels() {
  const route = `${API_ENDPOINT}/campaign/levels`;

  const response = await fetch(route);
  const result: CampaignLevelAndRewardsResponse = await response.json();
  //console.log({ result });

  return result;
}
