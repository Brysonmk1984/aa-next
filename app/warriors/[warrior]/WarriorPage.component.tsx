'use client';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useGameContext, useNationContext, useUserContext } from '@/contexts';
import { NationArmy } from '@/types';
import { assertHasNationDetails, assertHasUserDetails, lowercaseToTitleCase, snakeCaseToSentenceCase } from '@/utils';
import { mapWarriorNameToImageKey } from '@/utils/army-image-map.util';
import { fetchPassthrough } from '@/utils/fetch.util';
import { ComponentType, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArmyName } from '@/types/campaign.type';
import { numberFormat } from '@/utils/numberFormat';
import { Loader } from '@/components';

interface WarriorPage {
  armyName: ArmyName;
}

export const WarriorPage: ComponentType<WarriorPage> = ({ armyName }) => {
  const { user } = useUserContext();
  const { nation, campaign, dispatch } = useNationContext();
  const { armies } = useGameContext();
  const [units, setUnits] = useState(0);
  const [previewGoldLeft, setPreviewGoldLeft] = useState(nation?.gold || 0);
  const [isLoading, setIsLoading] = useState(false);

  const warrior = armies.find((a) => a.name === armyName);

  if (!warrior) {
    throw new Error('No matching warrior');
  }

  const determineMaxCanAfford = () => {
    const units = Math.floor(nation!.gold / warrior.cost);
    return units;
  };

  const handleCountInputChange = (value: string) => {
    setUnits(+value);
  };

  const handleBuyArmy = async (armyId: number, quantity: number) => {
    setIsLoading(true);
    assertHasUserDetails(user);
    assertHasNationDetails(nation);
    try {
      const path = `${API_ENDPOINT}/kingdom/${user.id}/nation/${nation.id}/army/${armyId}`;
      const [updatedArmy, remainingGold] = await fetchPassthrough<[NationArmy, number]>(path, {
        method: 'POST',
        body: JSON.stringify({
          quantity,
        }),
      });

      setUnits(0);
      dispatch({ type: 'nationArmiesUpdateAction', payload: updatedArmy });
      dispatch({ type: 'setNationGold', payload: remainingGold });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const attributeBlacklist = ['id', 'name', 'cost', 'lore', 'count'];
  const badInput = units <= 0 || units > determineMaxCanAfford();
  const isDisabled = campaign?.highestLevelCompleted
    ? warrior.unlock_level > campaign?.highestLevelCompleted
    : true && warrior.name !== ArmyName.MinuteMenMilitia;

  useEffect(() => {
    const determineGoldRemaining = (gold: number) => {
      const totalCost = units * warrior.cost;
      return gold - totalCost;
    };

    if (nation) {
      setPreviewGoldLeft(determineGoldRemaining(nation.gold));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return (
    <>
      <div className="flex justify-between items-start mb-8 ">
        <h1 className="block my-0">{warrior.name}</h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row ">
        <div className="text-center">
          <div className="relative w-[550px] h-[650px]">
            <Image
              src={`/images/armies/${mapWarriorNameToImageKey(warrior.name)}.webp`}
              alt={warrior.name}
              objectFit="cover"
              fill
            />
          </div>
          {user && nation && (
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                      disabled={units <= 0}
                      onClick={() => setUnits((u) => --u)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-20 h-10 m-0 text-2xl font-bold font-sans border-2 border-red bg-transparent text-center"
                      value={units}
                      min={0}
                      max={determineMaxCanAfford()}
                      onChange={(e) => handleCountInputChange(e.currentTarget.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-red h-10 hover:bg-off-black cursor-pointer"
                      disabled={units > determineMaxCanAfford()}
                      onClick={() => setUnits((u) => ++u)}
                    >
                      +
                    </button>
                  </div>

                  <div className="">
                    {units ? (
                      <strong className=" font-sans ">
                        {numberFormat(warrior.count * units)} {warrior.name}
                      </strong>
                    ) : (
                      <strong>&nbsp;</strong>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col text-right text-sm">
                    <strong className="text-3xl">{warrior.cost}</strong>

                    <span>Cost per </span>
                    <span className=" font-sans opacity-90">{warrior.count.toLocaleString()} warriors</span>
                    <strong></strong>
                  </div>
                </div>
              </div>
              {!isLoading ? (
                <div>
                  <button
                    className="btn btn-transparent mt-8"
                    onClick={() => handleBuyArmy(warrior.id, units)}
                    disabled={isDisabled || badInput}
                  >
                    Enlist
                  </button>
                  <div className="mt-4">
                    <strong className=" font-sans ">{numberFormat(previewGoldLeft)} Gold Remaining</strong>
                  </div>
                </div>
              ) : (
                <Loader />
              )}

              {isDisabled && (
                <div className="mt-3">
                  <span className="font-bold font-sans">Unlock level {warrior.unlock_level}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start">
          {Object.entries(warrior)
            .filter(([k]) => !attributeBlacklist.includes(k))
            .sort((a, b) => (a[0] < b[0] ? -1 : 1))
            .map(([k, v], i) => {
              return (
                <div key={i}>
                  <dl className="flex justify-between">
                    <dt className=" font-bold">{lowercaseToTitleCase(snakeCaseToSentenceCase(k))}:</dt>
                    <dt className=" max-w-[250px] text-lg">{lowercaseToTitleCase(v.toString())}</dt>
                  </dl>
                </div>
              );
            })}

          <p className="w-[450px] mt-12 text-lg">{warrior.lore}</p>
        </div>
      </div>
    </>
  );
};
