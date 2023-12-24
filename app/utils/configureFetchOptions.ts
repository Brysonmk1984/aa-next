import { cookies } from 'next/headers';
import { getCookie } from './getCookie';

export const configureFetchOptions = (options: RequestInit = {}) => {
  if (typeof window === 'undefined') {
    return options;
  }

  //const authorizationToken = sessionStorage.getItem('accessToken');
  const authorizationToken = getCookie('access_token');

  const Authorization = authorizationToken ? `Bearer ${authorizationToken}` : null;
  console.log('THE THING', { ...options, Authorization });
  return { ...options, Authorization };
};
