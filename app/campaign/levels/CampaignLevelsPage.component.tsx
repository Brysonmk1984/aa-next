'use client';

import { CampaignLevelWithReward } from '@/types/campaign.type';
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

    const levelGroupCount = Math.ceil(levels.length / 5);

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
          return (
            <>
              <h2>{regions[i] ?? `Region ${i + 1}`}</h2>
              <div className="flex flex-wrap justify-center">
                {group.map((level, j) => {
                  return (
                    <div key={j} className="border rounded-sm w-1/4 p-4 m-4">
                      level {j}:{j}
                    </div>
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
