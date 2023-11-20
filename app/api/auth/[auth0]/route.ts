// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  async login(req, res) {
    try {
      const handleLoginResponse = await handleLogin(req, res, { authorizationParams: { customParam: 'foo' } });

      //console.log('CAKE', res);

      return handleLoginResponse;
    } catch (error) {
      res.status(error.status || 500).end();
    }
  },
});
