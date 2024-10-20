import { API_ENDPOINT } from '@/configs/environment.config';
import { ResolvedUser, User } from '@/types';
import { initializeNation } from './kingdom.service';
import { fetchWrapper } from '@/utils/fetch.util';

const findOrCreateUser = async ({ email, email_verified: emailVerified, sub }: User) => {
  try {
    const result = await fetchWrapper<[ResolvedUser, boolean]>(`${API_ENDPOINT}/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, email_verified: emailVerified, auth0_sub: sub }),
    });

    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export async function handleUserUpdateCheck({ email, email_verified: emailVerified, sub }: User) {
  const [user, isExistingUser] = await findOrCreateUser({ email, email_verified: emailVerified, sub });

  if (!isExistingUser) {
    // New users also need nation created
    await initializeNation(user.id);
  }

  return user;
}
