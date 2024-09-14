import { ArmyName } from '@/types/campaign.type';

const armyNames = [
  'Peacekeeper Monks',
  'Imperial Legionnaires',
  'North Watch Longbowmen',
  'North Watch Longbowmen',
  'Rōnin Immortals',
  'Shinobi Martial Artists',
  'Amazonian Huntresses',
  'Avian Cliff Dwellers',
  'Magi Enforcers',
  'Skull Clan Death Cultists',
  'Barbarians of the Outer Steppe',
  'Oath-Sworn Knights',
  'Minute Men Militia',
  'Death Dealer Assassins',
  'Elven Archers',
  'Castlegate Crossbowmen',
] as const;

export function assertsStringIsArmyName(value: string): asserts value is ArmyName {
  if (!armyNames.some((item) => item)) {
    throw new Error("Army Name doesn't Exist!");
  }
}
