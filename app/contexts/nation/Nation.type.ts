import { UpkeepKeys } from '@/constants/upkeep';
import { Nation, NationArmy } from '@/types';
import { NationCampaignDetails } from '@/types/campaign.type';
import { Dispatch } from 'react';

interface Action {
  type:
    | 'nationUpdateAction'
    | 'nationArmiesReplaceAllAction'
    | 'nationArmiesUpdateAction'
    | 'addNationGoldByAmount'
    | 'updateHighestLevelCompleted'
    | 'setUpkeepLevel'
    | 'setIncomeAmount';
}

interface NationUpdate extends Action {
  payload: Pick<Nation, 'name' | 'lore'>;
  type: 'nationUpdateAction';
}

interface NationArmiesReplaceAll extends Action {
  payload: NationArmy[];
  type: 'nationArmiesReplaceAllAction';
}

interface NationArmyUpdate extends Action {
  payload: NationArmy;
  type: 'nationArmiesUpdateAction';
}

interface AddNationGoldByAmount extends Action {
  payload: number;
  type: 'addNationGoldByAmount';
}

interface UpdateHighestLevelCompleted extends Action {
  payload: number;
  type: 'updateHighestLevelCompleted';
}

interface SetUpkeepLevel extends Action {
  payload: UpkeepKeys;
  type: 'setUpkeepLevel';
}

interface SetIncomeAmount extends Action {
  payload: number;
  type: 'setIncomeAmount';
}

export type NationReducerAction =
  | NationUpdate
  | NationArmiesReplaceAll
  | NationArmyUpdate
  | AddNationGoldByAmount
  | UpdateHighestLevelCompleted
  | SetUpkeepLevel
  | SetIncomeAmount;

export interface NationState {
  nation: Nation | null;
  armies: NationArmy[];
  campaign: NationCampaignDetails | null;
}

export type NationContextValue = {
  dispatch: Dispatch<NationReducerAction>;
  nation: NationState['nation'];
  armies: NationState['armies'];
  campaign: NationState['campaign'];
};
