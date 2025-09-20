import React, { createContext, useContext, ReactNode } from "react";
import { useGameStateLogic } from "@/hooks";
import { GameState, Difficulty } from "../types";

interface GameContextType {
  gameState: GameState;
  flipCard: (index: number) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  seconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const gameContextValue = useGameStateLogic();

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
