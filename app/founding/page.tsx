import { PageTemplate } from '@/components/PageTemplate.component';
import { NationFoundingForm } from './NationFoundingForm.component';

export default async function Founding() {
  return (
    <PageTemplate>
      <h1 className="block">Your Nascent Empire Rises from the ashes of previous civilizations...</h1>
      <div className="w-2/3 mx-auto">
        <NationFoundingForm />
      </div>
    </PageTemplate>
  );
}
