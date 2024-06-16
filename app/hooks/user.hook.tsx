import { useNationContext, useUserContext } from '@/contexts';
import { assertHasNationDetails, assertHasUserDetails } from '@/utils';

/**
 *
 * @returns A wrapper for the useUserContext that handles type narrowing
 */
export const useUser = () => {
  const { user } = useUserContext();
  assertHasUserDetails(user);

  return { user };
};
