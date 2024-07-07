import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { BattleDetails } from '@/types/battle.type';
import { CampaignNationProfile } from '@/types/nation.type';
import { errorType } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';

interface RunCampaignBattle {
  level: number;
  contenders: [number, number];
}

export async function runCampaignBattle({ level, contenders }: RunCampaignBattle) {
  try {
    const response = await fetchWithAuth<BattleDetails>(`${API_ENDPOINT}/battles/campaign/levels/${level}`, {
      method: 'POST',
      body: JSON.stringify({
        east_competitor: contenders[0],
        west_competitor: contenders[1],
      }),
    });
    console.log({ response });

    return response;
  } catch (e) {
    throw errorType(e);
  }
}

export const getCampaignLevelDetails = async (level: number) => {
  const route = `${API_ENDPOINT}/campaign/levels/${level}/nation`;
  const result: CampaignNationProfile = await fetchWrapper(route);

  return result;
};

export const getHighestLevelCompleted = async (nationId: number) => {
  const route = `${API_ENDPOINT}/campaign/nation/${nationId}/highest_completed`;

  const result: number = await fetchWrapper(route);
  return result;
};
