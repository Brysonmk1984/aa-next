'use client';

import { getArmies } from '@/services';
import { Army } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const GuidePage = () => {
  const [armies, setArmies] = useState<Army[]>([]);

  useEffect(() => {
    (async () => {
      const armies = await getArmies();
      setArmies(armies);
    })();
  }, []);

  return (
    <>
      <h1>Game Mechanics</h1>
      <p>Armies of Avalore is an incremental strategy game set in a realm of medieval fantasy</p>

      <h2>Armies:</h2>
      <div className="text-center">
        <ul>
          {armies.map((army) => (
            <li key={army.id}>{army.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
