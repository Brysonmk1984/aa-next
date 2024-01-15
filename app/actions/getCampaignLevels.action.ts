'use server';

import { API_ENDPOINT } from '@/configs/environment.config';
import { CampaignLevel } from '@/types/campaign.type';

export async function getCampaignLevels() {
  const route = `${API_ENDPOINT}/campaign/levels`;

  const response = await fetch(route);
  const result: Array<CampaignLevel> = await response.json();

  return result;
}
