import { useState, useEffect, useCallback, useRef } from "react";
import { selectWord } from "../utils/wordSelector.js";
import { buildMask, isWon, isLost, isValidLetter, DIFFICULTY_CONFIG } from "../utils/gameHelpers.js";
import { readStorage, writeStorage, recordWin, recordLoss } from "../utils/storageUtils.js";

export function useHangman() {
  const [difficulty, setDifficultyState] = useState(() => {
    return readStorage().preferences.difficulty || "medium";
  });

  const [wordObj, setWordObj] = useState(() => selectWord(difficulty));
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing" | "won" | "lost"
  const [hintUsed, setHintUsed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [stats, setStats] = useState(() => readStorage().stats);
  // tracks which letter key should shake (animation trigger)
  const [shakingKey, setShakingKey] = useState(null);
  const shakeTimerRef = useRef(null);

  const maxAttempts = DIFFICULTY_CONFIG[difficulty].attempts;
  const attemptsLeft = maxAttempts - wrongGuesses.length;
  const maskedWord = buildMask(wordObj.word, guessedLetters);

  // ── Physical keyboard listener ──────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      const letter = e.key.toLowerCase();
      if (isValidLetter(letter)) {
        guessLetter(letter);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessedLetters, wrongGuesses, gameStatus, wordObj]);

  // ── Core guess action ───────────────────────────────────────────────────────
  const guessLetter = useCallback(
    (letter) => {
      if (gameStatus !== "playing") return;
      if (!isValidLetter(letter)) return;
      if (guessedLetters.has(letter)) return;

      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(letter);
      setGuessedLetters(nextGuessed);

      const wordLower = wordObj.word.toLowerCase();
      const isCorrect = wordLower.includes(letter);

      if (!isCorrect) {
        const nextWrong = [...wrongGuesses, letter];
        setWrongGuesses(nextWrong);

        // trigger shake animation
        setShakingKey(letter);
        if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = setTimeout(() => setShakingKey(null), 400);

        if (isLost(nextWrong.length, maxAttempts)) {
          setGameStatus("lost");
          const data = readStorage();
          const updated = recordLoss(data, wordObj, difficulty, nextWrong.length);
          writeStorage(updated);
          setStats(updated.stats);
        }
      } else {
        if (isWon(wordObj.word, nextGuessed)) {
          setGameStatus("won");
          const data = readStorage();
          const updated = recordWin(data, wordObj, difficulty, wrongGuesses.length);
          writeStorage(updated);
          setStats(updated.stats);
        }
      }
    },
    [gameStatus, guessedLetters, wrongGuesses, wordObj, difficulty, maxAttempts]
  );

  // ── Hint action ─────────────────────────────────────────────────────────────
  const useHint = useCallback(() => {
    if (hintUsed || gameStatus !== "playing") return;
    setHintUsed(true);
    setHintVisible(true);

    // Hint costs one attempt — treat as a wrong guess sentinel
    const nextWrong = [...wrongGuesses, "__hint__"];
    setWrongGuesses(nextWrong);

    if (isLost(nextWrong.length, maxAttempts)) {
      setGameStatus("lost");
      const data = readStorage();
      const updated = recordLoss(data, wordObj, difficulty, nextWrong.length);
      writeStorage(updated);
      setStats(updated.stats);
    }
  }, [hintUsed, gameStatus, wrongGuesses, maxAttempts, wordObj, difficulty]);

  // ── Start a new game ────────────────────────────────────────────────────────
  const newGame = useCallback(
    (newDifficulty) => {
      const diff = newDifficulty || difficulty;
      const nextWord = selectWord(diff, wordObj.word);
      setWordObj(nextWord);
      setGuessedLetters(new Set());
      setWrongGuesses([]);
      setGameStatus("playing");
      setHintUsed(false);
      setHintVisible(false);
      setShakingKey(null);
      // persist preference
      const data = readStorage();
      data.preferences.difficulty = diff;
      writeStorage(data);
    },
    [difficulty, wordObj.word]
  );

  // ── Change difficulty ───────────────────────────────────────────────────────
  const setDifficulty = useCallback(
    (diff) => {
      if (diff === difficulty) return;
      setDifficultyState(diff);
      newGame(diff);
    },
    [difficulty, newGame]
  );

  // wrong guesses count (excluding hint sentinel)
  const realWrongGuesses = wrongGuesses.filter((g) => g !== "__hint__");

  return {
    word:           wordObj.word,
    maskedWord,
    guessedLetters,
    wrongGuesses:   realWrongGuesses,
    attemptsLeft:   maxAttempts - wrongGuesses.length,
    maxAttempts,
    gameStatus,
    difficulty,
    category:       wordObj.category,
    hint:           wordObj.hint,
    hintUsed,
    hintVisible,
    stats,
    shakingKey,
    guessLetter,
    useHint,
    newGame,
    setDifficulty,
  };
}
