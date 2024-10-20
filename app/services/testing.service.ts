import { API_ENDPOINT } from '@/configs/environment.config';
import { BattleDetails } from '@/types/battle.type';
import { ArmyName } from '@/types/campaign.type';
import { fetchPassthrough } from '@/utils/fetch.util';

interface MockArmyDetails {
  id: number;
  name: ArmyName;
  count: number;
}

export interface RunTestBattleParams {
  east: MockArmyDetails[];
  west: MockArmyDetails[];
}

/**
 * Gets nation and armies - for SERVER use only since it uses fetchWithAuth, otherwise it causes screen jank
 * @param userId
 * @returns option.nation & option.armies
 */
export const runTestBattle = async ({ east, west }: RunTestBattleParams) => {
  try {
    const route = `${API_ENDPOINT}/battles/testing`;
    const result = await fetchPassthrough<BattleDetails>(route, {
      method: 'POST',
      body: JSON.stringify({ east, west }),
    });

    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
