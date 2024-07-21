import { PageTemplate } from '@/components/PageTemplate.component';
import { getCampaignLevelDetails } from '@/services';
import { CampaignNationProfile } from '@/types';
import { PreBattlePage } from './PreBattlePage.component';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { level: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PreBattle({ params }: PageProps) {
  let opponent: CampaignNationProfile;
  const level = +params.level;
  try {
    opponent = await getCampaignLevelDetails(level);
  } catch (e) {
    console.log('Error', e);
    redirect('/campaign/levels');
    return;
  }
  return (
    <PageTemplate>
      <PreBattlePage enemyDetails={opponent} level={level} />
    </PageTemplate>
  );
}
