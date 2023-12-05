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
}

export interface NationWithArmy extends Nation {
  armies: Array<Army>;
}
