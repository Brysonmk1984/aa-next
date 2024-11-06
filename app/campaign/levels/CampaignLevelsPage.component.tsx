'use client';

import { ALLOW_PREVIOUS_LEVEL_BATTLES } from '@/configs/environment.config';
import { useNation } from '@/hooks/nation.hook';
import { CampaignLevelWithReward } from '@/types/campaign.type';
import { convertLevel } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { ComponentType, useEffect, useState } from 'react';

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
  const {
    campaign: { highestLevelCompleted },
  } = useNation();
  const [levelGroups, setLevelGroups] = useState<CampaignLevelWithReward[][]>([]);

  useEffect(() => {
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

  // Should return The next highest available level in the highest available region
  const { regionNum, levelInRegionNum } = convertLevel(highestLevelCompleted);

  return (
    <>
      <h1>Levels</h1>
      <div>
        {levelGroups.map((group, i) => {
          const regionIndex = i + 1;
          if (regionIndex > regionNum) {
            return null;
          }

          return (
            <>
              <h2>{regions[i] ?? `Region ${regionNum}`}</h2>
              <div className="flex flex-wrap justify-center">
                {group.map((level, j) => {
                  // Later levels
                  if (highestLevelCompleted + 1 < level.level) {
                    return null;
                  }

                  // Current or previous levels
                  const levelWithinGroupNum = j + 1;

                  const isPreviousLevel = highestLevelCompleted >= level.level;

                  return (
                    <>
                      {isPreviousLevel && !ALLOW_PREVIOUS_LEVEL_BATTLES ? (
                        <div
                          key={level.level}
                          className={classNames('relative  m-4 w-[300px] h-[300px] text-center no-underline')}
                        >
                          <div className="w-full h-full border rounded-sm p-4">
                            <LevelPanelContent
                              isPreviousLevel={isPreviousLevel}
                              level={level}
                              regionNum={regionNum}
                              levelWithinGroupNum={levelWithinGroupNum}
                            />
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`/campaign/levels/${level.id}/prebattle`}
                          key={level.level}
                          className={classNames(
                            'relative border border-dashed rounded-sm  p-4 m-4 w-[300px] h-[300px] text-center no-underline',
                          )}
                        >
                          <LevelPanelContent
                            isPreviousLevel={isPreviousLevel}
                            level={level}
                            regionNum={regionNum}
                            levelWithinGroupNum={levelWithinGroupNum}
                          />
                        </Link>
                      )}
                    </>
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

interface LevelPanelContentProps {
  isPreviousLevel: boolean;
  level: CampaignLevelWithReward;
  regionNum: number;
  levelWithinGroupNum: number;
}

const LevelPanelContent: ComponentType<LevelPanelContentProps> = ({
  isPreviousLevel,
  level,
  regionNum,
  levelWithinGroupNum,
}) => {
  return (
    <>
      <h3 className={classNames({ ' line-through': isPreviousLevel })}>{level.nation_name}</h3>
      {isPreviousLevel && <div className="text-8xl mt-8 text-red"> &#10003;</div>}
      <div className="absolute bottom-1 right-2 font-thin text-gray-dark">
        Region <strong className="font-bold text-lg">{regionNum}</strong>, Nation
        <strong className=" font-bold text-lg">{levelWithinGroupNum}</strong>
      </div>
    </>
  );
};
