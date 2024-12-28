'use client';

import { Loader } from '@/components';
import { ALLOW_PREVIOUS_LEVEL_BATTLES } from '@/configs/environment.config';
import { useGameContext } from '@/contexts';
import { useNation } from '@/hooks/nation.hook';
import { CampaignLevel } from '@/types/campaign.type';
import { convertLevel } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

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

export const CampaignLevelsPage = () => {
  const router = useRouter();
  const { campaignDefaults: levels } = useGameContext();

  const {
    campaign: { highestLevelCompleted },
  } = useNation();
  const [levelGroups, setLevelGroups] = useState<CampaignLevel[][]>([]);

  const handleLevelClick = (id: number) => {
    const route = `/campaign/levels/${id}/prebattle`;
    router.push(route);
  };

  useEffect(() => {
    if (levels) {
      const levelGroups = levels.reduce((acc: CampaignLevel[][], level: CampaignLevel) => {
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
    }
  }, [levels]);

  // Should return The next highest available level in the highest available region
  const currentActiveLevel = highestLevelCompleted + 1;
  const { regionNum: currentRegionNum } = convertLevel(currentActiveLevel);

  return !levels ? (
    <Loader />
  ) : (
    <>
      <h1>Levels</h1>
      <div>
        {levelGroups.map((group, regionIndex) => {
          const regionNumber = regionIndex + 1;

          if (regionNumber > currentRegionNum) {
            return null;
          }

          return (
            <div key={regionIndex}>
              <h2>{regions[regionIndex] ?? `Region ${currentRegionNum}`}</h2>
              <div className="flex flex-wrap justify-center">
                {group.map(({ level, nation_name, id }) => {
                  // Later levels
                  if (currentActiveLevel < level) {
                    return null;
                  }

                  const { regionNum, levelInRegionNum } = convertLevel(level);

                  // Previous levels
                  const isPreviousLevel = highestLevelCompleted >= level;
                  const isActiveLevel = currentActiveLevel === level;

                  return (
                    <div key={level}>
                      <div
                        className={classNames('relative text-center no-underline m-4 w-[300px] h-[300px]', {
                          'cursor-pointer-glove': isActiveLevel,
                        })}
                        onClick={() =>
                          (isPreviousLevel && ALLOW_PREVIOUS_LEVEL_BATTLES) || isActiveLevel
                            ? handleLevelClick(id)
                            : undefined
                        }
                      >
                        <div className="w-full h-full border border-dashed rounded-sm p-4 font-sans">
                          <LevelPanelContent
                            isPreviousLevel={isPreviousLevel}
                            nation_name={nation_name}
                            regionNum={regionNum}
                            levelWithinGroupNum={levelInRegionNum}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

interface LevelPanelContentProps {
  isPreviousLevel: boolean;
  nation_name: string;
  regionNum: number;
  levelWithinGroupNum: number;
}

const LevelPanelContent: ComponentType<LevelPanelContentProps> = ({
  isPreviousLevel,
  nation_name,
  regionNum,
  levelWithinGroupNum,
}) => {
  return (
    <>
      <h3 className={classNames({ ' line-through': isPreviousLevel })}>{nation_name}</h3>
      {isPreviousLevel && <div className="text-8xl mt-8 text-red"> &#10003;</div>}
      <div className="absolute bottom-1 right-2 font-thin text-gray-dark">
        Region <strong className="font-bold text-lg">{regionNum}</strong>, Nation
        <strong className=" font-bold text-lg"> {levelWithinGroupNum}</strong>
      </div>
    </>
  );
};
