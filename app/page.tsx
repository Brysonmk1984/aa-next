import { PagePage } from './PagePage.compenent';
import { PageTemplate } from './components/PageTemplate.component';
import { useUserContext } from './contexts';

export default async function Home() {
  return (
    <PageTemplate>
      <PagePage />
    </PageTemplate>
  );
}
