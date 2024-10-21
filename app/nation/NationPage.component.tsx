'use client';

import { UpkeepKeys, UpkeepValues } from '@/constants/upkeep';
import { useGameContext } from '@/contexts/game/Game.context';
import { useNation } from '@/hooks/nation.hook';
import { determineAmountPerHour, sentenceCaseToKebabCase } from '@/utils';
import { mapWarriorNameToImageKey } from '@/utils/army-image-map.util';
import Image from 'next/image';
import Link from 'next/link';

export const NationPage = () => {
  const { nation, armies } = useNation();
  const {
    income: { income_calc_minutes, upkeep_calc_minutes },
  } = useGameContext();
  const { amountPerHour: incomePerHour } = determineAmountPerHour(nation.income, income_calc_minutes);
  const { amountPerHour: upkeepPerHour } = determineAmountPerHour(UpkeepValues[nation.upkeep], upkeep_calc_minutes);

  return (
    <>
      <div className="flex justify-between">
        {nation.name ? (
          <div>
            <span className="font-sans text-2xl opacity-90"> Nation of</span>

            <h1 className=" mt-0"> {nation.name}</h1>
          </div>
        ) : (
          <h1>Nation</h1>
        )}

        <div>
          {!!nation.gold && (
            <div className=" text-right">
              <span className="text-xl font-sans opacity-90">Gold</span>
              <br />
              <span className=" font-sans text-4xl text-red">{nation.gold.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {nation.lore && (
        <p>
          <em>{nation.lore}</em>
        </p>
      )}
      <div className="flex justify-between">
        <h2>Standing Army</h2>
        <div className="flex items-end">
          {
            <div className="flex flex-col text-right">
              <span className="text-lg font-sans opacity-90 block">Income</span>
              <span className="block text-sm">
                <strong className="text-lg text-red">{incomePerHour.toLocaleString()}</strong> <span>Gold/hr</span>
              </span>
            </div>
          }

          <div className="flex flex-col text-right ml-8 ">
            {nation.upkeep !== UpkeepKeys.None && (
              <span className="text-2xl font-sans opacity-90 block text-red">{nation.upkeep}</span>
            )}
            <span className="text-lg font-sans opacity-90 block">
              {nation.upkeep == UpkeepKeys.None ? 'No Upkeep' : 'Upkeep'}
            </span>
            <span className="block text-sm">
              <strong className="text-lg text-red">{upkeepPerHour.toLocaleString()}</strong> Gold/hr
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-around flex-wrap">
          {armies.map((army) => {
            const { id, army_name, count } = army;

            return (
              <div key={id} className="w-[200px]">
                <div className="relative w-[200px] h-[325px]">
                  <Link href={`/warriors/${sentenceCaseToKebabCase(army_name)}`}>
                    <Image
                      src={`/images/armies/${mapWarriorNameToImageKey(army_name)}.webp`}
                      alt={army_name}
                      objectFit="cover"
                      fill
                    />
                  </Link>
                </div>
                <div className="text-center">
                  <strong className="text-3xl">{count.toLocaleString()}</strong>
                  <h3 className="text-2xl mt-2">
                    <Link className="no-underline" href={`/warriors/${sentenceCaseToKebabCase(army_name)}`}>
                      {army_name}
                    </Link>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link className="btn-style" href={`/warriors`}>
            Enlist
          </Link>
        </div>
      </div>
    </>
  );
};
