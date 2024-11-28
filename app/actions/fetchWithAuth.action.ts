'use server';

import { auth0 } from '../../lib/auth0';
import { ContextualError } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';

export async function fetchWithAuth<T>(route: string, options: RequestInit = {}): Promise<T> {
  const sessionData = await auth0.getSession();
  const accessToken = sessionData?.tokenSet.accessToken;

  if (!accessToken) {
    throw new ContextualError('No Access Token Present for user', { route, options });
  }

  options.headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const result = await fetchWrapper<T>(route, options);
  return result;
}
