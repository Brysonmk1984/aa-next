import { Environment } from 'types/environment.type';

export const ENVIRONMENT = (process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev') as Environment;
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://127.0.0.1:8111';
