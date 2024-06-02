import { createContext as createReactContext, useContext as useReactContext } from 'react';

type CreateContextOptions<T> = {
  defaultValue?: T;
  /** Custom error message that shows when the hook is used outside of the context */
  errorMessage?: string;
  /** Name given to the context */
  name: Capitalize<string>;
};

const getErrorMessage = (name: string) => {
  return `use${name} cannot be used outside of a ${name}.Provider`;
};

type CreateContextReturn<T> = [React.Context<T>, () => T];
export const createContext = <T>(options: CreateContextOptions<T>): CreateContextReturn<T> => {
  const { name, errorMessage } = options;
  const Context = createReactContext<T | undefined>(undefined);

  Context.displayName = name;

  const useContext = () => {
    const contextValue = useReactContext(Context);

    if (contextValue === undefined) {
      const error = new Error(errorMessage ?? getErrorMessage(name));

      error.name = 'ContextError';

      throw error;
    }

    return contextValue;
  };

  return [Context, useContext] as CreateContextReturn<T>;
};
