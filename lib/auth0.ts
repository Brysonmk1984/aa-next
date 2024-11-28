import { AUTH_AUD } from '@/configs/environment.config';
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: 'openid profile email',
    audience: AUTH_AUD,
  },
  onCallback: async (error, context, session) => {
    console.log({ context, session });

    // redirect the user to a custom error page
    if (error) {
      return NextResponse.redirect(new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL));
    }

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(new URL(context.returnTo || '/', process.env.APP_BASE_URL));
  },
});
