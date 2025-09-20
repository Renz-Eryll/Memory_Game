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
      Best Score: {bestScore.moves} moves in {bestScore.time}s ({bestScore.date}
      )
    </div>
  );
};

export default BestScore;
