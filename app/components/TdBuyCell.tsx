'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';
import { fetchWithAuthClientSide } from '@/utils/fetchWithAuthClientSide.util';

interface TdBuyCellProps {
  army: Army;
  nationId: number;
  accessToken: string | undefined;
}

export default function TdBuyCell({ army, nationId, accessToken }: TdBuyCellProps) {
  async function handleBuyArmy() {
    const path = `${API_ENDPOINT}/kingdom/${nationId}/army/${army.id}`;
    //console.log('the route on client', { path }, accessToken);
    //const fetchWithAuthPassingPath = fetchWithAuth.bind(null, path);
    // why would this fail?
    await fetchWithAuthClientSide(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Buy</button>
    </td>
  );
}
