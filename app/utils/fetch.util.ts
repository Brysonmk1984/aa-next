import { cookies } from 'next/headers';
import { getCookie } from './getCookie';
import { ContextualError } from './error.util';
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const configureFetchOptions = (options: RequestInit = {}) => {
  if (typeof window === 'undefined') {
    return options;
  }

  //const authorizationToken = sessionStorage.getItem('accessToken');
  const authorizationToken = getCookie('access_token');

  const Authorization = authorizationToken ? `Bearer ${authorizationToken}` : null;
  return { ...options, Authorization, cache: 'no-store' };
};

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `FetchError: Request failed`;
    throw new ContextualError(message, { status: response.status, statusText: response.statusText });
  }

  return response.json();
};

export const fetchPassthrough = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch('/api/fetch', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      url,
      options,
    }),
  });

  if (!response.ok) {
    const message = `fetchPassthrough Error: Request failed`;
    throw new ContextualError(message, { status: response.status, statusText: response.statusText });
  }

  return response.json();
};
