import { PagePage } from './PagePage.component';
import { PageTemplate } from './components/PageTemplate.component';

export default async function Home() {
  return (
    <PageTemplate>
      <PagePage />
    </PageTemplate>
  );
}
