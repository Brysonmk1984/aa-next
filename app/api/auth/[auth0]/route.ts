// app/api/auth/[auth0]/route.js
import { AUTH_AUD } from '@/configs/environment.config';
import { errorType } from '@/utils';

import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { headers } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const GET = handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    const referrer = headers().get('referer');
    const loggingInFromFoundingPage = referrer?.includes('/founding?nationName=');
    const returnTo = loggingInFromFoundingPage ? '/founding?authenticated=true' : referrer ?? undefined;

    try {
      // Don't need to override the audience, it's already being passed from Auth0 server based on tenant
      const handleLoginResponse = await handleLogin(req, res, {
        authorizationParams: { audience: AUTH_AUD },
        returnTo,
      });

      return handleLoginResponse;
    } catch (e) {
      const error = errorType(e);
      console.error(error);
      res.status(500).end();
    }
  },
});
