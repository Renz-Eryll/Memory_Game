export interface Card {
  id: string;
  value: string | number;
  isFlipped: boolean;
  isMatched: boolean;
  position: number;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  isGameComplete: boolean;
  isGameStarted: boolean;
  difficulty: Difficulty;
}

export interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  pairs: number;
}

export interface BestScore {
  moves: number;
  time: number;
  difficulty: string;
  date: string;
}

export interface TimerState {
  seconds: number;
  isRunning: boolean;
}

export const DIFFICULTIES: Difficulty[] = [
  { name: "Easy", rows: 2, cols: 2, pairs: 2 },
  { name: "Medium", rows: 4, cols: 4, pairs: 8 },
  { name: "Hard", rows: 6, cols: 6, pairs: 18 },
];
