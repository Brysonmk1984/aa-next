import { CampaignLevelWithReward } from '@/types/campaign.type';

import { getCampaignLevels } from '@/actions/getCampaignLevels.action';
import { PageTemplate } from '@/components/PageTemplate.component';
import { LevelList } from './LevelList.component';

export default async function LevelsPage() {
  let campaignLevelsWithRewards: Array<CampaignLevelWithReward>;
  try {
    const [campaignLevels, rewards] = await getCampaignLevels();

    campaignLevelsWithRewards = campaignLevels.map((campaignLevel) => {
      let l = campaignLevel.level;
      return {
        reward: rewards[campaignLevel.level] ?? [null, null],
        ...campaignLevel,
      };
    });
  } catch (error) {
    console.error('THE ERROR on campaign level page', error);

    throw error;
  }

  return (
    <PageTemplate>
      <h1>Levels</h1>
      <LevelList levels={campaignLevelsWithRewards} />
    </PageTemplate>
  );
}
