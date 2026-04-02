/**
 * Builds the masked array for a given word and set of guessed letters.
 * Spaces are always revealed; unknown letters become '_'.
 * @param {string} word
 * @param {Set<string>} guessedLetters
 * @returns {string[]}
 */
export function buildMask(word, guessedLetters) {
  return word.split("").map((char) => {
    if (char === " ") return " ";
    return guessedLetters.has(char.toLowerCase()) ? char.toLowerCase() : "_";
  });
}

/**
 * Returns true when all non-space characters have been guessed.
 * @param {string} word
 * @param {Set<string>} guessedLetters
 * @returns {boolean}
 */
export function isWon(word, guessedLetters) {
  return word
    .toLowerCase()
    .split("")
    .filter((c) => c !== " ")
    .every((c) => guessedLetters.has(c));
}

/**
 * Returns true when the player has exhausted all attempts.
 * @param {number} wrongCount
 * @param {number} maxAttempts
 * @returns {boolean}
 */
export function isLost(wrongCount, maxAttempts) {
  return wrongCount >= maxAttempts;
}

/**
 * Validates a single letter guess.
 * @param {string} letter
 * @returns {boolean}
 */
export function isValidLetter(letter) {
  return typeof letter === "string" && /^[a-z]$/.test(letter);
}

/** Max attempts per difficulty level */
export const DIFFICULTY_CONFIG = {
  easy:   { attempts: 8,  label: "Easy",   description: "4–5 letter words" },
  medium: { attempts: 6,  label: "Medium",  description: "6–8 letter words" },
  hard:   { attempts: 4,  label: "Hard",    description: "9+ letter words"  },
};
