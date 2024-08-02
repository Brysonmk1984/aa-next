import { ExpectedClaims } from '@/actions/getAuth0Session.action';
import { Nation, ResolvedUser } from '@/types';
import { NationCampaignDetails } from '@/types/campaign.type';
import { Claims } from '@auth0/nextjs-auth0';

export function assertHasExpectedClaims(user: Claims): asserts user is ExpectedClaims {
  if (!(user.email && user.email_verified && user.sub)) {
    throw new Error('Missing Session info');
  }
}

export function assertHasNationDetails(nation: Nation | null): asserts nation is Nation {
  if (!nation) {
    throw new Error('Nation details unavailable on a client-side page attempting to use them.');
  }
}

export function assertHasCampaignDetails(
  campaign: NationCampaignDetails | null,
): asserts campaign is NationCampaignDetails {
  if (!campaign) {
    throw new Error('Campaign details unavailable on a client-side page attempting to use them.');
  }
}

export function assertHasUserDetails(user: ResolvedUser | null): asserts user is ResolvedUser {
  if (!user) {
    throw new Error('User details unavailable on a client-side page attempting to use them.');
  }
}
