'use server';

import { User } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';
import { getSession } from '@auth0/nextjs-auth0';

export async function fetchWithAuth(route: string, options: RequestInit = {}) {
  console.log('AM I HERE?');

  const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };
  console.log({ accessToken });

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  const result = await fetchWrapper(route, options);
  return result;
}
