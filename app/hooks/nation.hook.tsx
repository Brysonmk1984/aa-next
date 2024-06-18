import { useNationContext } from '@/contexts';
import { assertHasNationDetails } from '@/utils';

/**
 *
 * @returns A wrapper for the useNationContext that handles type narrowing
 */
export const useNation = () => {
  const { nation, armies, campaign } = useNationContext();
  assertHasNationDetails(nation);

  return { nation, armies, campaign };
};
