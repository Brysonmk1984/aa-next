export interface CampaignLevel {
  id: number;
  nation_id: number;
  nation_name: string;
  level: number;
  lore: string;
  reward: CampaignLevelReward;
}

export type CampaignLevelReward = [number, Reward];

type ArmyReward = {
  Enlist: ArmyName;
};

type Reward = ArmyReward | 'Gold' | null;

export enum ArmyName {
  AmazonianHuntresses = 'Amazonian Huntresses',
  AvianCliffDwellers = 'Avian Cliff Dwellers',
  HighbornCavalry = 'Highborn Cavalry',
  ImperialLegionnaires = 'Imperial Legionnaires',
  MagiEnforcers = 'Magi Enforcers',
  NorthWatchLongbowmen = 'North Watch Longbowmen',
  PeacekeeperMonks = 'Peacekeeper Monks',
  RoninImmortals = 'Rōnin Immortals',
  ShinobiMartialArtists = 'Shinobi Martial Artists',
  SkullClanDeathCultists = 'Skull Clan Death Cultists',
  BarbariansOfTheOuterSteppe = 'Barbarians of the Outer Steppe',
  OathSwornKnights = 'Oath-Sworn Knights',
  MinuteMenMilitia = 'Minute Men Militia',
  DeathDealerAssassins = 'Death Dealer Assassins',
  ElvenArchers = 'Elven Archers',
  CastlegateCrossbowmen = 'Castlegate Crossbowmen',
}

export type CampaignLevelWithReward = CampaignLevel & { reward: CampaignLevelReward };

export type GetCampaignLevels = [Array<Omit<CampaignLevel, 'reward'>>, Record<string, CampaignLevelReward>];

// type CampaignLevelNumberAsString =
//   | '1'
//   | '2'
//   | '3'
//   | '4'
//   | '5'
//   | '6'
//   | '7'
//   | '8'
//   | '9'
//   | '10'
//   | '11'
//   | '12'
//   | '13'
//   | '14'
//   | '15'
//   | '16'
//   | '17'
//   | '18'
//   | '19'
//   | '20'
//   | '21'
//   | '22'
//   | '23'
//   | '24'
//   | '25'
//   | '26'
//   | '27'
//   | '28'
//   | '29'
//   | '30';
