'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAmplitude } from './amplitude.config';
import { AmplitudeClient } from 'amplitude-js';

export type AmplitudeProviderProps<P = unknown> = React.FC<{ children: ReactNode; token: string } & P>;

export const AmplitudeContext = createContext<AmplitudeClient | null | undefined>(undefined);

export const AmplitudeProvider: AmplitudeProviderProps = ({ children, token }) => {
  const [amplitude, setAmplitude] = useState<AmplitudeClient | null>(null);

  useEffect(() => {
    setAmplitude(getAmplitude(token) || null);
  }, [token]);

  return <AmplitudeContext.Provider value={amplitude}>{children}</AmplitudeContext.Provider>;
};

export const useAmplitude = () => {
  const context = useContext(AmplitudeContext);

  if (context === undefined) {
    throw Error('useAmplitudeContext must be used inside of an <AmplitudeProvider />');
  }

  return context;
};
