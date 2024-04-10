import { API_ENDPOINT } from '@/configs/environment.config';
import { User } from '@/types';
import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNationProfile } from '@/types/nation.type';
import { fetchWithAuthClientSide } from '@/utils/fetchWithAuthClientSide.util';

export async function runCampaignBattle({
  level,
  accessToken,
  contenders,
}: {
  level: number;
  accessToken: string;
  contenders: [number, number];
}) {
  try {
    console.log('here we go', level, accessToken);

    const response = await fetchWithAuthClientSide(`${API_ENDPOINT}/battles/campaign/levels/${level}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        east_competitor: contenders[0],
        west_competitor: contenders[1],
      }),
    });
    console.log({ response });

    return response;
  } catch (e) {
    console.error(e);
  }
}

export const getCampaignLevelDetails = async (level: number) => {
  const route = `${API_ENDPOINT}/campaign/levels/${level}/nation`;
  const response = await fetch(route);
  const result: CampaignNationProfile = await response.json();
  console.log('ALL_ARMIES', result.all_armies);

  return result;
};
