import { ArmyName } from '@/types/campaign.type';

export const mapWarriorNameToImageKey = (armyName: ArmyName) => {
  const map = {
    'Peacekeeper Monks': 'monk',
    'Imperial Legionnaires': 'legionnaire',
    'North Watch Longbowmen': 'longbowmen',
    'Highborn Cavalry': 'cavalry',
    'Rōnin Immortals': 'immortal',
    'Shinobi Martial Artists': 'shinobi-martial-artist',
    'Amazonian Huntresses': 'amazon',
    'Avian Cliff Dwellers': 'avian-cliff-dweller',
    'Magi Enforcers': 'magi-enforcer',
    'Skull Clan Death Cultists': 'skull-clan-death-cultist',
    'Barbarians of the Outer Steppe': 'barbarian',
    'Oath-Sworn Knights': 'knight',
    'Minute Men Militia': 'militia',
    'Death Dealer Assassins': 'death-dealer',
    'Elven Archers': 'elven-archer',
    'Castlegate Crossbowmen': 'crossbowmen',
  };

  return map[armyName];
};

export const mapWarriorUriParamToName = (warrior: string) => {
  const map: Record<string, ArmyName> = {
    'peacekeeper-monks': 'Peacekeeper Monks' as ArmyName,
    'imperial-legionnaires': 'Imperial Legionnaires' as ArmyName,
    'north-watch-longbowmen': 'North Watch Longbowmen' as ArmyName,
    'highborn-cavalry': 'Highborn Cavalry' as ArmyName,
    'rōnin-immortals': 'Rōnin Immortals' as ArmyName,
    'shinobi-martial-artists': 'Shinobi Martial Artists' as ArmyName,
    'amazonian-huntresses': 'Amazonian Huntresses' as ArmyName,
    'avian-cliff-dwellers': 'Avian Cliff Dwellers' as ArmyName,
    'magi-enforcers': 'Magi Enforcers' as ArmyName,
    'skull-clan-death-cultists': 'Skull Clan Death Cultists' as ArmyName,
    'barbarians-of-the-outer-steppe': 'Barbarians of the Outer Steppe' as ArmyName,
    'oath-sworn-knights': 'Oath-Sworn Knights' as ArmyName,
    'minute-men-militia': 'Minute Men Militia' as ArmyName,
    'death-dealer-assassins': 'Death Dealer Assassins' as ArmyName,
    'elven-archers': 'Elven Archers' as ArmyName,
    'castlegate-crossbowmen': 'Castlegate Crossbowmen' as ArmyName,
  };

  return map[warrior];
};
