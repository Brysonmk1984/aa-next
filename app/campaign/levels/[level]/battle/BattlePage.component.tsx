'use client';
import { useSessionStorage } from '@/hooks';
import { useNation } from '@/hooks/nation.hook';
import { CampaignNationProfile } from '@/types';
import { BattleDetails } from '@/types/battle.type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BattlePageProps {
  level: number;
  enemyDetails: CampaignNationProfile;
}

export const BattlePage = ({ level: totalLevel, enemyDetails }: BattlePageProps) => {
  const router = useRouter();
  const { getItem } = useSessionStorage<BattleDetails>('aa-latest-battle-results');
  const { nation } = useNation();
  const [details, setDetails] = useState<BattleDetails>();
  const [eventGroups, setEventGroups] = useState<string[][]>([]);
  const [groupsDisplayed, setGroupsDisplayed] = useState<string[][]>([]);
  const [displayComplete, setDisplayComplete] = useState(false);

  const handleEventList = (events: string[]) => {
    const title = 'THE BATTLE BEGINS: Both Eastern & Western Army are marching towards each other';
    const conclusion = "THE BATTLE ENDS: Eastern Army has defeated all of the Western Army's forces!";
    return events.reduce<string[][]>((acc, event) => {
      if (event.includes(title) || event.includes(conclusion)) {
        return acc;
      }

      const updatedAcc = [...acc];
      if (event.includes('TICK')) {
        updatedAcc.push([event]);
      } else {
        updatedAcc[updatedAcc.length - 1].push(event);
      }

      return updatedAcc;
    }, []);
  };

  const handleTimedDisplay = (groups: string[][]) => {
    // [ [string, string, ...], [string, string, ...] ]

    const displayInterval = setInterval(() => {
      setGroupsDisplayed((existing: string[][]) => {
        // Cancel interval on ending and return existing array
        if (!groups.length) {
          clearInterval(displayInterval);
          setDisplayComplete(true);
          return [...existing];
        }

        // Every iteration, add a new group
        return [...existing, groups.splice(0, 1)[0]];
      });
    }, 100);

    return displayInterval;
  };

  useEffect(() => {
    const battleResults = getItem();

    if (!battleResults) {
      return router.push('/campaign/levels');
    }

    const groups = handleEventList(battleResults.events);

    //setEventGroups(groups);

    const interval = handleTimedDisplay(groups);

    return () => clearInterval(interval);
  }, [getItem, router]);

  return (
    <>
      <h1>Battle</h1>
      <div className="text-center">
        <h2>
          {nation.name} vs {enemyDetails.nation_details.name}
        </h2>
        <ol className="grid grid-cols-5 text-left">
          {groupsDisplayed.map((group, i) => {
            return (
              <li key={i}>
                <ul>
                  {group.map((event, j) => {
                    return (
                      <li key={j} className="text-sm">
                        {event}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}

          {/* {eventGroups.map((group, i) => {
            return (
              <li key={i}>
                <ul>
                  {group.map((event, j) => {
                    return (
                      <li key={j} className="text-sm">
                        {event}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })} */}
        </ol>
        {displayComplete && (
          <Link href={`/campaign/levels/${totalLevel}/postbattle`}>
            <button className="btn btn-red">View Breakdown</button>
          </Link>
        )}
      </div>
    </>
  );
};
