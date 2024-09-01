import { API_ENDPOINT } from '@/configs/environment.config';
import { GameData } from '@/types/game-data.type';
import { fetchWrapper } from '@/utils/fetch.util';

export const getDefaultGameData = async () => {
  const route = `${API_ENDPOINT}/game`;
  const result = await fetchWrapper<GameData>(route);

  return result;
};
