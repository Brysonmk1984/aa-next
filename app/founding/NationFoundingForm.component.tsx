'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { useNationContext, useUserContext } from '@/contexts';
import { useSessionStorage } from '@/hooks';
import { patchNation } from '@/services';
import { Nation } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  nationName: HTMLInputElement;
  lore: HTMLInputElement;
}
interface NationFoundingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const NationFoundingForm = () => {
  const { nation, dispatch } = useNationContext();
  const { user, isAuthenticated } = useUserContext();
  const userId = user?.id;
  const nationId = nation?.id;

  const [hasUpdated, setHasUpdated] = useState(false);
  const { storeItem, removeItem, value } =
    useSessionStorage<Pick<Nation, 'name' | 'lore'>>('aa-initial-nation-details');
  const searchParams = useSearchParams();

  const authenticatedQueryParam = searchParams.get('authenticated') === 'true' ? true : false;

  const handleSubmit = async (e: FormEvent<NationFoundingFormElement>) => {
    console.log('submitting');

    e.preventDefault();
    const payload: Pick<Nation, 'name' | 'lore'> = {
      name: e.currentTarget.elements.nationName.value,
      lore: e.currentTarget.elements.lore.value,
    };

    // User is logged in already but doesn't have a nation name yet. Do update with submitted values
    if (isAuthenticated && userId && nationId) {
      await handlePatchNation(userId, nationId, payload);
      window.location.assign('/campaign');
      return;
    }

    // User is not logged in, store items in session storage, then log in. They'll be returned to this page and patchNation will be called from useEffect
    storeItem(payload);
    window.location.assign('/api/auth/login');
  };

  const handlePatchNation = useCallback(
    async (userId: number, nationId: number, payload: Pick<Nation, 'name' | 'lore'>) => {
      await patchNation(userId, nationId, payload);
      removeItem();
      console.log('SETTING HAS UPDATED');
      dispatch({ type: 'updateNation', payload });
      setHasUpdated(true);
    },
    [removeItem, dispatch],
  );

  useEffect(() => {
    console.log(authenticatedQueryParam, value, userId, nationId);

    if (authenticatedQueryParam && value && userId && nationId) {
      handlePatchNation(userId, nationId, value);
    }
  }, [authenticatedQueryParam, handlePatchNation, nationId, removeItem, userId, value]);

  console.log(searchParams.get('authenticated'), hasUpdated);

  if (!!nation?.name && !authenticatedQueryParam) {
    return (
      <div className="flex flex-col items-center">
        <h2 className=" text-4xl">{nation.name}</h2>
        <p>{nation.lore}</p>
      </div>
    );
  }

  return hasUpdated && authenticatedQueryParam ? (
    <div className="flex flex-col items-center">
      <h2 className=" text-4xl">
        {' '}
        <em>{nation?.name}...</em> A Bold Name for a Nation!
      </h2>
      <button onClick={() => window.location.assign('/campaign')} className="btn btn-red mt-10">
        Go to Campaign
      </button>
    </div>
  ) : (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <label className="mb-8  w-full">
        What shall your Nation be called?
        <input type="text" name="nationName" placeholder="Nation Name" className="block" required />
      </label>
      <label className="mb-8  w-full">
        Tell a tale of your nations history
        <textarea
          name="lore"
          className="block"
          placeholder="Ye find thy town on the backs of beasts and bloodshed..."
        ></textarea>
      </label>
      <button type="submit" className="btn btn-red">
        Establish
      </button>
    </form>
  );
};
