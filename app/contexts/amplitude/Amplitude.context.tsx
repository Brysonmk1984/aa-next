/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ComponentType, ReactNode, useEffect } from 'react';
import { init, track } from '@amplitude/analytics-browser';
import { AMPLITUDE_API_KEY } from '@/configs/environment.config';
import { createContext } from '@/utils/context-abstraction.util';

interface AmplitudeProviderValue {
  trackAmplitudeEvent: (eventName: string, eventProperties: Record<string, any>) => void;
}

export const [AmplitudeContext, useContext] = createContext<AmplitudeProviderValue>({
  name: 'AmplitudeContext',
});

export const useAmplitudeContext = () => {
  const context = useContext();
  if (context === undefined) throw new Error('useAmplitudeContext must be used within a AmplitudeContextProvider');
  return context;
};

interface AmplitudeProviderProps {
  children: ReactNode;
}
export const AmplitudeProvider: ComponentType<AmplitudeProviderProps> = ({ children }) => {
  const trackAmplitudeEvent = (eventName: string, eventProperties: Record<string, any>) => {
    track(eventName, eventProperties);
  };

  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
    });
  }, []);

  return <AmplitudeContext.Provider value={{ trackAmplitudeEvent }}>{children}</AmplitudeContext.Provider>;
};
