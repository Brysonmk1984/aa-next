import { PageTemplate } from '@/components/PageTemplate.component';

import { getArmies } from '@/services';
import { sentenceCaseToKebabCase } from '@/utils';
import { WarriorPage } from './WarriorPage.component';

type PageProps = {
  params: {
    warrior: string;
  };
};

export default async function Page({ params }: PageProps) {
  const armies = await getArmies();

  let matchingArmy = armies.find((army) => {
    if (sentenceCaseToKebabCase(army.name) === decodeURIComponent(params.warrior)) {
      return army.name;
    }
  });

  if (!matchingArmy) {
    throw new Error('No Matching Army');
  }

  return (
    <PageTemplate>
      <WarriorPage matchingArmy={matchingArmy} />
    </PageTemplate>
  );
}
