export const toKebabCase = (phrase: string) => {
  const result = phrase.replace(/ /g, '-').toLowerCase();
  return result;
};
