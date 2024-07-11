'use client';

import { useSessionStorage } from '@/hooks';
import { useNation } from '@/hooks/nation.hook';
import { CampaignNationProfile } from '@/types';
import {
  BattleDetails,
  BattleStats,
  DirectionOfArmy,
  RewardType,
  RewardTypeEnlist,
  RewardTypeGold,
  WinCondition,
} from '@/types/battle.type';
import {
  getTypedEntries,
  mapStatsToDisplay,
  pascalCaseToTitleCase,
  snakeCaseToSentenceCase,
  toTitleCase,
} from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';
import { RxValue } from 'react-icons/rx';

interface PostBattlePage {
  enemyDetails: CampaignNationProfile;
}

export const PostBattlePage: ComponentType<PostBattlePage> = ({ enemyDetails }) => {
  const router = useRouter();
  const {
    nation: { name: playerNationName },
  } = useNation();
  const { getItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');

  const data = getItem();
  if (!data) {
    router.push('/campaign/levels');
    return null;
  }

  const {
    army_compositions,
    battle_result,
    events,
    reward: [amount, earnedReward],
    stats: [player, opponent],
  } = data;
  const { winner, loser, win_type, eastern_battalions, western_battalions } = battle_result;
  const playerIsWinner = winner === DirectionOfArmy.EasternArmy;
  const winnerName = playerIsWinner ? playerNationName : enemyDetails.nation_details.name;
  const loserName = playerIsWinner ? enemyDetails.nation_details.name : playerNationName;
  console.log(amount, earnedReward);

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
                <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">{battalion.count}</span>
                {<span className={classNames({ 'line-through': !battalion.count })}>{battalion.name}</span>}
              </li>
            ))}
          </ul>
          <ul className="text-left">
            {western_battalions.map((battalion, i) => (
              <li key={i}>
                <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">{battalion.count}</span>
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
              <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">{value}</span>
              <span>{mapStatsToDisplay(stat)}</span>
            </li>
          ))}
        </ul>

        <ul className="text-left">
          {getTypedEntries(opponent).map(([stat, value], i) => (
            <li key={i}>
              <span className="text-red text-lg font-bold inline-block w-14 text-right mr-2">{value}</span>
              <span>{mapStatsToDisplay(stat)}</span>
            </li>
          ))}
        </ul>
      </div>
      {playerIsWinner && (
        <>
          <h2>Reward</h2>

          <strong className="text-xl text-red">{amount}</strong>
          {typeof earnedReward === 'string' ? <span> {earnedReward}</span> : <span> {earnedReward.Enlist}</span>}
        </>
      )}

      <div className="text-center mt-16 ">
        <Link href={`/campaign/levels`}>
          <button className="btn btn-red">Back to Campaign</button>
        </Link>
      </div>
    </div>
  );
};
