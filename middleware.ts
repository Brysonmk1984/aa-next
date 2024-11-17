import { auth0 } from './lib/auth0';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('in middle');

  const res = await auth0.middleware(request);
  console.log(res);
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
