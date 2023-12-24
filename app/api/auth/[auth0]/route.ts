// app/api/auth/[auth0]/route.js
import { errorType } from '@/utils/errorType.util';
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const GET = handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const handleLoginResponse = await handleLogin(req, res, { authorizationParams: { customParam: 'foo' } });
      console.log({ handleLoginResponse });

      return handleLoginResponse;
    } catch (e) {
      const error = errorType(e);
      console.error(error);
      res.status(500).end();
    }
  },
});
