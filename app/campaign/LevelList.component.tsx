'use client';
import { getCampaignLevelDetails } from '@/services/nation';
import { CampaignLevel } from '@/types/campaign.type';
import { ComponentType, useState } from 'react';
import { LevelAccordion } from './LevelAccordion.component';
import { NationWithArmy } from '@/types/nation.type';

interface LevelListProps {
  levels: Array<CampaignLevel>;
  highestLevel: number;
}

export const LevelList: ComponentType<LevelListProps> = ({ levels, highestLevel }) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [selectedNation, setSelectedNation] = useState<NationWithArmy>();

  const handleAccordionChange = async ([level]: Array<number>) => {
    if (typeof level === 'undefined') {
      return;
    }

    try {
      const response = await getCampaignLevelDetails(level);
      const nationDetails = {
        ...response[0],
        armies: response[1],
      };

      setSelectedNation(nationDetails);
      setActiveLevel(level);
      //console.log(nationDetails);
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
          />
        </div>
      )}
    </>
  );
};
