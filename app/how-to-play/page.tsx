import { PageTemplate } from '@/components/PageTemplate.component';
import { GuidePage } from './AboutPage.component';

export default async function Splash() {
  return (
    <PageTemplate>
      <GuidePage />
    </PageTemplate>
  );
}
