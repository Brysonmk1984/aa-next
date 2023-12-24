import { API_ENDPOINT } from '@/configs/environment.config';
import { ResolvedUser, User } from '@/types';

const findOrCreateUser = async ({
  email,
  email_verified: emailVerified,
  sub,
}: User): Promise<ResolvedUser | undefined> => {
  const result = await fetch(`${API_ENDPOINT}/users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, email_verified: emailVerified, auth0_sub: sub }),
  });

  try {
    return await result.json();
  } catch (e) {
    console.error(e);
  }
};
export async function handleUserUpdateCheck({ email, email_verified: emailVerified, sub }: User) {
  try {
    let resolvedUser = await findOrCreateUser({ email, email_verified: emailVerified, sub });

    return {
      resolvedUser,
    };
  } catch (e) {
    console.error(e);
  }
}
