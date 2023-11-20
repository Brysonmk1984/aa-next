export interface User {
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface ResolvedUser extends Pick<User, 'email' | 'email_verified'> {
  id: number;
  auth0_sub: string;
}
