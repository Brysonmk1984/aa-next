'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useNationContext } from '@/contexts';
import { Army } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';

interface TdBuyCellProps {
  armyId: number;
}

export default function TdBuyCell({ armyId }: TdBuyCellProps) {
  const { nation } = useNationContext();

  async function handleBuyArmy() {
    const path = `${API_ENDPOINT}/kingdom/${nation.id}/army/${armyId}`;

    await fetchWithAuth(path, {
      method: 'POST',
    });
  }

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Hire</button>
    </td>
  );
}
