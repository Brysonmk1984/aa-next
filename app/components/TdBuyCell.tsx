'use client';

import { API_ENDPOINT } from '@/configs/environment.config';
import { useNation } from '@/hooks/nation.hook';
import { useUser } from '@/hooks/user.hook';
import { NationArmy } from '@/types';
import { fetchPassthrough } from '@/utils/fetch.util';

interface TdBuyCellProps {
  armyId: number;
}

export default function TdBuyCell({ armyId }: TdBuyCellProps) {
  const { nation, dispatch } = useNation();
  const { user } = useUser();

  const handleBuyArmy = async () => {
    try {
      const path = `${API_ENDPOINT}/kingdom/${user.id}/nation/${nation.id}/army/${armyId}`;
      const updatedArmy = await fetchPassthrough<NationArmy>(path, {
        method: 'POST',
      });
      dispatch({ type: 'nationArmiesUpdateAction', payload: updatedArmy });
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
