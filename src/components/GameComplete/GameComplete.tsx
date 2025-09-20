import React from "react";
import { useGameContext } from "@/contexts";
import styles from "./GameComplete.module.scss";

const GameComplete: React.FC = () => {
  const { gameState, seconds, resetGame } = useGameContext();

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Congratulations!</h2>
        <p>
          You completed the {gameState.difficulty.name.toLowerCase()} level in{" "}
          {gameState.moves} moves and {formatTime(seconds)}.
        </p>
        <p>Well done training your memory!</p>
        <button onClick={resetGame} aria-label="Play again">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameComplete;
