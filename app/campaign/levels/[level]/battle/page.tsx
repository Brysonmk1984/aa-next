import { PageTemplate } from '@/components/PageTemplate.component';
import { BattlePage } from './BattlePage.component';
import { CampaignNationProfile } from '@/types';
import { getCampaignLevelDetails } from '@/services';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { level: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Battle({ params }: PageProps) {
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
      <BattlePage level={params.level} enemyDetails={opponent} />
    </PageTemplate>
  );
}
