'use server';
import { Claims, getSession } from '@auth0/nextjs-auth0';
export interface ExpectedClaims extends Claims {
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
