import TdBuyCell from '@/components/TdBuyCell';
import { getArmies } from '@/services/army';
import { getNationAndArmies } from '@/services/kingdom';
import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser, User } from '@/types';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default async function Buy() {
  const { user } = (await getSession()) as { user: User };

  const {
    resolvedUser: { id: userId },
  } = (await handleUserUpdateCheck(user)) as { resolvedUser: ResolvedUser };

  const armies = await getArmies();
  const { id: nationId } = await getNationAndArmies(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Buy Page</div>

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
              <td className="army-name">{army.army_name}</td>
              <td className="army-cost">ㆆ&nbsp;20,000</td>
              <TdBuyCell army={army} nationId={nationId} />
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
