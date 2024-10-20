'use server';

import { User } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';
import { getSession } from '@auth0/nextjs-auth0';

export async function fetchWithAuth<T>(route: string, options: RequestInit = {}): Promise<T> {
  const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  const result = await fetchWrapper<T>(route, options);
  return result;
}
