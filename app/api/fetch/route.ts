import { User } from '@/types';
import { fetchWrapper } from '@/utils/fetch.util';
import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const { url, options = {} } = body;
    const { accessToken } = (await getSession()) as { user: User; accessToken?: string | undefined };
    console.log({ accessToken });

    if (accessToken) {
      options.headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    }

    const result = await fetchWrapper(url, options);
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
  }
}
