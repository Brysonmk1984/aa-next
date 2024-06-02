'use client';

import { CampaignLevel } from '@/types/campaign.type';
import { ComponentType, useState } from 'react';
import { LevelAccordion } from './LevelAccordion.component';
import { CampaignNationProfile } from '@/types/nation.type';
import { getCampaignLevelDetails } from '@/services';

interface LevelListProps {
  levels: Array<CampaignLevel>;
  highestLevel: number;
  session: Record<PropertyKey, any>;
}

export const LevelList: ComponentType<LevelListProps> = ({ levels, highestLevel, session }) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [selectedNation, setSelectedNation] = useState<CampaignNationProfile>();

  const handleAccordionChange = async ([level]: Array<number>) => {
    if (typeof level === 'undefined') {
      return;
    }

    try {
      const response = await getCampaignLevelDetails(level);

      setSelectedNation(response);
      setActiveLevel(level);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {levels.length && (
        <div className="flex flex-col w-full mt-16">
          <LevelAccordion
            levels={levels}
            activeLevel={activeLevel}
            highestLevel={highestLevel}
            selectedNation={selectedNation}
            onChange={handleAccordionChange}
            session={session}
          />
        </div>
      )}
    </>
  );
};
