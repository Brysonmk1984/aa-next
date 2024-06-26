import { cookies } from 'next/headers';
import { getCookie } from './getCookie';
import { ContextualError } from './error.util';

export const configureFetchOptions = (options: RequestInit = {}) => {
  if (typeof window === 'undefined') {
    return options;
  }

  //const authorizationToken = sessionStorage.getItem('accessToken');
  const authorizationToken = getCookie('access_token');

  const Authorization = authorizationToken ? `Bearer ${authorizationToken}` : null;
  return { ...options, Authorization };
};

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `FetchError: Request failed`;
    throw new ContextualError(message, { status: response.status, statusText: response.statusText });
  }

  return response.json();
};
