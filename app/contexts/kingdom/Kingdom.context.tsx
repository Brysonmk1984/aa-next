'use client';

import { Nation, NationArmy } from '@/types';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren, useState } from 'react';

interface KingdomState {
  nation: Nation | null;
  armies: Array<NationArmy>;
}

interface KingdomValue extends KingdomState {}

const [KingdomContext, useContext] = createContext<KingdomValue>({
  name: 'KingdomContext',
});

export const useKingdomContext = () => {
  return useContext();
};

interface KingdomProviderProps extends KingdomState {}
export const KingdomProvider = ({ nation, armies, children }: PropsWithChildren<KingdomProviderProps>) => {
  const [n] = useState<Nation | null>(nation);
  const [a] = useState<NationArmy[]>(armies);

  return <KingdomContext.Provider value={{ nation: n, armies: a }}>{children}</KingdomContext.Provider>;
};
