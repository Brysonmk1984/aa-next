import { API_ENDPOINT } from '@/configs/environment.config';
import { ResolvedUser, User } from '@/types';

const findOrCreateUser = async ({ email, email_verified: emailVerified, sub }: User): Promise<ResolvedUser> => {
  const result = await fetch(`${API_ENDPOINT}/users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, email_verified: emailVerified, auth0_sub: sub }),
  });

  const resolvedUser = await result.json();

  if (!resolvedUser) {
    throw new Error("couldn't find or create a user");
  }
  return resolvedUser;
};

export async function handleUserUpdateCheck({ email, email_verified: emailVerified, sub }: User) {
  console.log('PAYLOAD:', { email, email_verified: emailVerified, sub });

  const user = await findOrCreateUser({ email, email_verified: emailVerified, sub });

  return user;
}
