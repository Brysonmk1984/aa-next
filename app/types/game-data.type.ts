import { Army } from './army.type';

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

interface IncomeDefaults {
  income_per_level: number;
  income_base: number;
  income_calc_minutes: number;
  upkeep_calc_minutes: number;
}

export interface GameData {
  weapon_armor_values: WeaponArmorValues;
  aoe_spread_values: AoeSpreadValues;
  income: IncomeDefaults;
  armies: Army[];
}

interface ArmyDefaultsRequestResult {
  army: Army;
  meta: {
    cost: number;
  };
}
export interface GameDataRequestResult {
  weapon_armor_values: WeaponArmorValues;
  aoe_spread_values: AoeSpreadValues;
  income: IncomeDefaults;
  armies: ArmyDefaultsRequestResult[];
}
