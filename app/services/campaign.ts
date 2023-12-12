import { API_ENDPOINT } from '@/configs/environment.config';
import { User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { getSession } from '@auth0/nextjs-auth0';

export async function runCampaignBattle({ level, nation_id }: CampaignLevel) {
  // const userSession = (await getSession()) as { user: User };
  // console.log(userSession);

  const response = await fetch(`${API_ENDPOINT}/campaign/levels/${level}/battle`);
  const result = await response.json();

  return result;
}
