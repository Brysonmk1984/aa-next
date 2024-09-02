import { ENVIRONMENT as ENV } from '@/types';
const ARMY_COUNT_ADJUSTMENT = process.env.NEXT_PUBLIC_DISABLE_BATTLE_ARMY_COUNT_ADJUSTMENT;

export const ENVIRONMENT = (process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev') as ENV;
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://127.0.0.1:8111';
export const AUTH_AUD = process.env.AUTH_AUD;
export const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

export const DISABLE_BATTLE_ARMY_COUNT_ADJUSTMENT = ARMY_COUNT_ADJUSTMENT === 'true' ? true : false;
export const CLEAR_BATTLE_ON_POSTBATTLE = process.env.NEXT_PUBLIC_CLEAR_BATTLE_ON_POSTBATTLE === 'true' ? true : false;
export const ALLOW_PREVIOUS_LEVEL_BATTLES =
  process.env.NEXT_PUBLIC_ALLOW_PREVIOUS_LEVEL_BATTLES === 'true' ? true : false;
