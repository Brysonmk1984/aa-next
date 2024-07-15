import { Nation, NationArmy } from '@/types';
import { NationCampaignDetails } from '@/types/campaign.type';
import { Dispatch } from 'react';

interface Action {
  type: 'nationUpdateAction' | 'nationArmiesReplaceAction' | 'nationArmiesUpdateAction';
}

interface NationUpdateAction extends Action {
  payload: Pick<Nation, 'name' | 'lore'>;
  type: 'nationUpdateAction';
}

interface NationArmiesReplaceAction extends Action {
  payload: NationArmy[];
  type: 'nationArmiesReplaceAction';
}

interface NationArmyUpdateAction extends Action {
  payload: NationArmy;
  type: 'nationArmiesUpdateAction';
}

export type NationReducerAction = NationUpdateAction | NationArmiesReplaceAction | NationArmyUpdateAction;

export interface NationState {
  nation: Nation;
  armies: NationArmy[];
  campaign: NationCampaignDetails;
}

export type NationContextValue = {
  updateNationState: (payload: Partial<Nation>) => Promise<void>;
  updateNationArmy: (payload: NationArmy | NationArmy[]) => Promise<void>;
  dispatch: Dispatch<NationReducerAction>;
  state: NationState;
};
