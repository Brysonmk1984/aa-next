import { PageTemplate } from '@/components/PageTemplate.component';
import { BalanceControlPanel } from './BalanceControlPanel.component';

export default async function Balance() {
  return (
    <PageTemplate>
      <h1>Balance</h1>
      <BalanceControlPanel />
    </PageTemplate>
  );
}
