import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { CampaignNationProfile } from '@/types/nation.type';
import { fetchWrapper } from '@/utils/fetch.util';

export async function runCampaignBattle({ level, contenders }: { level: number; contenders: [number, number] }) {
  try {
    const response = await fetchWithAuth(`${API_ENDPOINT}/battles/campaign/levels/${level}`, {
      method: 'POST',
      body: JSON.stringify({
        east_competitor: contenders[0],
        west_competitor: contenders[1],
      }),
    });

    return response;
  } catch (e) {
    console.error(e);
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
