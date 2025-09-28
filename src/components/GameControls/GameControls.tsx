import React from "react";
import styles from "./GameControls.module.scss";
import Timer from "../Timer/Timer";
import MoveCounter from "../MoveCounter/MoveCounter";
import { useGameContext } from "@/contexts";
import BestScore from "../BestScore/BestScore";

const GameControls: React.FC = () => {
  const { resetGame, gameState } = useGameContext();

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
