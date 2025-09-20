export const FLIP_DELAY = 1000;
export const ANIMATION_DURATION = 300;

export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
} as const;

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  TAB: "Tab",
  SHIFT: "Shift",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
} as const;

export const STORAGE_KEYS = {
  BEST_SCORE: "memoryGame_bestScore",
  GAME_SETTINGS: "memoryGame_settings",
} as const;

export const SCORING = {
  BASE_SCORE: 1000,
  MOVE_PENALTY: 10,
  TIME_PENALTY: 1,
} as const;

export const SYMBOL_CATEGORIES = {
  ENTERTAINMENT: ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎬", "🎤"],
  MUSIC: ["🎵", "🎹", "🎸", "🎺", "🎻", "🥁", "🪗", "🎧"],
  CELEBRATION: ["🎊", "🎉", "🎈", "🎁", "🎀", "🎄", "🎃", "🎂"],
  AWARDS: ["⭐", "🌟", "✨", "🔥", "💎", "🏆", "🎖️", "🏅"],
} as const;

export const DEFAULT_SETTINGS = {
  DIFFICULTY: "Medium",
  SOUND_ENABLED: true,
  ANIMATIONS_ENABLED: true,
} as const;
