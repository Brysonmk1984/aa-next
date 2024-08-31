interface WeaponArmorValues {
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

type Spread = 0.0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0;

interface AoeSpreadValues {
  1: Array<[Spread, number]>;
  2: Array<[Spread, number]>;
  3: Array<[Spread, number]>;
}

export interface GameDataQueryResult {
  weapon_armor_values: WeaponArmorValues;
  aoe_spread_values: AoeSpreadValues;
  income_calc_minutes: string;
  upkeep_calc_minutes: string;
}

export interface GameData {
  weaponArmorValues: WeaponArmorValues;
  aoeSpreadValues: AoeSpreadValues;
  incomeCalcMinutes: string;
  upkeepCalcMinutes: string;
}
