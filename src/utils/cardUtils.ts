import { Card, Difficulty } from "@/types";

const CARD_SYMBOLS = [
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

export const createDeck = (difficulty: Difficulty): Card[] => {
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

export const shuffleDeck = (cards: Card[]): Card[] => {
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

export const isMatchingPair = (card1: Card, card2: Card): boolean => {
  return card1.value === card2.value && card1.id !== card2.id;
};

export const getGridTemplate = (difficulty: Difficulty): string => {
  return `repeat(${difficulty.cols}, 1fr)`;
};
