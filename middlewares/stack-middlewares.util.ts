import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export type MiddlewareFunc = (request: NextRequest) => Promise<NextResponse>;

export type MiddlewareFactory = (middleware: MiddlewareFunc) => MiddlewareFunc;

export interface MiddlewareConfig {
  matcher?: Array<string | RegExp>;
  middleware: MiddlewareFactory;
}

export type ApiMiddlewareFunc = (routeHandler: NextApiHandler) => NextApiHandler;

type StackApiMiddlewares = (middlewares: ApiMiddlewareFunc[], index?: number) => ApiMiddlewareFunc;

/**
 * `stackApiMiddlewares` is to be used in Next.js API Routes to more clearly specify multiple middleware to be used. Because of how Next.js
 * implements middleware in the middleware.ts file and the export type of the API Routes, this function essentially works the same as
 * `stackMiddlewares` but is designed to work with the specific export type for Next.js API Routes.
 *
 * An example of applying multiple `ApiMiddlewareFunc`s in an API Route without `stackApiMiddlewares`:
 * ```
 * const exampleApiRouteHandler = (req: NextApiRequest, res: NextApiResponse) => {...};
 * const exampleApiRouteHandlerWithMiddleware = withMiddleware1(withMiddleware2(options)(withMiddleware3(exampleApiRouteHandler)));
 * export default exampleApiRouteHandlerWithMiddleware;
 * ```
 * As you can see, when you start adding more middleware, it can get rather verbose and a bunch of nesting. Instead, you can use `stackApiMiddlewares`
 * to clean it up a bit:
 * ```
 * const exampleApiRouteHandler = (req: NextApiRequest, res: NextApiResponse) => {...};
 * const exampleApiRouteHandlerWithMiddleware = stackApiMiddlewares([
 *     withMiddleware1,
 *     withMiddleware2(options),
 *     withMiddleware3])(exampleApiRouteHandler);
 * export default exampleApiRouteHandlerWithMiddleware;
 * ```
 *
 * Note: middleware functions that can be used in Next.js API Routes are different from middleware functions that can be used in `middleware.ts` due
 * to Next.js implementation differences
 *
 * @param middlewares - List of `ApiMiddlewareFunc`s that you would like to apply to your routeHandler
 * @param index - DO NOT USE - this field is used internally to apply the specified middleware functions
 * @returns a function that accepts the routeHandler (`NextApiHandler`) for your API route
 */
export const stackApiMiddlewares: StackApiMiddlewares =
  (middlewares, index = 0) =>
  (handler) => {
    const current = middlewares[index];
    if (!current) {
      return handler;
    }

    const next = stackApiMiddlewares(middlewares, index + 1)(handler);
    return current(next);
  };

/**
 * `stackMiddlewares` is to be used in the `middleware.ts` to more clearly specify multiple middleware to be used. Because of how Next.js
 * implements middleware in the middleware.ts file and the export type of the API Routes, this function essentially works the same as
 * `stackApiMiddlewares` but is designed to work with the specific export type for the Next.js `middleware.ts` file and has some other nuances (like request matching).
 *
 * An example of applying multiple `MiddlewareFactory`s in `middleware.ts` without `stackMiddlewares`:
 * ```
 * export const middleware = middleware1(middleware2(options)(middleware3((req: NextRequest) => NextResponse.next())));
 * ```
 * As you can see, when you start adding more middleware, it can get rather verbose and a bunch of nesting. Another thing worth noting
 * is that using the above method doesn't allow you to easily specify specific requests that a middleware function should run on.
 * Instead, you can use `stackApiMiddlewares` to clean it up a bit and easily specify what requests they should run on:
 * ```
 * const exampleApiRouteHandler = (req: NextApiRequest, res: NextApiResponse) => {...};
 * const exampleApiRouteHandlerWithMiddleware = stackApiMiddlewares([
 *     withMiddleware1,
 *     withMiddleware2(options),
 *     withMiddleware3])(exampleApiRouteHandler);
 * export const middleware = stackMiddlewares([
 *     {middleware: middleware1, matcher: ['^/api']} // only run this middleware on requests to API routes
 *     middleware2(options),                         // run middleware2 and middleware3 on all requests
 *     middleware3]);
 * ```
 *
 * Note: middleware functions that can be used in the `middleware.ts` file are different from middleware functions that can be used in Next.js API Routes due
 * to Next.js implementation differences
 *
 * @param middlewares - List of `MiddlewareFactory`s or `MiddlewareConfig`s that you would like to apply to requests made to the Next.js server
 * @param index - DO NOT USE - this field is used internally to apply the specified middleware functions
 * @returns a single middleware function that can be exported in `middleware.ts` that runs all the given middlewares
 */
export const stackMiddlewares = (
  middlewares: Array<MiddlewareFactory | MiddlewareConfig> = [],
  index = 0,
): MiddlewareFunc => {
  const current = middlewares[index];
  if (!current) {
    return async () => NextResponse.next();
  }
  let currentMiddleware: MiddlewareFactory;
  if (Object.hasOwn(current, 'middleware')) {
    currentMiddleware = withMatcher(current as MiddlewareConfig);
  } else {
    currentMiddleware = withMatcher({ middleware: current as MiddlewareFactory });
  }
  const next = stackMiddlewares(middlewares, index + 1);
  return currentMiddleware(next);
};

/**
 * Wraps a MiddlewareFactory (essentially a middleware) and determines whether the specified middleware should run depending on
 * if the request path matches the given matcher. Request for Next files (i.e. /_next/*) will always be ignored by middleware
 *
 * @param middlewareConfig: object that has a middleware and a matcher. The matcher is a list of strings or regular expressions
 * to test against the pathname. If there is a match on the pathname of the request, then the given middleware function will run
 * @returns a MiddlewareFactory that will either call the specified middleware if a pathname match exists or just call the next
 * middleware in the pipe
 */
const withMatcher = ({ middleware, matcher = ['^/'] }: MiddlewareConfig): MiddlewareFactory => {
  const staticFilesExp = new RegExp(`^/(_next|locales|static|oscar-fonts)`);

  const hasMatchWithMatcher = (pathname: string) => {
    for (const matchPattern of matcher) {
      const match = !!pathname.match(new RegExp(matchPattern));
      if (match) {
        return true;
      }
    }
    return false;
  };

  return (next: MiddlewareFunc) => {
    return async (req: NextRequest) => {
      const staticFile = !!req.nextUrl.pathname.match(staticFilesExp);
      if (hasMatchWithMatcher(req.nextUrl.pathname) && !staticFile) {
        return middleware(next)(req);
      }
      return next(req);
    };
  };
};
