import React from "react";
import { useTimer } from "@hooks/useTimer";
import styles from "./Timer.module.scss";

const Timer: React.FC = () => {
  const { seconds } = useTimer();

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.timer} aria-live="polite">
      Time: {formatTime(seconds)}
    </div>
  );
};

export default Timer;
