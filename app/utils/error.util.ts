/**
 * NonErrorException class is a utility class that's used to convert non-errors being thrown into errors for clear messaging in Sentry
 */
class NonErrorException extends Error {
  private setError = (message: unknown) => {
    this.name = `NonErrorException - type: ${typeof message}`;
    this.message = message?.toString() ?? 'No Error Message Provided';
  };

  constructor(message: unknown) {
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

/**
 * ContextualError is an error implementation that should be used when you want to log contextual
 * data in the error message. It is a simple wrapper around `Error` and solely appends a formatted
 * string of contextual data to the error message.
 */
export class ContextualError extends Error {
  context: Record<string, any> | undefined;
  originalMessage: string;

  constructor(message: string, context?: Record<string, any>, options?: ErrorOptions) {
    super(message, options);
    this.originalMessage = message;
    this.message = this.createMessage(message, context);
    this.context = context;
  }

  private createMessage(message: string, context?: Record<string, any>) {
    if (!context) {
      return message;
    }
    const contextString = Object.entries(context).reduce((acc, entry, ind) => {
      const entryString = `${entry[0]}=${entry[1]}`;
      if (ind === 0) {
        return entryString;
      }
      return `${acc}; ${entryString}`;
    }, '');
    return `${message}: context[${contextString}]`;
  }
}
