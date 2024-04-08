'use server';

import { API_ENDPOINT } from '@/configs/environment.config';
import { GetCampaignLevels } from '@/types/campaign.type';

export async function getCampaignLevels() {
  const route = `${API_ENDPOINT}/campaign/levels`;

  const response = await fetch(route);
  const result: GetCampaignLevels = await response.json();

  return result;
}
