type WeaponType = 'piercing' | 'blunt' | 'edged' | 'magic' | 'crushing';
type ArmorType = 'chain' | 'plate' | 'unarmored' | 'leather';

export type Army = {
  id: number;
  army_name: string;
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
};
