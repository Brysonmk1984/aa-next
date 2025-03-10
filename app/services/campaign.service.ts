import { API_ENDPOINT, DISABLE_BATTLE_ARMY_COUNT_ADJUSTMENT } from '@/configs/environment.config';
import { BattleDetails } from '@/types/battle.type';
import { CampaignNationProfile } from '@/types/nation.type';
import { fetchPassthrough, fetchWrapper } from '@/utils/fetch.util';

interface RunCampaignBattle {
  level: number;
  contenders: [number, number];
}

export async function runCampaignBattle({ level, contenders }: RunCampaignBattle) {
  const queryString = DISABLE_BATTLE_ARMY_COUNT_ADJUSTMENT ? '?disableCountAdjustment=true' : '';

  const response = await fetchPassthrough<BattleDetails>(
    `${API_ENDPOINT}/battles/campaign/levels/${level}${queryString}`,
    {
      method: 'POST',
      body: JSON.stringify({ east_competitor: contenders[0], west_competitor: contenders[1] }),
    },
  );

  return response;
}

export const getCampaignLevelDetails = async (level: number) => {
  const route = `${API_ENDPOINT}/campaign/levels/${level}/nation`;
  const result: CampaignNationProfile = await fetchWrapper(route);

  return result;
};

export const getHighestLevelCompleted = async (nationId: number) => {
  const route = `${API_ENDPOINT}/campaign/nation/${nationId}/highest_completed`;

  const result: number = await fetchWrapper(route);

  return +result;
};
