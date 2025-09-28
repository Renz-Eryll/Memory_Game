import React from "react";
import styles from "./GameControls.module.scss";
import Timer from "../Timer/Timer";
import MoveCounter from "../MoveCounter/MoveCounter";
import BestScore from "../BestScore/BestScore";
import { useGameContext } from "@/contexts";

interface GameControlsProps {
  resetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ resetGame }) => {
  const { gameState } = useGameContext();

  return (
    <div className={styles.controls}>
      <div className={styles.stats}>
        <Timer />
        <MoveCounter />
        <BestScore difficulty={gameState.difficulty.name} />
      </div>
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
