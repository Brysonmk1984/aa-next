import { PageTemplate } from '@/components/PageTemplate.component';
import { useKingdomContext } from '@/contexts';
import { KingdomPage } from './KingdomPage.component';

export default async function Kingdom() {
  return (
    <PageTemplate>
      <KingdomPage />
    </PageTemplate>
  );
}
