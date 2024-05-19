import { cookies } from 'next/headers';
import { getCookie } from './getCookie';

export const configureFetchOptions = (options: RequestInit = {}) => {
  if (typeof window === 'undefined') {
    return options;
  }

  //const authorizationToken = sessionStorage.getItem('accessToken');
  const authorizationToken = getCookie('access_token');

  const Authorization = authorizationToken ? `Bearer ${authorizationToken}` : null;
  return { ...options, Authorization };
};

export const fetchWrapper = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`FetchError: Request failed with status code ${response.status} (${response.statusText})`);
  }

  return response.json();
};
