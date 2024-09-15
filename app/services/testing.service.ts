import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { StartingDirection } from '@/types/battle.type';
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
    console.log(east, west);

    const route = `${API_ENDPOINT}/battles/testing`;
    const result = await fetchPassthrough(route, { method: 'POST' });
    console.log({ result });

    return;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
