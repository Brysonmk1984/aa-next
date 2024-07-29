import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { Nation, NationArmy } from '@/types';
import { calculateArmyCount, determineUpkeep } from '@/utils';

import { fetchPassthrough } from '@/utils/fetch.util';

/**
 * Creates a new nation associated with the userId passed in. Runs only on server, so fetchWithAuth works
 * @param userId
 * @returns
 */
export const initializeNation = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, _armies]: [Nation, NationArmy] = await fetchWithAuth(route, { method: 'POST' });

  return nation;
};

/**
 * Gets nation and armies - for SERVER use only since it uses fetchWithAuth, otherwise it causes screen jank
 * @param userId
 * @returns option.nation & option.armies
 */
export const getNationAndArmies = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;

  // This uses fetchWithAuth, but since it's running on server, it's ok, getSession works
  const [nation, armies]: [Nation, NationArmy[]] = await fetchWithAuth(route);

  nation.upkeep = determineUpkeep(calculateArmyCount(armies));
  return { nation, armies };
};

/**
 * Gets nationArmies - for CLIENT - uses fetchPassthrough since fetchWithAuth causes screen jank when ran on the client side
 * @param userId
 * @returns
 */
export const getNationArmies = async (userId: number, nationId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}/nation/${nationId}/army`;
  const armies = await fetchPassthrough<NationArmy[]>(route);

  return armies;
};

/**
 * Updates the nation with whatever values are to be changed - for CLIENT - uses fetchPassthrough since fetchWithAuth causes screen jank when ran on the client side
 * @param userId
 * @returns
 */
export const patchNation = async (userId: number, nationId: number, body: Partial<Nation>): Promise<Nation> => {
  const route = `${API_ENDPOINT}/kingdom/${userId}/nation/${nationId}`;

  const result = await fetchPassthrough<Nation>(route, { method: 'PATCH', body: JSON.stringify(body) });

  return result;
};
function calculateUpkeep(armies: NationArmy[]) {
  throw new Error('Function not implemented.');
}
