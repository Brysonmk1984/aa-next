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

export type GetCampaignLevels = [Array<Omit<CampaignLevel, 'reward'>>, Record<string, CampaignLevelReward>];

export type NationCampaignDetails = {
  highestLevelCompleted: number;
};
