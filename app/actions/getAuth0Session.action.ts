'use server';
import { User } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';

export async function getAuth0Session() {
  const sessionResult = (await getSession()) as { user: User; accessToken: string | undefined };

  return sessionResult;
}
