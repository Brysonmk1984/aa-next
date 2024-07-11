import { BattleStats } from '@/types/battle.type';

export const sentenceCaseToKebabCase = (phrase: string) => {
  const result = phrase.replace(/ /g, '-').toLowerCase();
  return result;
};

export const pascalCaseToTitleCase = (phrase: string) => {
  return phrase
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter}`;
      }
      return letter;
    })
    .join('');
};

export const snakeCaseToSentenceCase = (phrase: string) => {
  return phrase.split('_').join(' ');
};

export const mapStatsToDisplay = (phrase: keyof BattleStats) => {
  const map: Record<keyof BattleStats, string> = {
    starting_direction: '',
    dodge_count: 'Attacks Dodged',
    block_count: 'Shield Blocks',
    armor_defense_count: 'Armor deflections',
    kill: 'Kills',
  };

  return map[phrase];
};
