import React from "react";
import styles from "./App.module.scss";
import { useGameContext } from "@/contexts";
import {
  BestScore,
  DifficultySelector,
  GameBoard,
  GameControls,
  GameComplete,
} from "@/components";

const App: React.FC = () => {
  const { gameState, setDifficulty, resetGame } = useGameContext();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Memory Game</h1>
      </header>
      <main className={styles.main}>
        <DifficultySelector
          currentDifficulty={gameState.difficulty}
          setDifficulty={setDifficulty}
        />
        <GameControls resetGame={resetGame} />
        <BestScore difficulty={gameState.difficulty.name} />
        <GameBoard />
        {gameState.isGameComplete && <GameComplete />}{" "}
        {/* Conditionally render */}
      </main>
    </div>
  );
};

export default App;
