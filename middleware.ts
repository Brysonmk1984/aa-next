// middleware.js
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

async function setCookieMiddleware(req) {
  const res = NextResponse.next();
  const user = await getSession(req, res);
  console.log({ user });

  //res.cookies.set('hl', user.language);
  console.log('nextttt');

  return res;
}

export default withMiddlewareAuthRequired(setCookieMiddleware);

export const config = {
  matcher: ['/buy/:path*', '/campaign/:path*', '/kingdom/:path*'],
};
