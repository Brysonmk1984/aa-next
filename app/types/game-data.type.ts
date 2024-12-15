import { UpkeepKeys } from '@/constants/upkeep';
import { Army } from './army.type';
import { ArmyName, CampaignLevel } from './campaign.type';

export interface WeaponArmorValues {
  'piercing-unarmored': number;
  'piercing-leather': number;
  'piercing-chain': number;
  'piercing-plate': number;
  'crushing-unarmored': number;
  'crushing-leather': number;
  'crushing-chain': number;
  'crushing-plate': number;
  'blunt-unarmored': number;
  'blunt-leather': number;
  'blunt-chain': number;
  'blunt-plate': number;
  'edged-unarmored': number;
  'edged-leather': number;
  'edged-chain': number;
  'edged-plate': number;
  'magic-unarmored': number;
  'magic-leather': number;
  'magic-chain': number;
  'magic-plate': number;
}

export type Spread = 0.0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0;

export interface AoeSpreadValues {
  '1': Array<[Spread, number]>;
  '2': Array<[Spread, number]>;
  '3': Array<[Spread, number]>;
}

export interface UpkeepRates {
  None: number;
  Low: number;
  Medium: number;
  High: number;
}

interface IncomeDefaults {
  per_level: number;
  base: number;
  calc_minutes: number;
}

export interface UpkeepDefaults {
  tiers: Record<UpkeepKeys, number>;
  rates: UpkeepRates;
  calc_minutes: number;
}

interface UpkeepData {
  tiers: [UpkeepKeys, number][];
  rates: UpkeepRates;
  calc_minutes: number;
}

export interface GameDefaults {
  weapon_armor_values: WeaponArmorValues;
  aoe_spread_values: AoeSpreadValues;
  income: IncomeDefaults;
  upkeep: UpkeepDefaults;
  armies: Army[];
  constants: GameConstants;
  campaignDefaults: CampaignLevel[] | null;
  armyUnlockMap: Record<number, ArmyName>;
}

interface ArmyDefaultsRequestResult {
  army: Army;
  meta: {
    cost: number;
    unlock_level: number;
    lore: string;
  };
}

interface GameConstants {
  MIN_RANGE_ATTACK_AIR: number;
  IS_MARCHING_AGILITY_MOD: number;
}

export interface GameDataRequestResult {
  weapon_armor_values: WeaponArmorValues;
  aoe_spread_values: AoeSpreadValues;
  income: IncomeDefaults;
  upkeep: UpkeepData;
  armies: ArmyDefaultsRequestResult[];
  constants: GameConstants;
}
