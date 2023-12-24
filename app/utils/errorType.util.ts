/**
 * NonErrorException class is a utility class that's used to convert non-errors being thrown into errors for clear messaging in Sentry
 */
class NonErrorException extends Error {
  private setError = (message: string | boolean | number | object | undefined | null) => {
    this.name = `NonErrorException - type: ${typeof message}`;
    this.message = message?.toString() ?? 'No Error Message Provided';
  };

  constructor(message: string | boolean | number | object | undefined | null) {
    super();

    this.setError(message);
  }
}

/**
 * Errors in TypeScript are unknown. This util returns the same error, but as an Error type. This is useful if you want to do more with the Error after catching it, such as returning it from a hook and making it type-safe
 * @param errorish - type: unknown - Could be an Error type, or could be any other type
 * @returns returns the same error as an Error type
 */
export const errorType = (errorish: unknown) => {
  if (errorish instanceof Error) {
    return errorish;
  } else if (typeof errorish === 'undefined' || errorish === null) {
    return new NonErrorException('There was an unknown error. Please try again later.');
  }
  return new NonErrorException(errorish);
};
