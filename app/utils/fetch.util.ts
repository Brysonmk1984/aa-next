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

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `FetchError: Request failed with status code ${response.status} (${response.statusText})`;
    throw new Error(message);
  }

  return response.json();
};
