import { API_ENDPOINT } from '@/configs/environment.config';
import { User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNationProfile } from '@/types/nation.type';
import { getSession } from '@auth0/nextjs-auth0';

export async function runCampaignBattle({ level, nation_id }: CampaignLevel) {
  // const userSession = (await getSession()) as { user: User };
  // console.log(userSession);

  const response = await fetch(`${API_ENDPOINT}/campaign/levels/${level}/battle`);
  const result = await response.json();

  return result;
}

export const getCampaignLevels = async () => {
  const route = `${API_ENDPOINT}/campaign/levels`;
  console.log({ route });

  const response = await fetch(route);

  const result: Array<CampaignLevel> = await response.json();
  console.log('getCampaignLevels result', result);

  return result;
};

export const getCampaignLevelDetails = async (level: number) => {
  const route = `${API_ENDPOINT}/campaign/levels/${level}/nation`;
  const response = await fetch(route);
  const result: CampaignNationProfile = await response.json();

  return result;
};
