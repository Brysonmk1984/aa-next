'use server';

import { auth0 } from '../../lib/auth0';
import { User } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';

export async function fetchWithAuth<T>(route: string, options: RequestInit = {}): Promise<T> {
  const { accessToken } = (await auth0.getSession()) as { user: User; accessToken?: string | undefined };

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  const result = await fetchWrapper<T>(route, options);
  return result;
}
