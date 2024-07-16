'use client';

import { Nation, NationArmy } from '@/types';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren, useReducer, useState } from 'react';
import { NationReducer } from './Nation.reducer';
import { NationContextValue, NationState } from './Nation.type';

const [NationContext, useContext] = createContext<NationContextValue>({
  name: 'NationContext',
});

export const useNationContext = () => {
  return useContext();
};

type NationProviderProps = Omit<NationState, 'dispatch'>;
export const NationProvider = ({ children, nation, armies, campaign }: PropsWithChildren<NationProviderProps>) => {
  const [state, dispatch] = useReducer(NationReducer, { nation, armies, campaign });

  if (nation && nation.name === '') {
    window.location.assign('/founding');
  }

  return (
    <NationContext.Provider value={{ nation: state.nation, armies: state.armies, campaign: state.campaign, dispatch }}>
      {children}
    </NationContext.Provider>
  );
};
