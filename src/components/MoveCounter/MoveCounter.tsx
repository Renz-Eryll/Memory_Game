import React from "react";
import { useGameContext } from "@/contexts";
import styles from "./MoveCounter.module.scss";

const MoveCounter: React.FC = () => {
  const { gameState } = useGameContext();

  return (
    <div className={styles.counter} aria-live="polite">
      <span className={styles.statLabel}>Moves</span>
      <span className={styles.statValue}>{gameState.moves}</span>
    </div>
  );
};

export default MoveCounter;
