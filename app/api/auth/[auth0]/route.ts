// app/api/auth/[auth0]/route.js
import { AUTH_AUD } from '@/configs/environment.config';
import { errorType } from '@/utils/errorType.util';
import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const GET = handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Don't need to override the audience, it's already being passed from Auth0 server based on tenant
      const handleLoginResponse = await handleLogin(req, res, {
        authorizationParams: { audience: AUTH_AUD },
        returnTo: '/founding?authenticated=true',
      });

      return handleLoginResponse;
    } catch (e) {
      const error = errorType(e);
      console.error(error);
      res.status(500).end();
    }
  },
});
