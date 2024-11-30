'use client';

import { GameDefaults } from '@/types/game-data.type';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren } from 'react';

type GameState = GameDefaults;

interface GameDataValue extends GameState {}

const [GameContext, useContext] = createContext<GameDataValue>({
  name: 'GameContext',
});

export const useGameContext = () => {
  return useContext();
};

interface GameDataProviderProps extends GameState {}

export const GameProvider = (props: PropsWithChildren<GameDataProviderProps>) => {
  const { weapon_armor_values, aoe_spread_values, income, armies, upkeep, constants } = props;

  return (
    <GameContext.Provider value={{ weapon_armor_values, aoe_spread_values, income, armies, upkeep, constants }}>
      {props.children}
    </GameContext.Provider>
  );
};
