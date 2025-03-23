/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContextualError, errorType } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';
import { auth0 } from '../../../lib/auth0';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await (req as unknown as Request).json();

    if (!body.url) {
      return new NextResponse(
        JSON.stringify({
          error: 'Missing Request URL - This does not get read in the client since we are not reading bodies ',
        }),
        {
          status: 415,
        },
      );
    }

    const tokenResult = await auth0.getAccessToken();

    if (!tokenResult) {
      throw new ContextualError('No Access Token Present for user', { url: body.url, options: body.option });
    }
    const accessToken = tokenResult.token;
    const { url, options = {} } = body;

    options.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

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
