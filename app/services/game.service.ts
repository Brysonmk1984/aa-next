import { API_ENDPOINT } from '@/configs/environment.config';
import { UpkeepKeys } from '@/constants/upkeep';
import { Army } from '@/types';
import { ArmyName } from '@/types/campaign.type';
import { GameDefaults, GameDataRequestResult } from '@/types/game-data.type';
import { fetchWrapper } from '@/utils/fetch.util';

export const getDefaultGameData = async (): Promise<GameDefaults> => {
  const route = `${API_ENDPOINT}/game`;
  const result = await fetchWrapper<GameDataRequestResult>(route);

  const armies: Army[] = result.armies.map((item) => {
    return { ...item.army, cost: item.meta.cost, unlock_level: item.meta.unlock_level, lore: item.meta.lore };
  });

  const armyUnlockMap = armies.reduce<Record<number, ArmyName>>(
    (acc, army) => {
      acc[army.unlock_level] = army.name;
      return acc;
    },
    {} as Record<number, ArmyName>,
  );

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
  return { ...result, armies, armyUnlockMap, upkeep, campaignDefaults: null };
};
