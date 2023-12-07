'use-client';

import { getCampaignLevelDetails } from '@/services/nation';
import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNation, NationWithArmy } from '@/types/nation.type';
import { ComponentType, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

interface LevelAccordion {
  levels: Array<CampaignLevel>;
  activeLevel: number;
  highestLevel: number;
  selectedNation: NationWithArmy | undefined;
  onChange: (expandedItems: Array<number>) => void;
}

export const LevelAccordion: ComponentType<LevelAccordion> = ({
  levels,
  activeLevel,
  highestLevel,
  selectedNation,
  onChange,
}) => {
  return (
    <Accordion allowZeroExpanded={true} preExpanded={[activeLevel]} onChange={onChange}>
      {levels.map((l) => {
        if (l.level <= highestLevel + 1) {
          console.log(selectedNation);

          return (
            <AccordionItem key={l.id} uuid={l.level}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <h2 className="inline">
                    <strong>level {l.level}</strong> <span className="inline-block ml-4">{l.nation_name}</span>
                  </h2>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {l.nation_id && selectedNation && (
                  <>
                    <ul>
                      {selectedNation.armies.map((army) => (
                        <li>
                          {army.count} {army.army_name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </AccordionItemPanel>
            </AccordionItem>
          );
        }
      })}
    </Accordion>
  );
};
