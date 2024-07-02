import { PageTemplate } from '@/components/PageTemplate.component';
import { CampaignDescription } from './CampaignDescription.component';

export default async function CampaignPage() {
  return (
    <PageTemplate>
      <h1>Campaign</h1>
      <CampaignDescription />
    </PageTemplate>
  );
}
