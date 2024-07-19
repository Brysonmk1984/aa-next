'use client';
import { useSessionStorage } from '@/hooks';
import { useNation } from '@/hooks/nation.hook';
import { runCampaignBattle } from '@/services';
import { CampaignNationProfile } from '@/types';
import { BattleDetails, DirectionOfArmy, RewardTypeEnum } from '@/types/battle.type';
import { convertLevel } from '@/utils';
import { useRouter } from 'next/navigation';

interface PreBattlePageProps {
  enemyDetails: CampaignNationProfile;
  level: number;
}

export const PreBattlePage = ({ enemyDetails, level: totalLevel }: PreBattlePageProps) => {
  const router = useRouter();
  const { storeItem, getItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');
  const { nation, armies, dispatch } = useNation();
  console.log({ armies });

  const {
    nation_details: { name: enemyName, lore: enemyLore, id: enemyNationId },
    all_armies: enemyArmies,
  } = enemyDetails;
  const { level, region } = convertLevel(totalLevel);

  const handleBattleClick = async () => {
    try {
      const result = await runCampaignBattle({
        level: totalLevel,
        contenders: [nation.id, enemyNationId],
      });
      console.log(result);

      // TODO: Instead of this, we need to just GET nation armies belonging to user. This way, we're also accounting for the nations already created as a result of a reward
      const armiesToUpdate = result.battle_result.eastern_battalions
        .map((endingArmy) => {
          const matchingArmy = armies.find((army) => army.army_name === endingArmy.name);

          if (!matchingArmy) {
            throw new Error("Couldn't locate matching army");
          } else if (endingArmy.count === 0) {
            return undefined;
          } else {
            matchingArmy.count = endingArmy.count;
            return matchingArmy;
          }
        })
        .filter((maybeArmy) => typeof maybeArmy !== 'undefined');

      dispatch({ type: 'nationArmiesReplaceAllAction', payload: armiesToUpdate });

      if (result.battle_result.winner === DirectionOfArmy.EasternArmy) {
        if (result.reward[1] === 'Gold') {
          dispatch({ type: 'addNationGoldByAmount', payload: result.reward[0] });
        }

        dispatch({ type: 'updateHighestLevelCompleted', payload: totalLevel });
      }

      if (!getItem()) {
        storeItem(result);
      }

      //router.push(`/campaign/levels/${totalLevel}/battle`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex flex-wrap-reverse md:flex-nowrap">
        <div className="min-w-[300px] p-8">
          <h2>{nation.name}</h2>
          <h3>Warriors</h3>
          <ul>
            <li>
              {armies.map((army) => {
                return (
                  <li key={army.id} className="flex gap-2 items-center">
                    <span className="font-bold text-gray-dark text-lg w-[50px] text-right">{army.count}</span>
                    <span className=" text-gray-dark">{army.army_name}</span>
                  </li>
                );
              })}
            </li>
          </ul>
          <div className="text-center mt-8">
            <button className="btn btn-red" onClick={() => router.push('/enlist')}>
              Hire More
            </button>
          </div>
        </div>
        <div className="flex-grow md:border-l p-8">
          <h1 className="block">{enemyName}</h1>
          {level && (
            <h2>
              Region {region}, Nation {level}
            </h2>
          )}
          <p>{enemyLore}</p>
          <br />
          <h3>Warriors</h3>
          <ul className="flex w-1/2">
            {enemyArmies.map((army) => {
              return (
                <li key={army.id} className="flex gap-2 items-center">
                  <span className="font-bold text-gray-dark text-lg text-right">{army.count}</span>
                  <span className=" text-gray-dark">{army.army_name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-dashed">
        <div className="mt-4">
          <button className="btn btn-red" onClick={handleBattleClick}>
            Battle
          </button>
        </div>
      </div>
    </>
  );
};
