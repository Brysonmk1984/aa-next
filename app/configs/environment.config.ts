import { ENVIRONMENT as ENV } from '@/types';

export const ENVIRONMENT = (process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev') as ENV;
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://127.0.0.1:8111';
