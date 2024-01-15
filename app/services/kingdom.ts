import { API_ENDPOINT } from '@/configs/environment.config';
import { fetchWithAuth } from '@/utils/fetchWithAuth.util';

export const getNationAndArmies = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const [nation, _armies] = await fetchWithAuth(route);

  return nation;
};
