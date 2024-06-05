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
      {nation.name && <h2>{nation.name}</h2>}
      <span>gold:</span>
      <span>{nation.gold}</span>
      {nation.lore && <p>{nation.lore}</p>}
      <h2>Standing Army</h2>
      <div className=" relative">
        <div className="h-[350px] relative ">
          {armies.map((armies) => {
            const { id, army_name, count } = armies;
            console.log(armies);

            return (
              <div key={id} className="w-[300px]">
                <div className="relative aspect-square ">
                  <Image src={`/images/armies/${getArmyImage(army_name)}.webp`} alt={army_name} sizes="100vw" fill />
                </div>
                <div className="text-center">
                  <h3 className=" text-2xl">Minute Men Militia</h3>
                  <dl className="flex items-center justify-center ">
                    <dt className=" text-2xl px-1">x</dt>
                    <dd className=" text-3xl">{count}</dd>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
