import { PageTemplate } from '@/components/PageTemplate.component';
import { PostBattlePage } from './PostBattlePage.component';
import { CampaignNationProfile } from '@/types';
import { getCampaignLevelDetails } from '@/services';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { level: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostBattle({ params }: PageProps) {
  let opponent: CampaignNationProfile;

  try {
    opponent = await getCampaignLevelDetails(params.level);
  } catch (e) {
    return redirect('/campaign/levels');
  }
  return (
    <PageTemplate>
      <PostBattlePage enemyDetails={opponent} />
    </PageTemplate>
  );
}
