import { wordBank } from "../assets/words.js";

/**
 * Picks a random word object from the bank filtered by difficulty.
 * @param {"easy"|"medium"|"hard"} difficulty
 * @param {string|null} excludeWord  — avoid repeating the same word back-to-back
 * @returns {{ word, category, hint, difficulty }}
 */
export function selectWord(difficulty, excludeWord = null) {
  const pool = wordBank.filter(
    (w) => w.difficulty === difficulty && w.word !== excludeWord
  );
  if (pool.length === 0) {
    // fallback: allow any difficulty
    const fallback = wordBank.filter((w) => w.word !== excludeWord);
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
