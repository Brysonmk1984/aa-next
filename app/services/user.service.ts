import { API_ENDPOINT, AUTH_AUD, CLEAR_BATTLE_ON_POSTBATTLE, ENVIRONMENT } from '@/configs/environment.config';
import { ResolvedUser, User } from '@/types';
import { initializeNation } from './kingdom.service';

const findOrCreateUser = async ({ email, email_verified: emailVerified, sub }: User) => {
  try {
    const result = await fetch(`${API_ENDPOINT}/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, email_verified: emailVerified, auth0_sub: sub }),
    });

    const userInfo: Promise<[ResolvedUser, boolean]> = await result.json();

    if (!userInfo) {
      throw new Error("couldn't find or create a user");
    }
    return userInfo;
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
