'use-client';

import { CampaignLevel } from '@/types/campaign.type';
import { ComponentType } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

interface LevelAccordion {
  levels: Array<CampaignLevel>;
  activeLevel: number;
  highestLevel: number;
}

export const LevelAccordion: ComponentType<LevelAccordion> = ({ levels, activeLevel, highestLevel }) => {
  return (
    <Accordion allowZeroExpanded={true} preExpanded={[activeLevel]}>
      {levels.map((l) => {
        if (l.level <= highestLevel) {
          return (
            <AccordionItem key={l.id} uuid={l.id}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <h2 className="inline">
                    <strong>level {l.level}</strong> <span className="inline-block ml-4">{l.nation_name}</span>
                  </h2>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim
                  minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          );
        }
      })}
    </Accordion>
  );
};
