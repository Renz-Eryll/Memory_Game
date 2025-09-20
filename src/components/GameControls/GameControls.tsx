import React from "react";
import styles from "./GameControls.module.scss";
import Timer from "../Timer/Timer";
import MoveCounter from "../MoveCounter/MoveCounter";

interface GameControlsProps {
  resetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ resetGame }) => {
  return (
    <div className={styles.controls}>
      <Timer />
      <MoveCounter />
      <button
        className={styles.resetButton}
        onClick={resetGame}
        aria-label="Restart game"
      >
        Restart
      </button>
    </div>
  );
};

export default GameControls;
