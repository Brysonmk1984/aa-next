'use-client';

import { getCampaignLevelDetails } from '@/services/nation';
import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNation, CampaignNationProfile } from '@/types/nation.type';
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
  selectedNation: CampaignNationProfile | undefined;
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
                    <p>{l.lore}</p>
                    <ul>
                      {selectedNation.all_armies.map((army) => (
                        <li key={army.id}>
                          {army.count} {army.army_name}
                          <p>{army.lore}</p>
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
