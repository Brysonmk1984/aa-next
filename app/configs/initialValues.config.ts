import { Nation, NationArmy, ResolvedUser } from '@/types';

export interface ResolvedSessionInfo {
  user: ResolvedUser | null;
  nation: Nation | null;
  armies: NationArmy[];
}

export const initialProviderValues: ResolvedSessionInfo = {
  user: null,
  nation: null,
  armies: [],
};
