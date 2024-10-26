import { NationReducerAction, NationState } from './Nation.type';

export const NationReducer = (state: NationState, action: NationReducerAction): NationState => {
  switch (action.type) {
    case 'setUpkeepLevel': {
      if (state.nation === null) {
        throw new Error('Tried to update upkeep null nation');
      }
      return {
        ...state,
        nation: {
          ...state.nation,
          upkeep: action.payload,
        },
      };
    }
    case 'setIncomeAmount': {
      if (state.nation === null) {
        throw new Error('Tried to update income for null nation');
      }
      return {
        ...state,
        nation: {
          ...state.nation,
          income: action.payload,
        },
      };
    }
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
    case 'setNationGold': {
      const nation = state.nation;
      if (!nation) {
        throw new Error('Action only applicable when user is logged in and a nation is not null');
      }
      nation.gold = action.payload;
      return { ...state, nation };
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
