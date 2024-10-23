import { ArmyName } from './campaign.type';

type WeaponType = 'piercing' | 'blunt' | 'edged' | 'magic' | 'crushing';
type ArmorType = 'chain' | 'plate' | 'unarmored' | 'leather';

export interface Army {
  id: number;
  name: ArmyName;
  count: number;
  shield_rating: string;
  flying: false;
  range: number;
  accuracy: string;
  weapon_type: WeaponType;
  armor_type: ArmorType;
  agility: string;
  speed: number;
  aoe: string;
  spread: string;
  attack_speed: number;
  lore: string;
  cost: number;
  unlock_level: number;
}
