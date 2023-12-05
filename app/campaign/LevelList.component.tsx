'use client';
import { getCampaignLevelDetails } from '@/services/nation';
import { CampaignLevel } from '@/types/campaign.type';
import { ComponentType, useState } from 'react';

interface LevelListProps {
  levels: Array<CampaignLevel>;
  highestLevel: number;
}

export const LevelList: ComponentType<LevelListProps> = ({ levels, highestLevel }) => {
  const [activeLevel, setActiveLevel] = useState(0);

  const handleGetLevel = async (level: number) => {
    console.log(level);

    const result = await getCampaignLevelDetails(level);
    console.log(result);

    setActiveLevel(level);
  };
  console.log(activeLevel);

  return (
    <>
      {levels.length && (
        <ul>
          {levels.map(({ level, id, nation_name }) => {
            if (level <= highestLevel) {
              return (
                <li key={id} onClick={() => handleGetLevel(level)}>
                  {nation_name}
                </li>
              );
            }
          })}
        </ul>
      )}
    </>
  );
};
