import { useCallback, useEffect, useState } from 'react';

interface ClientSideStorage<T> {
  getItem: () => T | null;
  removeItem: () => void;
  storeItem: (value: T) => void;
  value: T;
}

interface UseClientSideStorage {
  <T>(key: string): ClientSideStorage<T | null>;
  <T>(key: string, defaultValue: T): ClientSideStorage<T>;
}

export const useSessionStorage: UseClientSideStorage = <T = null,>(key: string, defaultValue?: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(defaultValue || null);

  const getItem = useCallback((): T | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const storedState = sessionStorage.getItem(key);
    if (storedState) {
      return JSON.parse(storedState) as T;
    } else if (defaultValue) {
      return defaultValue;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeItem = useCallback((value: T): void => {
    if (typeof window === 'undefined') {
      return;
    }
    const stringified = JSON.stringify(value);
    sessionStorage.setItem(key, stringified);
    setStoredValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    sessionStorage.removeItem(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stored = getItem();
    setStoredValue(stored);
  }, [getItem]);

  return {
    value: storedValue,
    getItem,
    storeItem,
    removeItem,
  };
};
