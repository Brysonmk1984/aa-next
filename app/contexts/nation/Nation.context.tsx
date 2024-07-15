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
export const NationProvider = (initialValues: PropsWithChildren<NationProviderProps>) => {
  const [state, dispatch] = useReducer(NationReducer, initialValues);
  const { nation, armies, campaign } = state;
  if (nation && nation.name === '') {
    window.location.assign('/founding');
  }

  return <NationContext.Provider value={{ nation, armies, campaign, dispatch }}>{children}</NationContext.Provider>;
};
