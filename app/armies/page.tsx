import { getAuth0Session } from '@/actions/getAuth0Session.action';
import TdBuyCell from '@/components/TdBuyCell';
import { getArmies } from '@/services/army';
import { getNationAndArmies } from '@/services/kingdom';
import { handleUserUpdateCheck } from '@/services/user';
import { Nation, ResolvedUser } from '@/types';
import { Army } from '@/types';

export default async function Army() {
  const session = await getAuth0Session();

  let armies: Array<Army>;
  let nationAndArmies: Nation;

  if (session) {
    const { id: userId } = await handleUserUpdateCheck(session.user);

    armies = await getArmies();
    nationAndArmies = await getNationAndArmies(userId);
  }

  if (!(session && nationAndArmies && armies)) {
    return <em>Display the army cards here</em>;
  }

  return (
    <main className="flex  min-h-[800px]  flex-col items-center justify-between p-24">
      <section className="page-content w-full  mx-auto ">
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
                {session && <TdBuyCell army={army} nationId={nationAndArmies.id} accessToken={session.accessToken} />}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
