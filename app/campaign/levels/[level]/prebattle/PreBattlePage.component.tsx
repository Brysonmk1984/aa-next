'use client';
import { useGameContext } from '@/contexts';
import { useSessionStorage } from '@/hooks';
import { useNation } from '@/hooks/nation.hook';
import { useUser } from '@/hooks/user.hook';
import { getNationArmies, runCampaignBattle } from '@/services';
import { CampaignNationProfile } from '@/types';
import { BattleDetails, DirectionOfArmy } from '@/types/battle.type';
import { CampaignLevelReward } from '@/types/campaign.type';
import { calculateArmyCount, convertLevel } from '@/utils';
import { numberFormat } from '@/utils/numberFormat';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PreBattlePageProps {
  enemyDetails: CampaignNationProfile;
  level: number;
}

export const PreBattlePage = ({ enemyDetails, level: totalLevel }: PreBattlePageProps) => {
  const router = useRouter();
  const { storeItem, getItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');
  const { user } = useUser();
  const { campaignDefaults } = useGameContext();
  const { nation, armies, dispatch } = useNation();
  const [reward, setReward] = useState<CampaignLevelReward | null>(null);
  const hasStandingArmy = !!calculateArmyCount(armies);

  const {
    nation_details: { name: enemyName, lore: enemyLore, id: enemyNationId },
    all_armies: enemyArmies,
  } = enemyDetails;
  const { levelInRegionNum, regionNum } = convertLevel(totalLevel);

  const handleBattleClick = async () => {
    try {
      if (nation && !nation.name) {
        router.push('/founding');
      }

      const result = await runCampaignBattle({
        level: totalLevel,
        contenders: [nation.id, enemyNationId],
      });

      const armiesAfterBattleAndRewards = await getNationArmies(user.id, nation.id);

      dispatch({ type: 'nationArmiesReplaceAllAction', payload: armiesAfterBattleAndRewards });

      if (result.battle_result.winner === DirectionOfArmy.EasternArmy) {
        // NationArmy rewards are already fetched from the getNationArmies request
        if (result.reward[1] === 'Gold') {
          dispatch({ type: 'addNationGoldByAmount', payload: result.reward[0] });
        }

        dispatch({ type: 'updateHighestLevelCompleted', payload: totalLevel });
      }

      if (!getItem()) {
        storeItem(result);
      }

      router.push(`/campaign/levels/${totalLevel}/battle`);
    } catch (e) {
      console.error(e);
    }
  };

  const formatReward = (reward: CampaignLevelReward) => {
    const [count, unit] = reward;
    if (typeof unit === 'string') {
      return (
        <>
          <span className="font-bold text-gray-dark text-lg w-[50px] text-right">{numberFormat(count)}</span>{' '}
          <span>{unit}</span>
        </>
      );
    } else {
      if (!unit) {
        throw new Error('No unit on the reward');
      }
      return (
        <>
          <span className="font-bold text-gray-dark text-lg w-[50px] text-right mr-2">{numberFormat(count)}</span>
          {unit.Enlist}
        </>
      );
    }
  };

  useEffect(() => {
    if (campaignDefaults) {
      const matchingLevel = campaignDefaults.find((l) => l.level === totalLevel);
      if (!matchingLevel) {
        throw new Error('No matching Level to retrieve reward from');
      }
      setReward(matchingLevel.reward);
    }
  }, [campaignDefaults, totalLevel]);

  return (
    <>
      <div className="flex flex-wrap-reverse md:flex-nowrap">
        <div className="min-w-[300px] p-8">
          <h2>{nation.name}</h2>
          <h3>Warriors</h3>
          <ul>
            {armies.map((army) => {
              return (
                <li key={army.id} className="flex gap-2 items-center">
                  <span className="font-bold text-gray-dark text-lg w-[50px] text-right">
                    {army.count.toLocaleString()}
                  </span>
                  <span className=" text-gray-dark">{army.army_name}</span>
                </li>
              );
            })}
          </ul>
          <div className="text-center mt-8">
            <button className="btn btn-transparent" onClick={() => router.push('/warriors')}>
              Hire
            </button>
          </div>
        </div>
        <div className="flex-grow md:border-l p-8">
          <h1 className="block">{enemyName}</h1>

          <h2>
            Region {regionNum}, Nation {levelInRegionNum}
          </h2>

          <p>{enemyLore}</p>
          <br />
          <h3>Warriors</h3>
          <ul className="flex w-1/2">
            {enemyArmies.map((army) => {
              return (
                <li key={army.id} className="flex gap-2 items-center">
                  <span className="font-bold text-gray-dark text-lg text-right">{army.count.toLocaleString()}</span>
                  <span className=" text-gray-dark">{army.army_name}</span>
                </li>
              );
            })}
          </ul>
          {!!reward && (
            <>
              <h3 className="mt-10">Reward</h3>
              <span className=" text-gray-dark">{formatReward(reward)}</span>
            </>
          )}
        </div>
      </div>
      <div className="text-center mt-8 border-t border-dashed">
        <div className="mt-4">
          <button
            className={classNames('btn btn-transparent', {
              'disabled:bg-gray-dark disabled:text-gray disabled:border-gray-dark disabled:shadow-none':
                !hasStandingArmy,
            })}
            onClick={handleBattleClick}
            disabled={!hasStandingArmy}
          >
            Battle
          </button>
        </div>
        {!hasStandingArmy && (
          <p className="mt-4 text-sm">
            <em>You need an army to fight</em>
          </p>
        )}
      </div>
    </>
  );
};
