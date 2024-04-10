import { ArmyName } from './campaign.type';

export type NationArmy = {
  id: number;
  nation_id: number;
  army_id: number;
  count: number;
  army_name: ArmyName;
  created_at: string;
  updated_at: string;
};
