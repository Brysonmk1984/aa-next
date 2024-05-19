'use server';

import { API_ENDPOINT } from '@/configs/environment.config';
import { GetCampaignLevels } from '@/types/campaign.type';
import { fetchWrapper } from '@/utils/fetch.util';

export async function getCampaignLevels() {
  const route = `${API_ENDPOINT}/campaign/levels`;

  const result: GetCampaignLevels = await fetchWrapper(route);

  return result;
}
