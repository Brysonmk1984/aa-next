/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContextualError, errorType } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';
import { auth0 } from '../../../lib/auth0';

import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function POST(req: NextApiRequest) {
  try {
    const body = await (req as unknown as Request).json();
    console.log({ body });

    if (!body.url) {
      return new NextResponse(
        JSON.stringify({
          error: 'Missing Request URL - This doesnt get read in the client since we are not reading bodies ',
        }),
        {
          status: 415,
        },
      );
    }
    console.log(11111);

    const session = await auth0.getSession(req);
    console.log(1212, { session });

    // Unclear why I can't just pass the original Next response. When I do, the getSession function call fails
    //const sessionResult = await auth0.getSession(req as any);
    const token = await auth0.getAccessToken(req);
    console.log(2222, token);
    const accessToken = sessionResult?.tokenSet.accessToken;
    console.log(3333);
    if (!accessToken) {
      throw new ContextualError('No Access Token Present for user', { url: body.url, options: body.option });
    }
    console.log(44444);
    const { url, options = {} } = body;
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    console.log({ url, options });

    const result = await fetchWrapper(url, { ...options, cache: 'no-store' });

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    const error = errorType(e);
    console.error(error);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
