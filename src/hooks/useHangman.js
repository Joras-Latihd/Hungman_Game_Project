import { useState, useEffect, useCallback, useRef } from "react";
import { selectWord } from "../utils/wordSelector.js";
import { buildMask, isWon, isLost, isValidLetter, DIFFICULTY_CONFIG } from "../utils/gameHelpers.js";
import { readStorage, writeStorage, recordWin, recordLoss } from "../utils/storageUtils.js";

export function useHangman() {
  const [difficulty, setDifficultyState] = useState(
    () => readStorage().preferences.difficulty || "medium"
  );

  const [wordObj, setWordObj]               = useState(() => {
    const diff = readStorage().preferences.difficulty || "medium";
    return selectWord(diff);
  });
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses]     = useState([]);
  const [hintUsed, setHintUsed]             = useState(false);
  const [hintVisible, setHintVisible]       = useState(false);
  const [stats, setStats]                   = useState(() => readStorage().stats);
  const [shakingKey, setShakingKey]         = useState(null);

  // gameStarted: true only after player physically guesses or uses hint
  const [gameStarted, setGameStarted]       = useState(false);

  // savedResult prevents recording win/loss twice for the same game
  const savedResult = useRef(false);

  const shakeTimerRef = useRef(null);

  const maxAttempts      = DIFFICULTY_CONFIG[difficulty]?.attempts ?? 6;
  const realWrongGuesses = wrongGuesses.filter((g) => g !== "__hint__");

  // Derive game status purely from state — never stored separately
  // This means it CANNOT be "lost" until wrongGuesses actually has entries
  const won        = gameStarted && isWon(wordObj.word, guessedLetters);
  const lost       = gameStarted && isLost(wrongGuesses.length, maxAttempts);
  const gameStatus = won ? "won" : lost ? "lost" : "playing";

  const maskedWord = buildMask(wordObj.word, guessedLetters);
  const attemptsLeft = maxAttempts - wrongGuesses.length;

  // Record win/loss to storage exactly once per game result
  useEffect(() => {
    if (!gameStarted) return;
    if (savedResult.current) return;
    if (gameStatus === "won") {
      savedResult.current = true;
      const data    = readStorage();
      const updated = recordWin(data, wordObj, difficulty, realWrongGuesses.length);
      writeStorage(updated);
      setStats(updated.stats);
    } else if (gameStatus === "lost") {
      savedResult.current = true;
      const data    = readStorage();
      const updated = recordLoss(data, wordObj, difficulty, wrongGuesses.length);
      writeStorage(updated);
      setStats(updated.stats);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  // ── Physical keyboard listener ─────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      const letter = e.key.toLowerCase();
      if (isValidLetter(letter)) guessLetter(letter);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessedLetters, wrongGuesses, gameStatus, wordObj]);

  // ── Core guess action ──────────────────────────────────────────────────────
  const guessLetter = useCallback(
    (letter) => {
      if (gameStatus !== "playing") return;
      if (!isValidLetter(letter)) return;
      if (guessedLetters.has(letter)) return;

      setGameStarted(true);

      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(letter);
      setGuessedLetters(nextGuessed);

      if (!wordObj.word.toLowerCase().includes(letter)) {
        const nextWrong = [...wrongGuesses, letter];
        setWrongGuesses(nextWrong);
        setShakingKey(letter);
        if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = setTimeout(() => setShakingKey(null), 400);
      }
    },
    [gameStatus, guessedLetters, wrongGuesses, wordObj]
  );

  // ── Hint action ────────────────────────────────────────────────────────────
  const useHint = useCallback(() => {
    if (hintUsed || gameStatus !== "playing") return;
    setGameStarted(true);
    setHintUsed(true);
    setHintVisible(true);
    setWrongGuesses((prev) => [...prev, "__hint__"]);
  }, [hintUsed, gameStatus]);

  // ── Start a new game ───────────────────────────────────────────────────────
  const newGame = useCallback(
    (newDifficulty) => {
      const diff     = newDifficulty || difficulty;
      const nextWord = selectWord(diff, wordObj?.word);
      setWordObj(nextWord);
      setGuessedLetters(new Set());
      setWrongGuesses([]);
      setHintUsed(false);
      setHintVisible(false);
      setShakingKey(null);
      setGameStarted(false);
      savedResult.current = false;
      const data = readStorage();
      data.preferences.difficulty = diff;
      writeStorage(data);
    },
    [difficulty, wordObj?.word]
  );

  // ── Change difficulty ──────────────────────────────────────────────────────
  const setDifficulty = useCallback(
    (diff) => {
      if (diff === difficulty) return;
      setDifficultyState(diff);
      newGame(diff);
    },
    [difficulty, newGame]
  );

  return {
    word:          wordObj.word,
    maskedWord,
    guessedLetters,
    wrongGuesses:  realWrongGuesses,
    attemptsLeft,
    maxAttempts,
    gameStatus,
    gameStarted,
    difficulty,
    category:      wordObj.category,
    hint:          wordObj.hint,
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