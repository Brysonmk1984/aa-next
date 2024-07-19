import { Nation, NationArmy } from '@/types';
import { NationCampaignDetails } from '@/types/campaign.type';
import { Dispatch } from 'react';

interface Action {
  type:
    | 'nationUpdateAction'
    | 'nationArmiesReplaceAllAction'
    | 'nationArmiesUpdateAction'
    | 'addNationGoldByAmount'
    | 'updateHighestLevelCompleted';
}

interface NationUpdateAction extends Action {
  payload: Pick<Nation, 'name' | 'lore'>;
  type: 'nationUpdateAction';
}

interface nationArmiesReplaceAllAction extends Action {
  payload: NationArmy[];
  type: 'nationArmiesReplaceAllAction';
}

interface NationArmyUpdateAction extends Action {
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

export type NationReducerAction =
  | NationUpdateAction
  | nationArmiesReplaceAllAction
  | NationArmyUpdateAction
  | AddNationGoldByAmount
  | UpdateHighestLevelCompleted;

export interface NationState {
  nation: Nation | null;
  armies: NationArmy[];
  campaign: NationCampaignDetails;
}

export type NationContextValue = {
  dispatch: Dispatch<NationReducerAction>;
  nation: NationState['nation'];
  armies: NationState['armies'];
  campaign: NationState['campaign'];
};
