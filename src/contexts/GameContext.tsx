import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Card,
  GameState,
  Difficulty,
  BestScore,
  DIFFICULTIES,
  CARD_SYMBOLS,
} from "@/types";

const FLIP_DELAY = 1000;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {}
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

const createDeck = (difficulty: Difficulty): Card[] => {
  const totalCards = difficulty.rows * difficulty.cols;
  const pairsNeeded = totalCards / 2;
  const symbols = CARD_SYMBOLS.slice(0, pairsNeeded);
  const cards: Card[] = [];

  symbols.forEach((symbol, index) => {
    cards.push({
      id: `${symbol}-1-${index}`,
      value: symbol,
      isFlipped: false,
      isMatched: false,
      position: cards.length,
    });

    cards.push({
      id: `${symbol}-2-${index}`,
      value: symbol,
      isFlipped: false,
      isMatched: false,
      position: cards.length,
    });
  });

  return cards;
};

const shuffleDeck = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map((card, index) => ({
    ...card,
    position: index,
  }));
};

const useTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return { seconds, startTimer, stopTimer, resetTimer };
};

const useGameStateLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    isGameComplete: false,
    isGameStarted: false,
    difficulty: DIFFICULTIES[1],
  });
  const { seconds, startTimer, stopTimer, resetTimer } = useTimer();
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const key = `bestScore-${gameState.difficulty.name}`;
  const [bestScore, setBestScore] = useState<BestScore | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      setBestScore(stored ? JSON.parse(stored) : null);
    } catch {}
  }, [key]);

  const saveBestScore = (value: BestScore) => {
    try {
      setBestScore(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

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

            newCards[firstIndex] = {
              ...first,
              isMatched: true,
              isFlipped: true,
            };
            newCards[secondIndex] = {
              ...second,
              isMatched: true,
              isFlipped: true,
            };

            const isGameComplete = newCards.every((card) => card.isMatched);

            if (isGameComplete) {
              stopTimer();
              const currentMoves = prev.moves + 1;
              const currentScore: BestScore = {
                moves: currentMoves,
                time: seconds,
                date: new Date().toLocaleDateString(),
              };
              if (
                !bestScore ||
                currentMoves < bestScore.moves ||
                (currentMoves === bestScore.moves && seconds < bestScore.time)
              ) {
                saveBestScore(currentScore);
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
    [bestScore, seconds, startTimer, stopTimer]
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
  };
};

interface GameContextType {
  gameState: GameState;
  flipCard: (index: number) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  seconds: number;
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
