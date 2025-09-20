import { useState, useCallback, useEffect } from "react";
import { TimerState } from "@/types";

export const useTimer = (): TimerState & {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
} => {
  const [timerState, setTimerState] = useState<TimerState>({
    seconds: 0,
    isRunning: false,
  });

  const startTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const stopTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({ seconds: 0, isRunning: false });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState((prev) => ({ ...prev, seconds: prev.seconds + 1 }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isRunning]);

  return { ...timerState, startTimer, stopTimer, resetTimer };
};
