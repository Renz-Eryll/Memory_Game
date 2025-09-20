import React from "react";
import { useGameContext } from "@/contexts";
import styles from "./GameBoard.module.scss";
import Card from "../Card/Card";

const GameBoard: React.FC = () => {
  const { gameState } = useGameContext();

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${gameState.difficulty.cols}, 1fr)`,
      }}
      role="grid"
      aria-label="Memory game board"
    >
      {gameState.cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>
  );
};

export default GameBoard;
