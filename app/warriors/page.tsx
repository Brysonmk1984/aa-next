import { PageTemplate } from '@/components/PageTemplate.component';
import { WarriorsPage } from './WarriorsPage';

export default async function Warriors() {
  return (
    <PageTemplate>
      <h1>Warriors of The Great Realm:</h1>
      <WarriorsPage />
    </PageTemplate>
  );
}
