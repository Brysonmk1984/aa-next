'use server';

import { User } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';
import { getSession } from '@auth0/nextjs-auth0';

export async function fetchWithAuth<T = any>(route: string, options: RequestInit = {}): Promise<T> {
  //console.log('FETCHING WITH AUTH');

  const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };
  //console.log({ accessToken });

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }
  console.log({ route, options });

  const result = await fetchWrapper<T>(route, options);
  return result;
}
