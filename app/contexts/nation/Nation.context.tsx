'use client';

import { Nation, NationArmy } from '@/types';
import { createContext } from '@/utils/context-abstraction.util';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export type NationCampaignDetails = {
  highestLevelCompleted: number;
};
interface NationState {
  nation: Nation | null;
  armies: Array<NationArmy>;
  campaign: NationCampaignDetails;
  dispatch: (val: UpdateNationAction) => void;
}
type UpdateNationAction = { type: string; payload: Pick<Nation, 'name' | 'lore'> };

interface NationValue extends NationState {}

const [NationContext, useContext] = createContext<NationValue>({
  name: 'NationContext',
});

export const useNationContext = () => {
  return useContext();
};

interface NationProviderProps extends NationState {}
export const NationProvider = ({ nation, armies, campaign, children }: PropsWithChildren<NationProviderProps>) => {
  const [n, setNation] = useState<Nation | null>(nation);
  const [a] = useState<NationArmy[]>(armies);

  if (n && n.name === '') {
    window.location.assign('/founding');
  }

  const dispatch = ({ type, payload }: UpdateNationAction) => {
    if (type === 'updateNation') {
      if (nation === null) {
        throw new Error('Tried to update null nation');
      }

      setNation({ ...nation, ...payload });
    }
  };

  return (
    <NationContext.Provider value={{ nation: n, armies: a, campaign, dispatch }}>{children}</NationContext.Provider>
  );
};
