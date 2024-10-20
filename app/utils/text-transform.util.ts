import { BattleStats } from '@/types/battle.type';

export const sentenceCaseToKebabCase = (phrase: string) => {
  const result = phrase.replace(/ /g, '-').toLowerCase();
  return result;
};

export const kebabCaseToTitleCase = (phrase: string) => {
  const lowercase = phrase.replace(/-/g, ' ');

  return lowercaseToTitleCase(lowercase);
};

export const pascalCaseToTitleCase = (phrase: string) => {
  return phrase
    .split('')
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter}`;
      }
      return letter;
    })
    .join('');
};

export const lowercaseToTitleCase = (phrase: string) => {
  return phrase
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(' ');
};

export const snakeCaseToSentenceCase = (phrase: string) => {
  return phrase.split('_').join(' ');
};

export const snakeCaseToCamelCase = (phrase: string) => {
  return phrase
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string) => group.toUpperCase().replace('-', '').replace('_', ''));
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

export const capitalize = (word: string) => {
  return word.slice(0, 1).toLocaleUpperCase() + word.slice(1, word.length);
};
