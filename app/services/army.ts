import { API_ENDPOINT } from '@/configs/environment.config';
import { Army } from '@/types';

export async function getArmies() {
  const res = await fetch(`${API_ENDPOINT}/armies`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const armies = (await res.json()) as Promise<Array<Army>>;

  return armies;
}
