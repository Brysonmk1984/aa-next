'use client';

import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';

interface TdBuyCellProps {
  army: Army;
  nationId: number;
}

export default function TdBuyCell({ army, nationId }: TdBuyCellProps) {
  async function handleBuyArmy() {
    const path = `${API_ENDPOINT}/kingdom/${nationId}/army/${army.id}`;

    const response = await fetch(path, { method: 'POST' });
    await response.json();
  }

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Buy</button>
    </td>
  );
}
