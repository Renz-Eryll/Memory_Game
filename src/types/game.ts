export interface Card {
  id: string;
  value: string;
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
  date: string;
}

export const DIFFICULTIES: Difficulty[] = [
  { name: "Easy", rows: 2, cols: 3, pairs: 3 },
  { name: "Medium", rows: 3, cols: 4, pairs: 6 },
  { name: "Hard", rows: 4, cols: 5, pairs: 10 },
];

export const CARD_SYMBOLS = [
  "🎮",
  "🎯",
  "🎲",
  "🎪",
  "🎨",
  "🎭",
  "🎬",
  "🎤",
  "🎵",
  "🎹",
  "🎸",
  "🎺",
  "🎻",
  "🎳",
  "🎰",
  "🃏",
  "🎊",
  "🎉",
  "🎈",
  "🎁",
  "🎀",
  "🎄",
  "🎃",
  "🎂",
  "⭐",
  "🌟",
  "✨",
  "🔥",
  "💎",
  "🏆",
  "🎖️",
  "🏅",
];
