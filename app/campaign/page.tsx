import { CampaignLevelWithReward } from '@/types/campaign.type';
import { getSession, getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { LevelList } from './LevelList.component';
import { getCampaignLevels } from '@/actions/getCampaignLevels.action';
import { PageTemplate } from '@/components/PageTemplate.component';

export default async function Campaign() {
  const session = await getSession();

  let campaignLevelsWithRewards: Array<CampaignLevelWithReward>;
  let highestLevel: number = 1;
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
    throw error;
  }

  return (
    <PageTemplate>
      <h1>Campaign</h1>
      <LevelList
        levels={campaignLevelsWithRewards}
        highestLevel={highestLevel}
        session={JSON.parse(JSON.stringify(session))}
      />
    </PageTemplate>
  );
}
