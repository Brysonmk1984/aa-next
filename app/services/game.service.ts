import { API_ENDPOINT } from '@/configs/environment.config';
import { GameData, GameDataQueryResult } from '@/types/game-data.type';
import { snakeCaseToCamelCase } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';

export const getGameData = async (): Promise<GameData> => {
  const route = `${API_ENDPOINT}/game`;
  const result: GameDataQueryResult = await fetchWrapper(route);
  const entries = Object.entries(result).map(([k, v]) => [snakeCaseToCamelCase(k), v]);
  return Object.fromEntries(entries);
};
