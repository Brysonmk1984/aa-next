/**
 * Used for converting snake-case to camelCase
 * example usage: converting rust query results to camelCase variable names used in our code
 */
export type SnakeToCamelCase<T extends string> = T extends `${infer R}_${infer S}`
  ? `${R}${Capitalize<SnakeToCamelCase<S>>}`
  : T;

export type ObjectKeyCamelCase<T extends { string: any }> = {
  [P in SnakeToCamelCase<T>]: boolean;
};
