import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { Nation, NationArmy } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';

export const getNationAndArmies = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, armies]: [Nation, NationArmy[]] = await fetchWithAuth(route);

  return { nation, armies };
};

export const getNationArmies = async (userId: number, nationId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}/nation/:${nationId}/army`;
  const armies = await fetchWithAuth(route);

  console.log('UPDATED', { armies });
  return armies;
};

export const initializeNation = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, _armies]: [Nation, NationArmy] = await fetchWithAuth(route, { method: 'POST' });

  return nation;
};

export const patchNation = async (userId: number, nationId: number, body: Partial<Nation>): Promise<Nation> => {
  const route = `${API_ENDPOINT}/kingdom/${userId}/nation/${nationId}`;

  const result = await fetchWithAuth<Nation>(route, { method: 'PATCH', body: JSON.stringify(body) });

  return result;
};
