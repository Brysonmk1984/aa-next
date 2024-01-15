'use server';

import { User } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';

export const fetchWithAuth = async (route: string, options: RequestInit = {}) => {
  console.log('HERE');

  const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };
  console.log({ accessToken });

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  console.log('route:', route, 'options', options);

  const response = await fetch(route, options);
  const result = await response.json();
  return result;
};
