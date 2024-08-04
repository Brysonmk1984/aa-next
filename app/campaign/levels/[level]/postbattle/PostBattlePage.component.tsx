'use client';

import { CLEAR_BATTLE_ON_POSTBATTLE } from '@/configs/environment.config';
import { useSessionStorage } from '@/hooks';
import { useNation } from '@/hooks/nation.hook';
import { CampaignNationProfile } from '@/types';
import { BattleDetails, DirectionOfArmy } from '@/types/battle.type';
import { getTypedEntries, mapStatsToDisplay, pascalCaseToTitleCase } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

interface PostBattlePage {
  enemyDetails: CampaignNationProfile;
}

export const PostBattlePage: ComponentType<PostBattlePage> = ({ enemyDetails }) => {
  const router = useRouter();
  const {
    nation: { name: playerNationName },
  } = useNation();
  const { getItem, removeItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');
  const [data, setData] = useState<BattleDetails>();

  useEffect(() => {
    (async () => {
      const data = getItem();
      if (!data) {
        router.push('/campaign/levels');
        return null;
      }

      setData(data);

      if (CLEAR_BATTLE_ON_POSTBATTLE) {
        removeItem();
      }
    })();
  }, [getItem, removeItem, router]);

  if (!data) {
    return null;
  }

  const {
    army_compositions,
    battle_result,
    events,
    reward,
    stats: [player, opponent],
  } = data;
  const { winner, loser, win_type, eastern_battalions, western_battalions } = battle_result;
  const playerIsWinner = winner === DirectionOfArmy.EasternArmy;
  const winnerName = playerIsWinner ? playerNationName : enemyDetails.nation_details.name;
  const loserName = playerIsWinner ? enemyDetails.nation_details.name : playerNationName;

  return (
    <div className=" text-center">
      <h1 className="block">{playerIsWinner ? 'VICTORY!' : 'DEFEAT!'}</h1>
      <h2 className="mb-2">{pascalCaseToTitleCase(win_type)}</h2>
      <div>
        <h3>
          {winnerName} defeats {loserName}
        </h3>
        <hr />
        <h2 className="mt-12">Survivors</h2>

        <div className="flex justify-around">
          <ul className="text-left">
            {eastern_battalions.map((battalion, i) => (
              <li key={i}>
                <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">
                  {battalion.count.toLocaleString()}
                </span>
                {<span className={classNames({ 'line-through': !battalion.count })}>{battalion.name}</span>}
              </li>
            ))}
          </ul>
          <ul className="text-left">
            {western_battalions.map((battalion, i) => (
              <li key={i}>
                <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">
                  {battalion.count.toLocaleString()}
                </span>
                {
                  <span className={classNames({ 'line-through': !battalion.count })}>
                    <span>{battalion.name}</span>
                  </span>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2>Stats</h2>

      <div className="flex justify-around">
        <ul className="text-left">
          {getTypedEntries(player).map(([stat, value], i) => (
            <li key={i}>
              <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">
                {value.toLocaleString()}
              </span>
              <span>{mapStatsToDisplay(stat)}</span>
            </li>
          ))}
        </ul>

        <ul className="text-left">
          {getTypedEntries(opponent).map(([stat, value], i) => (
            <li key={i}>
              <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">
                {value.toLocaleString()}
              </span>
              <span>{mapStatsToDisplay(stat)}</span>
            </li>
          ))}
        </ul>
      </div>
      {playerIsWinner && reward ? (
        <>
          <h2>Reward</h2>

          <strong className="text-xl text-red">{reward[0].toLocaleString()}</strong>
          {typeof reward[1] === 'string' ? <span> {reward[1]}</span> : <span> {reward[1].Enlist}</span>}
        </>
      ) : null}

      <div className="text-center mt-16 ">
        <Link href={`/campaign/levels`}>
          <button className="btn btn-transparent">Back to Campaign</button>
        </Link>
      </div>
    </div>
  );
};
