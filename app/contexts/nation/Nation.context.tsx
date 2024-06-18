'use client';

import { Nation, NationArmy } from '@/types';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren, useState } from 'react';

export type NationCampaignDetails = {
  highestLevelCompleted: number;
};
interface NationState {
  nation: Nation | null;
  armies: Array<NationArmy>;
  campaign: NationCampaignDetails;
}

interface NationValue extends NationState {}

const [NationContext, useContext] = createContext<NationValue>({
  name: 'NationContext',
});

export const useNationContext = () => {
  return useContext();
};

interface NationProviderProps extends NationState {}
export const NationProvider = ({ nation, armies, campaign, children }: PropsWithChildren<NationProviderProps>) => {
  const [n] = useState<Nation | null>(nation);
  const [a] = useState<NationArmy[]>(armies);

  if (n && n.name === '') {
    window.location.assign('/founding');
  }

  return <NationContext.Provider value={{ nation: n, armies: a, campaign }}>{children}</NationContext.Provider>;
};
