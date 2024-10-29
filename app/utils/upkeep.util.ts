import { UpkeepKeys } from '@/constants/upkeep';
import { NationArmy } from '@/types';

export const calculateArmyCount = (armies: NationArmy[]) => {
  return armies.reduce((total, army) => {
    return total + army.count;
  }, 0);
};

export const determineUpkeep = (count: number) => {
  switch (true) {
    case count > 90000:
      return UpkeepKeys.High;
    case count > 50000:
      return UpkeepKeys.Medium;
    case count > 10000:
      return UpkeepKeys.Low;
    default:
      return UpkeepKeys.None;
  }
};

export const determineIncome = (base: number, highestLevelCompleted: number, amountPerLevel: number) => {
  return base + highestLevelCompleted * amountPerLevel;
};
