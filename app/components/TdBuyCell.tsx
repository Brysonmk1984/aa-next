'use client';

import { fetchWithAuth } from '@/actions/fetchWithAuth.action';
import { API_ENDPOINT } from '@/configs/environment.config';
import { useNation } from '@/hooks/nation.hook';
import { useUser } from '@/hooks/user.hook';

interface TdBuyCellProps {
  armyId: number;
}

export default function TdBuyCell({ armyId }: TdBuyCellProps) {
  const { nation } = useNation();
  const { user } = useUser();

  const handleBuyArmy = async () => {
    try {
      const path = `${API_ENDPOINT}/kingdom/${user.id}/nation/${nation.id}/army/${armyId}`;
      await fetchWithAuth(path, {
        method: 'POST',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <td className="buy-cell">
      <button onClick={handleBuyArmy}>Hire</button>
    </td>
  );
}
