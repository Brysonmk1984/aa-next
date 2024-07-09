'use client';

import { useSessionStorage } from '@/hooks';
import { BattleDetails } from '@/types/battle.type';
import { ComponentType } from 'react';

interface PostBattlePage {}

export const PostBattlePage: ComponentType<PostBattlePage> = () => {
  const { value: battleData } = useSessionStorage<BattleDetails>('aa-latest-battle-results');

  console.log(battleData);
  return (
    <>
      <h1 className="block">Aftermath</h1>
    </>
  );
};
