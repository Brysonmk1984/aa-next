import { Army } from '.';

export interface Nation {
  id: number;
  user_id: number | null;
  name: string;
  gold: number;
  is_npc: boolean;
}

export interface CampaignNation extends Nation {
  user_id: null;
  is_npc: true;
  lore: string | null;
}

export interface CampaignNationProfile {
  nation_details: CampaignNation;
  all_armies: Array<Army>;
}
