'use server';
import { auth0 } from '../../lib/auth0';

export interface ExpectedClaims {
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface Auth0Session {
  user: ExpectedClaims | null;
  accessToken: string | null;
}
export async function getAuth0Session(): Promise<Auth0Session> {
  const sessionResult = await auth0.getSession();

  return {
    user: (sessionResult?.user as ExpectedClaims) ?? null,
    accessToken: sessionResult?.tokenSet.accessToken ?? null,
  };
}
