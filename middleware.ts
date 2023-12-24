// middleware.js
import { ENVIRONMENT } from '@/configs/environment.config';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

/**
 *
 * @param req setCookieMiddleware - If I need to set cookies from the next server, I can do it here
 * But generally I'll be doing standard token practice:
 * 1. Just passing the access token to the client via a cookie httpOnly=true
 * 2. Not doing any reading of the token client-side (I can't because httpOnly=true)
 * 3. Make proxy request to the Next api which can extract the token in the cookie, and forward the request to rust server with Authorization header
 * 4. Rust server will read the Authorization header and decrypt the access token and verify identity
 */
async function setCookieMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  // If API proxy request, add Authentication header
  // const authentication = undefined;
  // console.log('PATHHH', req.nextUrl.pathname);

  if (session && session.accessToken) {
    const { accessToken } = session;
    res.cookies.set('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: ENVIRONMENT !== 'development' ? false : true,
    });
  }

  return res;
}

export default withMiddlewareAuthRequired(setCookieMiddleware);

export const config = {
  matcher: ['/buy/:path*', '/campaign/:path*', '/kingdom/:path*', '/api/proxy/{armies}/:path*'],
};
