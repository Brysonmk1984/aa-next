import { NextRequest, NextResponse } from 'next/server';
import {
  MiddlewareConfig,
  MiddlewareFactory,
  MiddlewareFunc,
  stackMiddlewares,
} from './middlewares/stack-middlewares.util';
import { withMiddlewareAuthRequired, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0/edge';
import { withRequireAuthToken } from './middlewares/require-auth-token.middleware';

const apiMatcher = '^/api';
const nonApiMatcher = '^/(?!api)';

/**
 * Middleware in this file is run for all requests to the Next.js server. These requests can be for static assets, pages, or API endpoints.
 * With that in mind, it's important to specify a matcher with your specific middleware if it should only run for specific requests.
 *
 * In general, you should only specify middleware here if it is to run on pages or is "general" enough to live here. If you want to apply
 * specific middleware to an API route (e.g. require specific fields in body or only allow specific HTTP methods), you should use the
 * appropriate middleware in that endpoint rather than specifying it here. This is not to scare you from using middleware here for API endpoints,
 * but just be thoughtful about whether it is something that would be better off on an individual endpoint rather than a group.
 *
 * Instead of the normal Next.js middleware configuration which exports a single middleware function for all requests that work with the specified
 * matcher (`export const config = { matcher: '...' }`), we have created a pattern for breaking up the logic to different middleware functions
 * that can be used along with or without a specified matcher for that specific logic. This makes it easier to create bite-sized middleware functions
 * that can be applied to specific requests.
 *
 * `middlewareFuncs` is an array that can contain `MiddlewareFactory` types (a function) or `MiddlewareConfig` types. `MiddlewareConfig` has a `MiddlewareFactory`
 * and a `matcher` which is an array of regular expressions that will apply the middleware to request pathnames that match with one of the specified
 * expressions. If a `MiddlewareFactory` is used directly, then it will run on all requests (except for some static files)
 */
const middlewareFuncs: (MiddlewareFactory | MiddlewareConfig)[] = [
  // { middleware: withRequireAuthToken, matcher: [apiMatcher] },
];

/**
 * Using `stackMiddlewares` will automatically avoid applying the given middleware functions to requests for static assets.
 * The filtering for these requests is somewhat hard-coded, so if a new directory or file is added at the root-level of the
 * public/ directory, stackMiddlewares will need to be updated to avoid applying middleware to it.
 */
export default //withMiddlewareAuthRequire(
stackMiddlewares(middlewareFuncs);
//);

// Primary matcher for all middleware
export const config = {
  matcher: [
    '/buy/:path*',
    '/campaign/:path*',
    '/kingdom/:path*',
    // This matcher works, but my auth middleware is failing
    //'/api/proxy/(buy|campaign|kingdom)/:path*',
  ],
};
