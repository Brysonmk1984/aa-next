import { User } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';

export const fetchWithAuth = async (route: string) => {
  const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };
  let options: RequestInit = {};
  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const response = await fetch(route, options);
  const result = await response.json();
  return result;
};
