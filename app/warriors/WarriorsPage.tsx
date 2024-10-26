'use client';

import { useGameContext, useNationContext } from '@/contexts';
import { sentenceCaseToKebabCase } from '@/utils';
import { mapWarriorNameToImageKey } from '@/utils/army-image-map.util';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';
import classNames from 'classnames';

interface WarriorsPageProps {}

export const WarriorsPage: ComponentType<WarriorsPageProps> = () => {
  const { campaign, nation } = useNationContext();
  const { armies } = useGameContext();

  return (
    <div className="flex flex-wrap items-center justify-around">
      {armies
        .sort((a, b) => (a.unlock_level < b.unlock_level ? -1 : 1))
        .map((armies) => {
          const { id, name, unlock_level } = armies;

          const isDisabled = !!nation && unlock_level > campaign.highestLevelCompleted;
          return (
            <div key={id} className={classNames('w-[300px]', { 'opacity-60': isDisabled })}>
              <div className="relative w-[300px] h-[350px]">
                <Link href={`/warriors/${encodeURIComponent(sentenceCaseToKebabCase(name))}`}>
                  <Image
                    src={`/images/armies/${mapWarriorNameToImageKey(name)}.webp`}
                    alt={name}
                    objectFit="cover"
                    fill
                  />
                </Link>
              </div>
              <div className="text-center">
                <h3
                  className={classNames('text-2xl', {
                    'text-off-black': isDisabled,
                  })}
                >
                  {name}
                </h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};
