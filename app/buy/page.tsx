import { getAuth0Session } from '@/actions/getAuth0Session.action';
import TdBuyCell from '@/components/TdBuyCell';
import { getArmies } from '@/services/army';
import { getNationAndArmies } from '@/services/kingdom';
import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser, User } from '@/types';

export default async function Buy() {
  const { user, accessToken } = await getAuth0Session();
  console.log('asd', user, accessToken);

  const cake = (await handleUserUpdateCheck(user)) as { resolvedUser: ResolvedUser };
  console.log({ cake });

  const {
    resolvedUser: { id: userId },
  } = cake;

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
              {accessToken && <TdBuyCell army={army} nationId={nationId} accessToken={accessToken} />}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
