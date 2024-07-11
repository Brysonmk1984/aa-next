/**
 * Returns the names of the _typed_ enumerable string properties and methods of an object.
 *
 * Note: Limiting Object.keys to a specific type may lead to inconsistencies between type-checking and runtime behavior.
 * Use this function when you are certain of the objects keys.
 */
export const getTypedKeys = Object.keys as <T extends object>(
  obj: T,
  // Using `ToStringKey` because Object.keys returns all keys as strings.
) => Array<ToStringKey<T>>;

/**
 * Returns an array of _typed_ values of the enumerable properties of an object.
 */
export const getTypedValues = Object.values as <T extends object>(obj: T) => Array<T[keyof T]>;

/**
 * Returns an array of _typed_ key/values of the enumerable properties of an object.
 *
 * Note: Limiting Object.entries to a specific type may lead to inconsistencies between type-checking and runtime behavior.
 * Use this function when you are certain of the objects keys.
 */
export const getTypedEntries = Object.entries as <T extends object>(
  obj: T,
  // Using `ToStringKey` because Object.entries returns all keys as strings.
) => Array<[ToStringKey<T>, T[keyof T]]>;

/**
 * Converts object keys to their string literal types.
 */
type ToStringKey<T> = `${Extract<keyof T, string | number>}`;
