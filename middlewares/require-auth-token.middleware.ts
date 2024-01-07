import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareFunc } from './stack-middlewares.util';
import { getCookie } from '@/utils/getCookie';

export const withRequireAuthToken = () => {
  return async (req: NextRequest) => {
    const cookieString = req.headers.get('cookie') ?? undefined;
    console.log({ cookieString });

    const accessToken = getCookie('access_token', cookieString);
    console.log('PPPPP', accessToken);

    if (!accessToken) {
      console.log('NO AUTH TOKEN sent from client on cookie!');
    }

    const res = NextResponse.next();
    // const user = await getSession(req, res);
    res.cookies.set('appSession', accessToken ?? '');
    res.cookies.set('access_token', accessToken ?? '');
    return res;
  };
};
