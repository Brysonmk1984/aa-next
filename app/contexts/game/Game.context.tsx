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

export const GameProvider = (props: PropsWithChildren<GameDataProviderProps>) => {
  const { weapon_armor_values, aoe_spread_values, income, armies } = props;

  return (
    <GameContext.Provider value={{ weapon_armor_values, aoe_spread_values, income, armies }}>
      {props.children}
    </GameContext.Provider>
  );
};
