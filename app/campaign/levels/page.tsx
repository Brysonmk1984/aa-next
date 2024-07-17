import { CampaignLevelWithReward } from '@/types/campaign.type';

import { getCampaignLevels } from '@/actions/getCampaignLevels.action';
import { PageTemplate } from '@/components/PageTemplate.component';
import { CampaignLevelsPage } from './CampaignLevelsPage.component';

export default async function LevelsPage() {
  let campaignLevelsWithRewards: Array<CampaignLevelWithReward>;
  try {
    const [campaignLevels, rewards] = await getCampaignLevels();

    campaignLevelsWithRewards = campaignLevels.map((campaignLevel) => {
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
      <CampaignLevelsPage levels={campaignLevelsWithRewards} />
    </PageTemplate>
  );
}
