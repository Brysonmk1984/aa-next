'use client';

import { getCampaignLevels } from '@/actions/getCampaignLevels.action';
import { ArmyName, CampaignLevel } from '@/types/campaign.type';
import { GameDefaults } from '@/types/game-data.type';
import { createContext } from '@/utils/context-abstraction.util';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

const campaignPageRoutes = ['/campaign', '/campaign/levels'];

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
  const [campaignDefaults, setCampaignDefaults] = useState<CampaignLevel[] | null>(null);
  const pathname = usePathname();
  const { weapon_armor_values, aoe_spread_values, income, armies, upkeep, constants } = props;

  const armyUnlockMap = armies.reduce<Record<number, ArmyName>>(
    (acc, army) => {
      acc[army.unlock_level] = army.name;
      return acc;
    },
    {} as Record<number, ArmyName>,
  );

  useEffect(() => {
    const getCampaignDefaultInfo = async () => {
      const [campaignLevels, rewards] = await getCampaignLevels();

      const campaignLevelsWithRewards = campaignLevels.map((campaignLevel) => {
        return {
          reward: rewards[campaignLevel.level] ?? [null, null],
          ...campaignLevel,
        };
      });

      setCampaignDefaults(campaignLevelsWithRewards);
    };

    const isCampaignLoadingRoute = campaignPageRoutes.reduce((acc, path) => {
      return acc || pathname.includes(path) ? true : false;
    }, false);

    if (!campaignDefaults && isCampaignLoadingRoute) {
      getCampaignDefaultInfo();
    }
  }, [pathname, campaignDefaults]);

  return (
    <GameContext.Provider
      value={{
        weapon_armor_values,
        aoe_spread_values,
        income,
        armies,
        upkeep,
        constants,
        campaignDefaults,
        armyUnlockMap,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
