import { PageTemplate } from '@/components/PageTemplate.component';
import { ComponentType } from 'react';
import { AuthPage } from './Auth.Page';

export default async function Auth() {
  return (
    <PageTemplate>
      <AuthPage />
    </PageTemplate>
  );
}
