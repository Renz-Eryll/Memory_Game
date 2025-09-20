import { useEffect } from "react";
import { KEYBOARD_KEYS } from "@utils/constants";

export const useKeyboardNavigation = (
  cardCount: number,
  flipCard: (index: number) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.TAB) {
        e.preventDefault();
        const current = document.activeElement as HTMLElement;
        const cards = document.querySelectorAll('[role="button"]');
        const currentIndex = Array.from(cards).indexOf(current);
        let nextIndex = currentIndex;

        if (e.shiftKey) {
          nextIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        }

        (cards[nextIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cardCount, flipCard]);
};
