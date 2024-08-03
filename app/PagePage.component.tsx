'use client';
import Link from 'next/link';
import { PageTemplate } from './components/PageTemplate.component';
import { useUserContext } from './contexts';

export const PagePage = () => {
  const { user } = useUserContext();

  const handleBegin = () => {
    if (user) {
      window.location.assign('/campaign');
      return;
    }

    window.location.assign('/founding');
  };

  return (
    <>
      <h1>Armies of Avalore</h1>
      <h2>An incremental strategy game set in a realm of medieval fantasy</h2>

      <div className="px-8">
        <blockquote>
          “Most civilization is based on cowardice. It's so easy to civilize by teaching cowardice. You water down the
          standards which would lead to bravery. You restrain the will. You regulate the appetites. You fence in the
          horizons. You make a law for every movement. You deny the existence of chaos. You teach even the children to
          breathe slowly. You tame.”
        </blockquote>
        <em>Frank Herbert, GEoD</em>
      </div>
      <br />
      <p className="mt-8">
        You are a prodigy, a leader, a ruler perhaps? In some respect, you've found yourself at the helm of a nascient
        civilization fighting for survival and prosperity after the latest cataclysm to strike this plane of existence.
        Your civilization has coalesced into a nation state that's in direct conflict with similarly founded nation
        states. In this age, peace is impossible as the stars forbid. That leaves conflict and strife, even for those
        who wish it. How will you proceed?
      </p>
      <br />
      <div className="flex flex-col justify-center items-center">
        <div className=" text-lg">
          <Link href={'/how-to-play'}>Learn more</Link>
        </div>
        <strong className="block my-4">- or -</strong>
        <div className="flex justify-center">
          <button className="btn btn-transparent" onClick={handleBegin}>
            Begin
          </button>
        </div>
      </div>
    </>
  );
};
