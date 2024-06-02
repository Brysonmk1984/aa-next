import { ArmyName } from '@/types/campaign.type';

export const getArmyImage = (armyName: ArmyName) => {
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
