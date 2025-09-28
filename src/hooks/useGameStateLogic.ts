import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, DIFFICULTIES, BestScore, Difficulty } from "@/types";
import { createDeck, shuffleDeck } from "@/utils";
import { FLIP_DELAY } from "@utils/constants";
import { useLocalStorage } from "@hooks/useLocalStorage";
import useTimer from "./useTimer";

export const useGameStateLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    isGameComplete: false,
    isGameStarted: false,
    difficulty: DIFFICULTIES[1],
  });

  const { startTimer, stopTimer, resetTimer, seconds } = useTimer();
  const [bestScore, setBestScore] = useLocalStorage<BestScore | null>(
    `bestScore-${gameState.difficulty.name}`,
    null
  );

  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = useCallback(() => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }

    setGameState((prev) => ({
      ...prev,
      cards: shuffleDeck(createDeck(prev.difficulty)),
      flippedCards: [],
      moves: 0,
      isGameComplete: false,
      isGameStarted: false,
    }));
    resetTimer();
  }, [resetTimer]);

  const setDifficulty = useCallback(
    (difficulty: Difficulty) => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
        flipTimeoutRef.current = null;
      }

      setGameState((prev) => ({
        ...prev,
        difficulty,
        cards: shuffleDeck(createDeck(difficulty)),
        flippedCards: [],
        moves: 0,
        isGameComplete: false,
        isGameStarted: false,
      }));
      resetTimer();
    },
    [resetTimer]
  );

  const flipCard = useCallback(
    (index: number) => {
      setGameState((prev) => {
        if (prev.flippedCards.length >= 2 || prev.isGameComplete) {
          return prev;
        }

        const card = prev.cards[index];
        if (card.isFlipped || card.isMatched) {
          return prev;
        }

        if (!prev.isGameStarted) {
          startTimer();
        }

        const newCards = [...prev.cards];
        newCards[index] = { ...card, isFlipped: true };
        const newFlippedCards = [...prev.flippedCards, newCards[index]];

        if (newFlippedCards.length === 2) {
          const [first, second] = newFlippedCards;
          const isMatch = first.value === second.value;

          if (isMatch) {
            const firstIndex = newCards.findIndex((c) => c.id === first.id);
            const secondIndex = newCards.findIndex((c) => c.id === second.id);

            newCards[firstIndex] = { ...first, isMatched: true };
            newCards[secondIndex] = { ...second, isMatched: true };

            const isGameComplete = newCards.every((card) => card.isMatched);

            if (isGameComplete) {
              stopTimer();
              setTimeout(() => {
                const finalTime = seconds + 1;
                const newBestScore: BestScore = {
                  moves: prev.moves + 1,
                  time: finalTime,
                  date: new Date().toLocaleDateString(),
                };

                if (
                  !bestScore ||
                  newBestScore.moves < bestScore.moves ||
                  (newBestScore.moves === bestScore.moves &&
                    newBestScore.time < bestScore.time)
                ) {
                  setBestScore(newBestScore);
                }
              }, 100);
            }

            return {
              ...prev,
              cards: newCards,
              flippedCards: [],
              moves: prev.moves + 1,
              isGameStarted: true,
              isGameComplete,
            };
          } else {
            flipTimeoutRef.current = setTimeout(() => {
              setGameState((current) => ({
                ...current,
                cards: current.cards.map((c) =>
                  c.id === first.id || c.id === second.id
                    ? { ...c, isFlipped: false }
                    : c
                ),
                flippedCards: [],
                moves: current.moves + 1,
              }));
            }, FLIP_DELAY);

            return {
              ...prev,
              cards: newCards,
              flippedCards: newFlippedCards,
              isGameStarted: true,
            };
          }
        }

        return {
          ...prev,
          cards: newCards,
          flippedCards: newFlippedCards,
          isGameStarted: true,
        };
      });
    },
    [startTimer, stopTimer, seconds, bestScore, setBestScore]
  );

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      cards: shuffleDeck(createDeck(prev.difficulty)),
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  return {
    gameState,
    flipCard,
    resetGame,
    setDifficulty,
    seconds,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
