'use client';

import { useSessionStorage } from '@/hooks';
import { FormEvent } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  nationName: HTMLInputElement;
  lore: HTMLInputElement;
}
interface NationFoundingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const NationFoundingForm = () => {
  const { storeItem } = useSessionStorage('aa-initial-nation-details');

  const handleSubmit = (e: FormEvent<NationFoundingFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.nationName.value);
    console.log(e.currentTarget.elements.lore.value);

    const payload = {
      nationName: e.currentTarget.elements.nationName.value,
      lore: e.currentTarget.elements.lore.value,
    };

    storeItem(payload);

    window.location.assign('/api/auth/login');
  };

  return (
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
