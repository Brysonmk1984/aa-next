import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}

export const config = {
  matcher: '/about',
};
