import React from "react";
import { useGameState } from "@hooks/useGameState";
import styles from "./MoveCounter.module.scss";

const MoveCounter: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <div className={styles.counter} aria-live="polite">
      Moves: {gameState.moves}
    </div>
  );
};

export default MoveCounter;
