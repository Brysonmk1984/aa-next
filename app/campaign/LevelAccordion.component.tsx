'use-client';

import { runCampaignBattle } from '@/services/campaign';

import { CampaignLevel } from '@/types/campaign.type';
import { CampaignNation, CampaignNationProfile } from '@/types/nation.type';
import { numberFormat } from '@/utils/numberFormat';
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
  session: Record<PropertyKey, string>;
}

export const LevelAccordion: ComponentType<LevelAccordion> = ({
  levels,
  activeLevel,
  highestLevel,
  selectedNation,
  onChange,
  session,
}) => {
  const handleBattleClick = async (l: CampaignLevel) => {
    try {
      const result = await runCampaignBattle({
        level: l.level,
        accessToken: session.accessToken,
        contenders: [5, l.nation_id],
      });
      console.log({ runCampaignBattleResult: result });
    } catch (e) {
      console.error(e);
    }
  };

  if (!session.accessToken) {
    throw new Error('Cannot battle without an access token!');
  }

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
                  <div className="flex">
                    <div className="flex-initial">
                      <p>{l.lore}</p>
                      <ul>
                        {selectedNation.all_armies.map((army) => (
                          <li key={army.id}>
                            {numberFormat(army.count)} {army.army_name}
                            <p>{army.lore}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-64 flex-initial text-center">
                      <button
                        className="px-3 py-1 border border-r-ivory bg-red  hover:bg-gray-dark"
                        onClick={() => handleBattleClick(l)}
                      >
                        Battle
                      </button>
                    </div>
                  </div>
                )}
              </AccordionItemPanel>
            </AccordionItem>
          );
        }
      })}
    </Accordion>
  );
};
