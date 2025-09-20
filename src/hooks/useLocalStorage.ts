import { useState, useCallback } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | null
): [T | null, (value: T | null) => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      try {
        setStoredValue(value);
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
};
