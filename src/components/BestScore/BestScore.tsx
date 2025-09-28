import React from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { BestScore as BestScoreType } from "@/types";
import styles from "./BestScore.module.scss";

interface BestScoreProps {
  difficulty: string;
}

const BestScore: React.FC<BestScoreProps> = ({ difficulty }) => {
  const [bestScore] = useLocalStorage<BestScoreType | null>(
    `bestScore-${difficulty}`,
    null
  );

  if (!bestScore) return null;

  return (
    <div className={styles.bestScore} aria-live="polite">
      <span className={styles.statLabel}>Best Score</span>
      <span className={styles.statValue}>
        {bestScore.moves} moves / {bestScore.time}s
      </span>
    </div>
  );
};

export default BestScore;
