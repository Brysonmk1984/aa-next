'use client';

import { CampaignLevelWithReward } from '@/types/campaign.type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CampaignLevelsPageProps {
  levels: CampaignLevelWithReward[];
}

enum RegionNames {
  GrassLand = 'The Expansive Country-Side',
  NobleLand = 'The Highborn Noble Lands',
  MountainRange = 'The Titanfel Mountain Range',
  MysticalForest = 'The Mystical Vale',
  MonasteryGates = 'The Monastery Gates',
  MarshLand = 'Skull Crater Swampland',
}

const regions = [
  RegionNames.GrassLand,
  RegionNames.NobleLand,
  RegionNames.MountainRange,
  RegionNames.MysticalForest,
  RegionNames.MonasteryGates,
  RegionNames.MarshLand,
];

export const CampaignLevelsPage = ({ levels }: CampaignLevelsPageProps) => {
  const [levelGroups, setLevelGroups] = useState<CampaignLevelWithReward[][]>([]);

  useEffect(() => {
    console.log(levels);

    const levelGroups = levels.reduce((acc: CampaignLevelWithReward[][], level: CampaignLevelWithReward) => {
      // acc should look like [[{..cl},{..cl},{..cl},{..cl},{..cl}],[..],[..],[..],[..],[..]]

      // Initial level
      if (!acc.length) {
        return [[level]];
      }
      const levelGroupCount = acc.length;
      const lastGroupArrayIndex = levelGroupCount - 1;
      // If the latest group array is less than five, push the new level in there
      if (acc[lastGroupArrayIndex].length < 5) {
        acc[lastGroupArrayIndex].push(level);
        return acc;
      } else {
        // Otherwise, the latest group array is free so push a new group array with the current level
        acc.push([level]);
        return acc;
      }
    }, []);

    setLevelGroups(levelGroups);
  }, [levels]);

  return (
    <>
      <h1>Levels</h1>
      <div>
        {levelGroups.map((group, i) => {
          const regionNum = i + 1;
          return (
            <>
              <h2>{regions[i] ?? `Region ${regionNum}`}</h2>
              <div className="flex flex-wrap justify-center">
                {group.map((level, j) => {
                  const levelNum = j + 1;
                  return (
                    <Link
                      href={`/campaign/levels/${level.id}/prebattle`}
                      key={levelNum}
                      className="relative border border-dashed rounded-sm w-1/4 p-4 m-4 w-[300px] h-[300px] text-center no-underline"
                    >
                      <h3>{level.nation_name}</h3>

                      <div className="absolute bottom-1 right-2 font-thin text-gray-dark">
                        Region <strong className="font-bold text-lg">{regionNum}</strong>, Nation{' '}
                        <strong className=" font-bold text-lg">{levelNum}</strong>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
