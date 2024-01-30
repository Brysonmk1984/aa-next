import { getAuth0Session } from '@/actions/getAuth0Session.action';
import TdBuyCell from '@/components/TdBuyCell';
import { getArmies } from '@/services/army';
import { getNationAndArmies } from '@/services/kingdom';
import { handleUserUpdateCheck } from '@/services/user';
import { ResolvedUser } from '@/types';
import { useEffect } from 'react';

export default async function Army() {
  const session = await getAuth0Session();

  let armies;
  let nationAndArmies;
  if (session) {
    const { id: userId } = await handleUserUpdateCheck(session.user);

    armies = await getArmies();
    nationAndArmies = await getNationAndArmies(userId);
  }

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1>Armies for Hire</h1>

      {session && nationAndArmies && armies ? (
        <>
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
                  {session && <TdBuyCell army={army} nationId={nationAndArmies.id} accessToken={session.accessToken} />}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <em>Display the army cards here</em>
      )}
    </main>
  );
}
