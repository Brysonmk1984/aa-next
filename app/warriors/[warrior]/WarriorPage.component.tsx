'use client';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useNationContext, useUserContext } from '@/contexts';
import { Army, NationArmy } from '@/types';
import { assertHasNationDetails, assertHasUserDetails } from '@/utils';
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

  return (
    <>
      <h1 className="block">{matchingArmy.name}</h1>

      <div className="flex">
        <div className="text-center">
          <div className="relative w-[550px] h-[750px]">
            <Image
              src={`/images/armies/${getArmyImage(matchingArmy.name)}.webp`}
              alt={matchingArmy.name}
              objectFit="cover"
              fill
            />
          </div>
          {user && nation && (
            <button className="btn btn-red" onClick={() => handleBuyArmy(matchingArmy.id)}>
              Enlist x {matchingArmy.count}
            </button>
          )}
        </div>
        <div>
          <dl>
            {Object.entries(matchingArmy).map(([k, v], i) => {
              if (k !== 'lore') {
                return (
                  <div key={i} className="flex justify-between mb-1">
                    <dt className=" font-bold">{k}:</dt>
                    <dt className=" max-w-[250px] text-lg">{typeof v === 'boolean' ? JSON.stringify(v) : v}</dt>
                  </div>
                );
              }
            })}
          </dl>
          <p className="w-[450px] mt-12 text-lg">{matchingArmy.lore}</p>
        </div>
      </div>
    </>
  );
};
