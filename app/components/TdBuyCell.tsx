'use client';

import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';

interface TdBuyCellProps {
  army: Army;
  nationId: number;
  accessToken: string | undefined;
}

export default function TdBuyCell({ army, nationId, accessToken }: TdBuyCellProps) {
  async function handleBuyArmy() {
    const path = `${API_ENDPOINT}/kingdom/${nationId}/army/${army.id}`;

    // why would this fail?
    await fetchWrapper(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Hire</button>
    </td>
  );
}
