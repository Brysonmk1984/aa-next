'use client';

import { useKingdomContext } from '@/contexts';
import { getArmyImage } from '@/utils/army-image-map.util';
import Image from 'next/image';

export const KingdomPage = () => {
  const { nation, armies } = useKingdomContext();

  console.log(111111, nation, armies);
  return (
    <>
      <h1>Kingdom</h1>
      <h2>Standing Army</h2>
      <div className=" relative">
        <div className="h-[350px] relative ">
          {armies.map(({ army_name }) => {
            console.log(`/images/armies/${getArmyImage(army_name)}.webp`);

            return (
              <Image
                src={`/images/armies/${getArmyImage(army_name)}.webp`}
                alt={army_name}
                sizes="100vw"
                objectFit="contain"
                fill
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
