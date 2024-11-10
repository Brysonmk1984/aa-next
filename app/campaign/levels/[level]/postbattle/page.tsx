import { PageTemplate } from '@/components/PageTemplate.component';
import { PostBattlePage } from './PostBattlePage.component';
import { CampaignNationProfile } from '@/types';
import { getCampaignLevelDetails } from '@/services';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ level: number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostBattle(props: PageProps) {
  const params = await props.params;
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
