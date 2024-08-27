import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

// Maybe I need to do something like this?
// const anotherMiddleware = () => {
//   const res = new NextResponse();
//   const { user } = await getSession(req, res);
//   return NextResponse.redirect(new URL('/bar', request.url), res);
// };

// Primary matcher for all middleware
export const config: { matcher: Array<string> } = {
  matcher: ['/campaign/:path*', '/nation/:path*', '/enlist/:path*'],
};
