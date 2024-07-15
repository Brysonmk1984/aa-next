import { Nation, NationArmy } from '@/types';
import { NationReducerAction, NationState } from './Nation.type';

export const NationReducer = (state: NationState, action: NationReducerAction): NationState => {
  switch (action.type) {
    case 'nationUpdateAction':
      if (state.nation === null) {
        throw new Error('Tried to update null nation');
      }
      return {
        ...state,
        nation: { ...state.nation, ...action.payload },
      };
    case 'nationArmiesReplaceAction':
      return {
        ...state,
        armies: action.payload,
      };
    case 'nationArmiesUpdateAction':
      const existingArmies = state.armies;

      const matchingArmyIndex = existingArmies.findIndex((army) => army.army_id === action.payload.army_id);

      if (!matchingArmyIndex) {
        existingArmies.push(action.payload);
      } else {
        existingArmies.splice(matchingArmyIndex, 1, action.payload);
      }

      return {
        ...state,
        armies: existingArmies,
      };
    default:
      return state;
  }
};
