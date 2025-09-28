import React from "react";
import { useGameContext } from "@/contexts/GameContext";
import styles from "./App.module.scss";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import GameControls from "./components/GameControls/GameControls";
import GameBoard from "./components/GameBoard/GameBoard";
import GameComplete from "./components/GameComplete/GameComplete";

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
        <GameBoard />
        {gameState.isGameComplete && <GameComplete />}
      </main>
    </div>
  );
};

export default App;
