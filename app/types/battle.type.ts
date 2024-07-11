import { Army } from './army.type';
import { ArmyName } from './campaign.type';

export enum WinCondition {
  ArmyConquered = 'ArmyConquered',
  KingCaptured = 'KingCaptured',
}

export enum DirectionOfArmy {
  EasternArmy = 'EasternArmy',
  WesternArmy = 'WesternArmy',
}

export enum StartingDirection {
  EAST = 'EAST',
  WEST = 'WEST',
}

interface EndingArmyDetails extends Army {
  position: number;
  is_marching: boolean;
  is_reverse_direction: boolean;
  starting_direction: StartingDirection;
}

type Battalion = Pick<EndingArmyDetails, 'name' | 'position' | 'count'>;

interface EndingArmyComposition {
  full_army: EndingArmyDetails[];
  nation_id: number;
}

interface BattleResult {
  id: number;
  loser: DirectionOfArmy;
  winner: DirectionOfArmy;
  tick_count: number;
  win_type: WinCondition;
  eastern_battalions: Battalion[];
  western_battalions: Battalion[];
}

export type RewardTypeGold = 'Gold';

export interface RewardTypeEnlist {
  Enlist: ArmyName;
}

export type RewardType = RewardTypeGold | RewardTypeEnlist;

export interface BattleStats {
  armor_defense_count: number;
  block_count: number;
  dodge_count: number;
  kill: number;
  starting_direction: StartingDirection;
}

export interface BattleDetails {
  army_compositions: [EndingArmyComposition, EndingArmyComposition];
  battle_result: BattleResult;
  events: string[];
  reward: [number, RewardType];
  stats: [BattleStats, BattleStats];
}
