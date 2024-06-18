import { PagePage } from './PagePage.component';
import { PageTemplate } from './components/PageTemplate.component';
import { useUserContext } from './contexts';

export default async function Home() {
  return (
    <PageTemplate>
      <PagePage />
    </PageTemplate>
  );
}
