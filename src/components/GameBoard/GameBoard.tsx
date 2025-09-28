import React, { useEffect, useState } from "react";
import { useGameContext } from "@/contexts";
import styles from "./GameBoard.module.scss";
import Card from "../Card/Card";

const GameBoard: React.FC = () => {
  const { gameState } = useGameContext();
  const [cardSize, setCardSize] = useState(90);

  useEffect(() => {
    const updateCardSize = () => {
      const baseCardSize = 90;
      const minCardSize = 48;
      const maxCols = gameState.difficulty.cols;
      const gap = maxCols > 4 ? 6 : 10;
      const padding = maxCols > 4 ? 12 : 16;
      const maxWidth = Math.min(window.innerWidth * 0.9 - 2 * padding, 800);
      const calculatedCardSize = Math.min(
        baseCardSize,
        Math.max(minCardSize, (maxWidth - (maxCols - 1) * gap) / maxCols)
      );

      setCardSize(calculatedCardSize);
    };

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("resize", updateCardSize);
  }, [gameState.difficulty.cols]);

  const maxCols = gameState.difficulty.cols;
  const gap = maxCols > 4 ? 6 : 10;
  const gridWidth = maxCols * cardSize + (maxCols - 1) * gap;
  const gridHeight =
    gameState.difficulty.rows * cardSize +
    (gameState.difficulty.rows - 1) * gap;

  return (
    <div className={styles.board} role="grid" aria-label="Memory game board">
      <div
        className={styles.grid}
        style={
          {
            "--grid-columns": `repeat(${maxCols}, ${cardSize}px)`,
            "--grid-rows": `repeat(${gameState.difficulty.rows}, ${cardSize}px)`,
            "--grid-width": `${gridWidth}px`,
            "--gap": `${gap}px`,
          } as React.CSSProperties
        }
      >
        {gameState.cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
