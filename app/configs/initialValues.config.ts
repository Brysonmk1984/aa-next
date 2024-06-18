import { Nation, NationArmy, ResolvedUser } from '@/types';

export interface ResolvedSessionInfo {
  user: ResolvedUser | null;
  nation: Nation | null;
  armies: NationArmy[];
  campaign: {
    highestLevelCompleted: number;
  };
}

export const initialProviderValues: ResolvedSessionInfo = {
  user: null,
  nation: null,
  armies: [],
  campaign: {
    highestLevelCompleted: 0,
  },
};
