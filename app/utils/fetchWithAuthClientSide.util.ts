'use client';

import { User } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';

export const fetchWithAuthClientSide = async (route: string, options: RequestInit = {}) => {
  console.log('route:', route, 'options', options);

  const response = await fetch(route, options);
  const result = await response.json();
  return result;
};
