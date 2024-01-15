'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';

interface TdBuyCellProps {
  army: Army;
  nationId: number;
  accessToken: string | undefined;
}

export default function TdBuyCell({ army, nationId, accessToken }: TdBuyCellProps) {
  async function handleBuyArmy() {
    const path = `${API_ENDPOINT}/kingdom/${nationId}/army/${army.id}`;

    await fetchWithAuth(path);
  }

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Buy</button>
    </td>
  );
}
