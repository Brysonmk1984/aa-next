import { PageTemplate } from '@/components/PageTemplate.component';

import { assertsStringIsArmyName } from '@/utils';
import { WarriorPage } from './WarriorPage.component';
import { mapWarriorUriParamToName } from '@/utils/army-image-map.util';

type PageProps = {
  params: {
    warrior: string;
  };
};

export default async function Page({ params }: PageProps) {
  const warriorName = mapWarriorUriParamToName(decodeURIComponent(params.warrior));

  assertsStringIsArmyName(warriorName);

  return (
    <PageTemplate>
      <WarriorPage armyName={warriorName} />
    </PageTemplate>
  );
}
