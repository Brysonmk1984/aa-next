'use server';
import { User } from '@/types';
import { Claims, getSession } from '@auth0/nextjs-auth0';

interface ExpectedClaims extends Claims {
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface Auth0Session {
  user: ExpectedClaims | null;
  accessToken: string | null;
}
export async function getAuth0Session(): Promise<Auth0Session> {
  const sessionResult = await getSession();
  return {
    user: (sessionResult?.user as ExpectedClaims) ?? null,
    accessToken: sessionResult?.accessToken ?? null,
  };
}

function assertsHasExpectedClaims(user: Claims): asserts user is ExpectedClaims {
  if (!(user.email && user.email_verified && user.sub)) {
    throw new Error('Missing Session info');
  }
}
