import { API_ENDPOINT } from '@/configs/environment.config';

export const getNationAndArmies = async (userId: number) => {
  console.log({ userId });

  const route = `${API_ENDPOINT}/nation-profile/${userId}`;
  const response = await fetch(route);
  const [nation, _armies] = await response.json();

  return nation;
};
