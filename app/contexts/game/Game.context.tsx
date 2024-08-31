'use client';

import { GameData } from '@/types/game-data.type';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren, useState } from 'react';

type GameState = GameData;

interface GameDataValue extends GameState {}

const [GameContext, useContext] = createContext<GameDataValue>({
  name: 'GameContext',
});

export const useGameContext = () => {
  return useContext();
};

interface GameDataProviderProps extends GameState {}

const GameProvider = ({
  weaponArmorValues,
  aoeSpreadValues,
  incomeCalcMinutes,
  upkeepCalcMinutes,
  children,
}: PropsWithChildren<GameDataProviderProps>) => {
  return (
    <GameContext.Provider value={{ weaponArmorValues, aoeSpreadValues, incomeCalcMinutes, upkeepCalcMinutes }}>
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
