'use-client';
import { useNation } from '@/hooks';
import { runCampaignBattle } from '@/services';

import { CampaignLevel, CampaignLevelWithReward } from '@/types/campaign.type';
import { CampaignNationProfile } from '@/types/nation.type';
import { numberFormat } from '@/utils/numberFormat';
import { ComponentType, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

interface LevelAccordion {
  levels: Array<CampaignLevelWithReward>;
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
  const [visibleLevels, setVisibleLevels] = useState(highestLevel);
  const { nation, armies } = useNation();
  console.log({ nation, armies });

  const handleBattleClick = async (l: CampaignLevel) => {
    try {
      const result = await runCampaignBattle({
        level: l.level,
        accessToken: session.accessToken,
        contenders: [nation.id, l.nation_id],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Accordion allowZeroExpanded={true} preExpanded={[activeLevel]} onChange={onChange}>
      {levels.map((l) => {
        let [rewardAmount, reward] = l.reward;

        if (l.level <= visibleLevels) {
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
                      <p>{selectedNation.nation_details.lore}</p>
                      <br />
                      <strong>Standing Army:</strong>
                      <ul>
                        {selectedNation.all_armies.map((army) => (
                          <li key={army.id}>
                            {numberFormat(army.count)} {army.army_name}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <p>
                        <strong>Reward:</strong>
                        <br />
                        <strong>{rewardAmount}</strong>&nbsp;
                        {reward && (typeof reward === 'string' ? reward : `${reward.Enlist}`)}
                      </p>
                    </div>
                    <div className="w-64 flex-initial text-center">
                      {isAuthed && (
                        <button
                          className="px-3 py-1 border border-r-ivory bg-red  hover:bg-gray-dark"
                          onClick={() => handleBattleClick(l)}
                        >
                          Battle
                        </button>
                      )}
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
