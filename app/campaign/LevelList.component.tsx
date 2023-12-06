'use client';
import { getCampaignLevelDetails } from '@/services/nation';
import { CampaignLevel } from '@/types/campaign.type';
import { ComponentType, useState } from 'react';
import { LevelAccordion } from './LevelAccordion.component';

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
        <div className="flex flex-col w-full mt-16">
          <LevelAccordion levels={levels} activeLevel={activeLevel} highestLevel={highestLevel} />
        </div>
      )}
    </>
  );
};
