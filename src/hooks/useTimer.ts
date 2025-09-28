import { useState, useCallback, useEffect } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(
        () => setSeconds((prev: number) => prev + 1),
        1000
      );
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return { seconds, startTimer, stopTimer, resetTimer };
};

export default useTimer;
