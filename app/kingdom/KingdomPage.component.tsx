'use client';

import { useKingdomContext } from '@/contexts';

export const KingdomPage = () => {
  const { nation, armies } = useKingdomContext();

  console.log(111111, nation, armies);
  return <h1>Kingdom</h1>;
};
