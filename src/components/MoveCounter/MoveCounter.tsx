import React from "react";
import { useGameContext } from "@/contexts";
import styles from "./MoveCounter.module.scss";

const MoveCounter: React.FC = () => {
  const { gameState } = useGameContext();

  return (
    <div className={styles.counter} aria-live="polite">
      Moves: {gameState.moves}
    </div>
  );
};

export default MoveCounter;
