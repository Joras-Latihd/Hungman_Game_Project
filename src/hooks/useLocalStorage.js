import { useState, useCallback } from "react";

/**
 * Custom hook that persists state to localStorage.
 * @param {string} key   localStorage key
 * @param {*} initialValue  default value if nothing is stored
 * @returns [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (_) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const toStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(toStore);
        window.localStorage.setItem(key, JSON.stringify(toStore));
      } catch (_) {
        // silent failure in private/restricted environments
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
