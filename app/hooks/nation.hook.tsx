import { useNationContext } from '@/contexts';
import { assertHasCampaignDetails, assertHasNationDetails } from '@/utils';

/**
 *
 * @returns A wrapper for the useNationContext that handles type narrowing
 */
export const useNation = () => {
  const { nation, armies, campaign, dispatch } = useNationContext();
  assertHasNationDetails(nation);
  assertHasCampaignDetails(campaign);

  return { nation, armies, campaign, dispatch };
};
