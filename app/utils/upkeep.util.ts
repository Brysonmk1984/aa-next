import { UpkeepKeys } from '@/constants/upkeep';
import { NationArmy } from '@/types';
import { UpkeepDefaults } from '@/types/game-data.type';

export const calculateArmyCount = (armies: NationArmy[]) => {
  return armies.reduce((total, army) => {
    return total + army.count;
  }, 0);
};

export const determineUpkeep = (count: number, upkeep: UpkeepDefaults) => {
  const { rates, tiers } = upkeep;

  const arr = Object.entries(tiers) as [UpkeepKeys, number][];
  const result = arr.reduce(
    (acc, [upkeepKey, threshold]) => {
      if (count < threshold) {
        return { ...acc, ...{ level: upkeepKey, cost: rates[upkeepKey] } };
      }
      return acc;
    },
    { rate: determineRate(upkeep.calc_minutes) } as { level: UpkeepKeys; cost: number; rate: string },
  );

  return result;
};

export const determineIncome = (base: number, highestLevelCompleted: number, amountPerLevel: number, rate: number) => {
  return {
    amount: base + highestLevelCompleted * amountPerLevel,
    rate: determineRate(rate),
  };
};

export const determineRate = (rate: number) => {
  switch (rate) {
    case 1:
      return 'minute';
    case 10:
      return 'ten minutes';
    case 15:
      return 'quarter hour';
    case 30:
      return 'half hour';
    case 60:
      return 'hour';
    default:
      throw new Error('Unexpected income rate given');
  }
};
