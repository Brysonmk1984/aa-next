'use client';

import { useNationContext } from '@/contexts';
import { toKebabCase } from '@/utils';
import { getArmyImage } from '@/utils/army-image-map.util';
import Image from 'next/image';
import Link from 'next/link';

export const NationPage = () => {
  const { nation, armies } = useNationContext();
  console.log(armies);
  return (
    <>
      <div className="flex justify-between">
        {nation?.name ? (
          <div>
            <span className="font-sans text-2xl opacity-90"> Nation of</span>

            <h1 className=" mt-0"> {nation.name}</h1>
          </div>
        ) : (
          <h1>Nation</h1>
        )}

        <div>
          {nation?.gold && (
            <div className=" text-right">
              <span className=" font-sans text-4xl">{nation.gold}</span>
              <br />
              <span className="text-xl font-sans opacity-90">Gold</span>
            </div>
          )}
        </div>
      </div>

      {nation?.lore && (
        <p>
          <em>{nation.lore}</em>
        </p>
      )}
      <h2>Standing Army</h2>
      <div>
        <div className="flex flex-row justify-around flex-wrap">
          {armies.map((army) => {
            const { id, army_name, count } = army;

            return (
              <div key={id} className="w-[200px]">
                <div className="relative w-[200px] h-[325px]">
                  <Link href={`/warriors/${toKebabCase(army_name)}`}>
                    <Image
                      src={`/images/armies/${getArmyImage(army_name)}.webp`}
                      alt={army_name}
                      objectFit="cover"
                      fill
                    />
                  </Link>
                </div>
                <div className="text-center">
                  <h3 className=" text-2xl">
                    <Link className="no-underline" href={`/warriors/${toKebabCase(army_name)}`}>
                      {army_name}
                    </Link>
                  </h3>
                  <dl className="flex items-center justify-center ">
                    <dt className=" text-2xl px-1">x</dt>
                    <dd className=" text-3xl">{count}</dd>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link className="no-underline" href={`/enlist`}>
            <button className="btn btn-red">Enlist More</button>
          </Link>
        </div>
      </div>
    </>
  );
};
