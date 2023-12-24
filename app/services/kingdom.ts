import { API_ENDPOINT } from '@/configs/environment.config';

export const getNationAndArmies = async (userId: number) => {
  const route = `${API_ENDPOINT}/kingdom/${userId}`;
  const response = await fetch(route);
  const [nation, _armies] = await response.json();

  return nation;
};
