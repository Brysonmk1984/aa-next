/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/types';
import { errorType } from '@/utils';
import { fetchWrapper } from '@/utils/fetch.util';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await (req as unknown as Request).json();
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

    // Unclear why I can't just pass the original Next response. When I do, the getSession function call fails
    const asd = (await getSession(req as any, new NextResponse() as any)) as {
      user: User;
      accessToken?: string | undefined;
    };

    const { accessToken } = asd;
    const { url, options = {} } = body;
    if (accessToken) {
      options.headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    }

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

// apparently this is not needed?
//export const revalidate = 0;
