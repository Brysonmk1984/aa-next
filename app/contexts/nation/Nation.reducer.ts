import { Nation, NationArmy } from '@/types';
import { NationReducerAction, NationState } from './Nation.type';

export const NationReducer = (state: NationState, action: NationReducerAction): NationState => {
  switch (action.type) {
    case 'nationUpdateAction': {
      if (state.nation === null) {
        throw new Error('Tried to update null nation');
      }
      return {
        ...state,
        nation: { ...state.nation, ...action.payload },
      };
    }
    case 'nationArmiesReplaceAllAction': {
      return {
        ...state,
        armies: action.payload,
      };
    }
    case 'nationArmiesUpdateAction': {
      const existingArmies = state.armies;
      const matchingArmyIndex = existingArmies.findIndex((army) => army.army_id === action.payload.army_id);

      if (matchingArmyIndex === -1) {
        existingArmies.push(action.payload);
      } else {
        existingArmies.splice(matchingArmyIndex, 1, action.payload);
      }

      return {
        ...state,
        armies: existingArmies,
      };
    }
    case 'addNationGoldByAmount': {
      if (!state.nation) {
        throw new Error('No nation to add gold to');
      }
      return {
        ...state,
        nation: { ...state.nation, gold: state.nation.gold + action.payload },
      };
    }
    case 'updateHighestLevelCompleted': {
      return {
        ...state,
        campaign: { highestLevelCompleted: action.payload },
      };
    }
    default:
      throw new Error('Invalid action for the Nation reducer.');
  }
};
