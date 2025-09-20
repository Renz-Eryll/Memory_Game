import React from "react";
import { Difficulty, DIFFICULTIES } from "@/types";
import styles from "./DifficultySelector.module.scss";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  setDifficulty,
}) => {
  return (
    <div className={styles.selector}>
      <label htmlFor="difficulty">Difficulty:</label>
      <select
        id="difficulty"
        value={currentDifficulty.name}
        onChange={(e) => {
          const selected = DIFFICULTIES.find((d) => d.name === e.target.value);
          if (selected) setDifficulty(selected);
        }}
        aria-label="Select game difficulty"
      >
        {DIFFICULTIES.map((difficulty) => (
          <option key={difficulty.name} value={difficulty.name}>
            {difficulty.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySelector;
