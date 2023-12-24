import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('asdasdasdads');
  //res.status(200).end();
  // const url = req?.body?.url;
}

export async function POST(req: NextRequest) {}
