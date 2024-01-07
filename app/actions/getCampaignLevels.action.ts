'use server';

import { API_ENDPOINT } from '@/configs/environment.config';
import { CampaignLevel } from '@/types/campaign.type';

export async function getCampaignLevels(accessToken: string | undefined) {
  console.log('FROM SERVER ACTION', accessToken);

  const route = `${API_ENDPOINT}/campaign/levels`;

  const response = await fetch(route, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result: Array<CampaignLevel> = await response.json();

  return result;
}
