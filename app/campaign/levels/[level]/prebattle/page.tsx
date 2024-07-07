import { PageTemplate } from '@/components/PageTemplate.component';
import { getCampaignLevelDetails } from '@/services';
import { CampaignNationProfile } from '@/types';
import { PreBattlePage } from './PreBattlePage.component';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { level: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PreBattle({ params }: PageProps) {
  let opponent: CampaignNationProfile;
  console.log(params.level);

  try {
    opponent = await getCampaignLevelDetails(params.level);
  } catch (e) {
    console.log('Error', e);
    redirect('/campaign/levels');
    return;
  }
  return (
    <PageTemplate>
      <PreBattlePage enemyDetails={opponent} level={params.level} />
    </PageTemplate>
  );
}
