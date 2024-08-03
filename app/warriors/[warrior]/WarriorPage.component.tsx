'use client';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useNationContext, useUserContext } from '@/contexts';
import { Army, NationArmy } from '@/types';
import { assertHasNationDetails, assertHasUserDetails, lowercaseToTitleCase, snakeCaseToSentenceCase } from '@/utils';
import { getArmyImage } from '@/utils/army-image-map.util';
import { fetchPassthrough } from '@/utils/fetch.util';
import { ComponentType } from 'react';
import Image from 'next/image';

interface WarriorPage {
  matchingArmy: Army;
}

export const WarriorPage: ComponentType<WarriorPage> = ({ matchingArmy }) => {
  const { user } = useUserContext();
  const { nation, dispatch } = useNationContext();

  const handleBuyArmy = async (armyId: number) => {
    assertHasUserDetails(user);
    assertHasNationDetails(nation);
    try {
      const path = `${API_ENDPOINT}/kingdom/${user.id}/nation/${nation.id}/army/${armyId}`;
      const updatedArmy = await fetchPassthrough<NationArmy>(path, {
        method: 'POST',
      });
      dispatch({ type: 'nationArmiesUpdateAction', payload: updatedArmy });
    } catch (e) {
      console.error(e);
    }
  };

  const attributeBlacklist = ['id', 'name', 'cost', 'lore', 'count'];

  return (
    <>
      <div className="flex justify-between items-start mb-8 ">
        <h1 className="block my-0">{matchingArmy.name}</h1>
        <div className="flex gap-4">
          <div className=" text-right">
            <span className="text-xl font-sans opacity-90">Cost</span>
            <br />
            <span className=" font-sans text-4xl">{matchingArmy.cost}</span>
          </div>
          /
          <div className=" text-right">
            <span className="text-xl font-sans opacity-90">Count</span>
            <br />
            <span className=" font-sans text-4xl">{matchingArmy.count}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center">
        <div className="text-center">
          <div className="relative w-[550px] h-[650px]">
            <Image
              src={`/images/armies/${getArmyImage(matchingArmy.name)}.webp`}
              alt={matchingArmy.name}
              objectFit="cover"
              fill
            />
          </div>
          {user && nation && (
            <button className="btn btn-red mt-8" onClick={() => handleBuyArmy(matchingArmy.id)}>
              Enlist x {matchingArmy.count}
            </button>
          )}
        </div>
        <div>
          <dl>
            {Object.entries(matchingArmy)
              .filter(([k]) => !attributeBlacklist.includes(k))
              .sort((a, b) => (a[0] < b[0] ? -1 : 1))
              .map(([k, v], i) => {
                return (
                  <div key={i} className="flex justify-between mb-1">
                    <dt className=" font-bold">{lowercaseToTitleCase(snakeCaseToSentenceCase(k))}:</dt>
                    <dt className=" max-w-[250px] text-lg">{lowercaseToTitleCase(v.toString())}</dt>
                  </div>
                );
              })}
          </dl>
          <p className="w-[450px] mt-12 text-lg">{matchingArmy.lore}</p>
        </div>
      </div>
    </>
  );
};
