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

export const PreBattlePage = ({ enemyDetails, level: activeLevel }: PreBattlePageProps) => {
  const router = useRouter();
  const { storeItem, getItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');
  const { user } = useUser();
  const { campaignDefaults, armyUnlockMap } = useGameContext();
  const { nation, armies, dispatch } = useNation();
  const [reward, setReward] = useState<CampaignLevelReward | null>(null);
  const hasStandingArmy = !!calculateArmyCount(armies);
  const [armyTypeDifference, setArmyTypeDifference] = useState(0);

  const {
    nation_details: { name: enemyName, lore: enemyLore, id: enemyNationId },
    all_armies: enemyArmies,
  } = enemyDetails;
  const { levelInRegionNum, regionNum } = convertLevel(activeLevel);

  const handleBattleClick = async () => {
    try {
      if (nation && !nation.name) {
        router.push('/founding');
      }

      const result = await runCampaignBattle({
        level: activeLevel,
        contenders: [nation.id, enemyNationId],
      });

      const armiesAfterBattleAndRewards = await getNationArmies(user.id, nation.id);

      dispatch({ type: 'nationArmiesReplaceAllAction', payload: armiesAfterBattleAndRewards });

      if (result.battle_result.winner === DirectionOfArmy.EasternArmy) {
        // NationArmy rewards are already fetched from the getNationArmies request
        if (result.reward[1] === 'Gold') {
          dispatch({ type: 'addNationGoldByAmount', payload: result.reward[0] });
        }

        dispatch({ type: 'updateHighestLevelCompleted', payload: activeLevel });
      }

      if (!getItem()) {
        storeItem(result);
      }

      router.push(`/campaign/levels/${activeLevel}/battle`);
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
      const matchingLevel = campaignDefaults.find((l) => l.level === activeLevel);
      if (!matchingLevel) {
        throw new Error('No matching Level to retrieve reward from');
      }
      setReward(matchingLevel.reward);
    }
  }, [campaignDefaults, activeLevel]);

  useEffect(() => {
    setArmyTypeDifference(armies.length - enemyArmies.length);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="pr-4 shrink-0 w-[600px] lg:w-[830px]">
          <h1 className="block">{enemyName}</h1>

          <h2>
            Region {regionNum}, Nation {levelInRegionNum}
          </h2>
          <div
            id="campaignMap"
            className={classNames(`btn btn-transparent hidden sm:block`, { [`campaign-level-${activeLevel}`]: true })}
            onClick={() => window.location.assign('/images/maps/avalore_text_and_banner.jpg')}
          >
            <div id="marker" className=" top-[50%] left-[50%]"></div>
          </div>
          <p className="mt-8">{enemyLore}</p>
          <br />
        </div>
        <div className=" shrink-0 lg:w-1/4 lg:border-l lg:border-dashed lg:pl-4 pb-8">
          {!!reward && (
            <>
              <>
                <h3 className="mt-10">Reward</h3>
                <span className=" text-gray-dark">{formatReward(reward)}</span>
              </>
            </>
          )}

          {armyUnlockMap[activeLevel] && (
            <>
              <h3 className="mt-10">Unlock</h3>
              <span className=" text-gray-dark">{armyUnlockMap[activeLevel]}</span>
            </>
          )}
        </div>
      </div>

      {/* 
  Bottom Section
*/}

      <div className="pt-8 border-t border-dashed">
        <h3 className="text-center">Warriors</h3>

        <div className="flex items-center">
          <div className="flex flex-grow justify-end  items-end text-right">
            <ul>
              {armies.map((army) => {
                return (
                  <li key={army.id} className="flex gap-2 items-end justify-end text-right w-full leading-8 ">
                    <div className=" text-gray-dark leading-8">{army.army_name}</div>
                    <div className="font-bold text-gray-dark text-lg w-[50px] leading-8">
                      {army.count.toLocaleString()}
                    </div>
                  </li>
                );
              })}
              {armyTypeDifference < 0 &&
                [...Array(Math.abs(armyTypeDifference)).keys()].map((index) => {
                  return (
                    <li key={index} className=" leading-8">
                      &nbsp;
                    </li>
                  );
                })}
              <li className="font-bold text-red text-lg leading-8 items-end justify-end text-right ">
                <span className="border-t-2 ">
                  {numberFormat(
                    armies.reduce((acc, cur) => {
                      acc += cur.count;
                      return acc;
                    }, 0),
                  )}
                </span>
              </li>
            </ul>
          </div>
          <div className=" flex-shrink text-4xl font-bold font-sans mx-8">VS</div>
          <div className="flex flex-grow">
            <ul>
              {enemyArmies.map((army) => {
                return (
                  <li key={army.id} className="flex gap-2 items-end justify-start text-left w-full leading-8">
                    <span className="font-bold text-gray-dark text-lg text-right leading-8">
                      {army.count.toLocaleString()}
                    </span>
                    <span className=" text-gray-dark leading-8">{army.army_name}</span>
                  </li>
                );
              })}
              {armyTypeDifference > 0 &&
                [...Array(Math.abs(armyTypeDifference)).keys()].map((index) => {
                  return (
                    <li key={index} className=" leading-8">
                      &nbsp;
                    </li>
                  );
                })}
              <li className="font-bold text-red text-lg">
                <span className="border-t-2">
                  {' '}
                  {numberFormat(
                    enemyArmies.reduce((acc, cur) => {
                      acc += cur.count;
                      return acc;
                    }, 0),
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center ">
        <div className="pt-12">
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
