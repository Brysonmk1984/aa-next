'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { useNationContext, useUserContext } from '@/contexts';
import { useSessionStorage } from '@/hooks';
import { patchNation } from '@/services';
import { Nation } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  nationName: HTMLInputElement;
  lore: HTMLInputElement;
}
interface NationFoundingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const NationFoundingForm = () => {
  const { nation } = useNationContext();
  const { user } = useUserContext();
  const userId = user?.id;
  const nationId = nation?.id;

  const [hasUpdated, setHasUpdated] = useState(false);
  const { storeItem, value } = useSessionStorage<Pick<Nation, 'name' | 'lore'>>('aa-initial-nation-details');
  const searchParams = useSearchParams();
  const authenticated = searchParams.get('authenticated') === 'true' ? true : false;

  const handleSubmit = (e: FormEvent<NationFoundingFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.nationName.value);
    console.log(e.currentTarget.elements.lore.value);

    const payload: Pick<Nation, 'name' | 'lore'> = {
      name: e.currentTarget.elements.nationName.value,
      lore: e.currentTarget.elements.lore.value,
    };

    storeItem(payload);

    window.location.assign('/api/auth/login');
  };

  useEffect(() => {
    if (authenticated && value && userId && nationId) {
      (async () => {
        console.log('VALUE to update', value);

        if (value) {
          const result = await patchNation(userId, nationId, value);

          console.log('updatedNationResult', result);
        }
      })();
    }
  }, [authenticated, nationId, userId, value]);

  return hasUpdated ? (
    <>
      <strong>A Bold Name for a Nation!</strong>
      <button onClick={() => window.location.assign('/campaign')} className="btn btn-blue">
        Go to Campaign
      </button>
    </>
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
      <button type="submit" className="btn btn-blue">
        Establish
      </button>
    </form>
  );
};
