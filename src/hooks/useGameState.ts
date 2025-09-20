import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, DIFFICULTIES, BestScore, Difficulty } from "@/types";
import { createDeck, shuffleDeck } from "@/utils";
import { FLIP_DELAY } from "@utils/constants";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTimer } from "@hooks/useTimer";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    isGameComplete: false,
    isGameStarted: false,
    difficulty: DIFFICULTIES[1], // Default to Medium
  });

  const { startTimer, stopTimer, resetTimer, seconds } = useTimer();
  const [bestScore, setBestScore] = useLocalStorage<BestScore>(
    `bestScore-${gameState.difficulty.name}`,
    null
  );

  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = useCallback(() => {
    // Clear any existing timeout
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
      // Clear any existing timeout
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
        // Can't flip if game is complete or too many cards are flipped
        if (prev.flippedCards.length >= 2 || prev.isGameComplete) {
          return prev;
        }

        const card = prev.cards[index];

        // Can't flip if card is already flipped or matched
        if (card.isFlipped || card.isMatched) {
          return prev;
        }

        // Start timer on first move
        if (!prev.isGameStarted) {
          startTimer();
        }

        const newCards = [...prev.cards];
        newCards[index] = { ...card, isFlipped: true };
        const newFlippedCards = [...prev.flippedCards, newCards[index]];

        // Check if we have a pair
        if (newFlippedCards.length === 2) {
          const [first, second] = newFlippedCards;
          const isMatch = first.value === second.value;

          if (isMatch) {
            // Mark cards as matched
            const firstIndex = newCards.findIndex((c) => c.id === first.id);
            const secondIndex = newCards.findIndex((c) => c.id === second.id);

            newCards[firstIndex] = { ...first, isMatched: true };
            newCards[secondIndex] = { ...second, isMatched: true };

            // Check if game is complete
            const isGameComplete = newCards.every((card) => card.isMatched);

            if (isGameComplete) {
              stopTimer();

              // Update best score
              const newBestScore = {
                moves: prev.moves + 1,
                time: seconds,
                difficulty: prev.difficulty.name,
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
            // No match - flip cards back after delay
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

        // First card flipped
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

  // Initialize game on mount
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      cards: shuffleDeck(createDeck(prev.difficulty)),
    }));
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  return { gameState, flipCard, resetGame, setDifficulty };
};
