import { PageTemplate } from '@/components/PageTemplate.component';
import { getCampaignLevelDetails } from '@/services';
import { CampaignNationProfile } from '@/types';
import { PreBattlePage } from './PreBattlePage.component';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PreBattle(props: PageProps) {
  const params = await props.params;
  let opponent: CampaignNationProfile;
  const level = +params.level;

  try {
    const opponentResult = await getCampaignLevelDetails(level);
    opponent = opponentResult;
  } catch (e) {
    return redirect('/campaign/levels');
  }

  return (
    <PageTemplate>
      <PreBattlePage enemyDetails={opponent} level={level} />
    </PageTemplate>
  );
}
