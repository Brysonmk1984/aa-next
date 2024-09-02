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

const GameProvider = (props: PropsWithChildren<GameDataProviderProps>) => {
  const { weapon_armor_values, aoe_spread_values, income } = props;

  return (
    <GameContext.Provider value={{ weapon_armor_values, aoe_spread_values, income }}>
      {props.children}
    </GameContext.Provider>
  );
};
export default GameProvider;
