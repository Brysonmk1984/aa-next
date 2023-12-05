import { API_ENDPOINT } from '@/configs/environment.config';
import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNation, NationWithArmy } from '@/types/nation.type';

export const getNationAndArmies = async (userId: number) => {
  console.log({ userId });

  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const response = await fetch(route);
  const [nation, _armies] = await response.json();

  return nation;
};

export const getCampaignLevels = async () => {
  const route = `${API_ENDPOINT}/campaign/levels`;
  const response = await fetch(route);
  const result: Array<CampaignLevel> = await response.json();

  return result;
};

export const getCampaignLevelDetails = async (level: number) => {
  const route = `${API_ENDPOINT}/campaign/levels/${level}/nation`;
  const response = await fetch(route);
  const result: NationWithArmy = await response.json();

  return result;
};
