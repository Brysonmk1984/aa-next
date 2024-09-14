'use client';

import { BALANCE_TESTING_PASSWORD, ENVIRONMENT } from '@/configs/environment.config';
import { useGameContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArmyListItem } from './ArmyListItem.component';
import { runTestBattle, RunTestBattleParams } from '@/services';
import { StartingDirection } from '@/types/battle.type';

type Inputs = Record<string, string>;

interface BalanceControlPanel {}

export const BalanceControlPanel: ComponentType<BalanceControlPanel> = () => {
  const { armies } = useGameContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const isProd = ENVIRONMENT === 'prod';
  const [disablePage, setDisablePage] = useState(isProd ? true : false);

  const handleChange = (direction: StartingDirection, armyId: number, operator: string) => {
    const existingValue = +getValues(`${direction}-${armyId}`);
    const newValue = operator === '+' ? existingValue + 100 : existingValue <= 0 ? 0 : existingValue - 100;
    setValue(`${direction}-${armyId}`, newValue.toString());
  };

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();

    const payload = Object.entries(data).reduce<RunTestBattleParams>(
      (acc, [k, count]) => {
        if (!+count) {
          return acc;
        }
        const [direction, id] = k.split('-').map((piece, i) => (i === 0 ? piece.toLowerCase() : +piece)) as [
          Lowercase<StartingDirection>,
          number,
        ];

        const { name } = armies.find((army) => id === army.id)!;
        acc[direction].push({ id, name, count: +count });

        return acc;
      },
      { east: [], west: [] },
    );

    runTestBattle(payload);
  };

  useEffect(() => {
    if (isProd) {
      const result = prompt('Enter Password');

      if (result !== BALANCE_TESTING_PASSWORD) {
        return router.push('/');
      }
      setDisablePage(false);
    }
  }, [isProd, router]);

  return (
    <div>
      {isProd && disablePage && <div className="bg-[#000] w-full h-full absolute top-0 left-0 z-100 opacity-60"></div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3 border-b-2 pb-8">
          <div className="border-r-2 pr-4">
            <h2 className="text-center border-b-2">East</h2>
            <div>
              {armies.map((army) => (
                <ArmyListItem className="flex-row justify-end mb-2" key={army.id} army={army}>
                  <button
                    type="button"
                    className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                    onClick={(e) => {
                      handleChange(StartingDirection.EAST, army.id, '-');
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-20 h-10 m-0 border-2 border-red text-right"
                    defaultValue={0}
                    {...register(`${StartingDirection.EAST}-${army.id}`)}
                  />
                  <button
                    type="button"
                    className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                    onClick={(e) => {
                      handleChange(StartingDirection.EAST, army.id, '+');
                    }}
                  >
                    +
                  </button>
                </ArmyListItem>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-center border-b-2">West</h2>
            <div>
              {armies.map((army) => (
                <ArmyListItem className="flex-row-reverse justify-end mb-2" key={army.id} army={army}>
                  <button
                    type="button"
                    className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                    onClick={(e) => {
                      handleChange(StartingDirection.WEST, army.id, '+');
                    }}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    className="w-20 h-10 m-0 border-2 border-red text-right"
                    defaultValue={0}
                    {...register(`${StartingDirection.WEST}-${army.id}`)}
                  />
                  <button
                    type="button"
                    className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                    onClick={(e) => {
                      handleChange(StartingDirection.WEST, army.id, '-');
                    }}
                  >
                    -
                  </button>
                </ArmyListItem>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button type="submit" className="btn btn-transparent ">
            Run
          </button>
        </div>
      </form>
    </div>
  );
};
