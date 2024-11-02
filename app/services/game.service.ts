import { API_ENDPOINT } from '@/configs/environment.config';
import { UpkeepKeys } from '@/constants/upkeep';
import { Army } from '@/types';
import { GameDefaults, GameDataRequestResult } from '@/types/game-data.type';
import { fetchWrapper } from '@/utils/fetch.util';

export const getDefaultGameData = async (): Promise<GameDefaults> => {
  const route = `${API_ENDPOINT}/game`;
  const result = await fetchWrapper<GameDataRequestResult>(route);

  const armies: Army[] = result.armies.map((item) => {
    return { ...item.army, cost: item.meta.cost, unlock_level: item.meta.unlock_level };
  });

  const tiers = result.upkeep.tiers.reduce<Record<UpkeepKeys, number>>(
    (acc, [tierName, tierThreshold]) => {
      acc[tierName] = tierThreshold;
      return acc;
    },
    {} as Record<UpkeepKeys, number>,
  );

  const upkeep = {
    ...result.upkeep,
    tiers,
  };
  return { ...result, armies, upkeep };
};
