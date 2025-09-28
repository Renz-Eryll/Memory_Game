import React from "react";
import { useGameContext } from "@/contexts";
import styles from "./Timer.module.scss";

const Timer: React.FC = () => {
  const { seconds } = useGameContext();

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.timer} aria-live="polite">
      <span className={styles.statLabel}>Time</span>
      <span className={styles.statValue}>{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
