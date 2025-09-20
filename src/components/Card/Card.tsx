import React, { useCallback } from "react";
import { Card as CardType } from "@/types";
import { useGameContext } from "@/contexts";
import styles from "./Card.module.scss";

interface CardProps {
  card: CardType;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  const { flipCard } = useGameContext();

  const handleClick = useCallback(() => {
    if (!card.isFlipped && !card.isMatched) {
      flipCard(index);
    }
  }, [card, index, flipCard]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div
      className={`${styles.card} ${
        card.isFlipped || card.isMatched ? styles.flipped : ""
      } ${card.isMatched ? styles.matched : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={card.isFlipped || card.isMatched}
      aria-label={`Card ${card.value} at position ${index + 1}`}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>?</div>
        <div className={styles.cardBack}>{card.value}</div>
      </div>
    </div>
  );
};

export default Card;
