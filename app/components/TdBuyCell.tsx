'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useNation } from '@/hooks';
import { Nation } from '@/types';

interface TdBuyCellProps {
  armyId: number;
}

export default function TdBuyCell({ armyId }: TdBuyCellProps) {
  const { nation } = useNation();

  const handleBuyArmy = async (nation: Nation) => {
    const path = `${API_ENDPOINT}/kingdom/${nation.id}/army/${armyId}`;

    await fetchWithAuth(path, {
      method: 'POST',
    });
  };

  return (
    <td className="buy-cell">
      <button onClick={() => handleBuyArmy(nation)}>Hire</button>
    </td>
  );
}
