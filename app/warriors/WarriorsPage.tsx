'use client';

import { useGameContext } from '@/contexts';
import { sentenceCaseToKebabCase } from '@/utils';
import { mapWarriorNameToImageKey } from '@/utils/army-image-map.util';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

interface WarriorsPageProps {}

export const WarriorsPage: ComponentType<WarriorsPageProps> = () => {
  const { armies } = useGameContext();

  return (
    <div className="flex flex-wrap items-center justify-around">
      {armies
        .sort((a, b) => (a.unlock_level < b.unlock_level ? -1 : 1))
        .map((armies) => {
          const { id, name } = armies;

          return (
            <div key={id} className="w-[300px]">
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
                <h3 className=" text-2xl">{name}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};
