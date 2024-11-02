import { UpkeepKeys } from '@/constants/upkeep';
import { NationArmy } from '.';

export interface Nation {
  id: number;
  user_id: number | null;
  name: string;
  gold: number;
  is_npc: boolean;
  lore: string | null;
  created_at: string;
  updated_at: string;
  upkeep: {
    level: UpkeepKeys;
    cost: number;
    rate: null;
  };
  income: {
    amount: number;
    rate: null;
  };
}

export interface CampaignNation extends Nation {
  user_id: null;
  is_npc: true;
}

export interface CampaignNationProfile {
  nation_details: CampaignNation;
  all_armies: Array<NationArmy>;
}
