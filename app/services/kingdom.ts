import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { Nation, NationArmy } from '@/types';

export const getNationAndArmies = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, _armies]: [Nation, NationArmy] = await fetchWithAuth(route);

  return nation;
};

export const initializeNation = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, _armies]: [Nation, NationArmy] = await fetchWithAuth(route, { method: 'POST' });

  return nation;
};
