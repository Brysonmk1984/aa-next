import { getAuth0Session } from '@/actions/getAuth0Session.action';
import { PageTemplate } from '@/components/PageTemplate.component';
import TdBuyCell from '@/components/TdBuyCell';
import { getArmies, getNationAndArmies, handleUserUpdateCheck } from '@/services';

import { Nation, ResolvedUser, Army as ArmyType, NationArmy } from '@/types';

export default async function Enlist() {
  const armies = await getArmies();

  return (
    <PageTemplate>
      <h1>Armies</h1>
      <table className="army-list">
        <thead>
          <tr>
            <th>Count</th>
            <th>Army</th>
            <th>Gold</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {armies.map((army) => (
            <tr key={army.id}>
              <td className="army-count">{army.count}</td>
              <td className="army-name">{army.name}</td>
              <td className="army-cost">ㆆ&nbsp;20,000</td>
              <TdBuyCell armyId={army.id} />
            </tr>
          ))}
        </tbody>
      </table>
    </PageTemplate>
  );
}
