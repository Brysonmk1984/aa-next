import { PageTemplate } from '@/components/PageTemplate.component';

import { assertsStringIsArmyName, kebabCaseToTitleCase, sentenceCaseToKebabCase } from '@/utils';
import { WarriorPage } from './WarriorPage.component';
import { ArmyName } from '@/types/campaign.type';

type PageProps = {
  params: {
    warrior: string;
  };
};

export default async function Page({ params }: PageProps) {
  const armyName = kebabCaseToTitleCase(decodeURIComponent(params.warrior));

  assertsStringIsArmyName(armyName);
  return (
    <PageTemplate>
      <WarriorPage armyName={armyName} />
    </PageTemplate>
  );
}
