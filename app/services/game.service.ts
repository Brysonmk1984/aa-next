import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';
import { GameData, GameDataRequestResult } from '@/types/game-data.type';
import { fetchWrapper } from '@/utils/fetch.util';

export const getDefaultGameData = async (): Promise<GameData> => {
  const route = `${API_ENDPOINT}/game`;
  const result = await fetchWrapper<GameDataRequestResult>(route);

  const armies: Army[] = result.armies.map((item) => {
    return { ...item.army, cost: item.meta.cost };
  });

  return { ...result, armies };
};
