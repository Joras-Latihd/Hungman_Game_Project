import "./styles/global.css";
import "./styles/App.css";

import Header            from "./components/Header.jsx";
import HangmanCanvas     from "./components/HangmanCanvas.jsx";
import WordDisplay       from "./components/WordDisplay.jsx";
import Keyboard          from "./components/Keyboard.jsx";
import HintPanel         from "./components/HintPanel.jsx";
import ScoreBoard        from "./components/ScoreBoard.jsx";
import GameStatusModal   from "./components/GameStatusModal.jsx";
import DifficultySelector from "./components/DifficultySelector.jsx";

import { useHangman }    from "./hooks/useHangman.js";
import { useGameContext } from "./context/GameContext.jsx";

export default function App() {
  const { theme, toggleTheme } = useGameContext();

  const {
    word,
    maskedWord,
    guessedLetters,
    wrongGuesses,
    attemptsLeft,
    maxAttempts,
    gameStatus,
    difficulty,
    category,
    hint,
    hintUsed,
    hintVisible,
    stats,
    shakingKey,
    guessLetter,
    useHint,
    newGame,
    setDifficulty,
  } = useHangman();

  // Number of wrong guesses (excluding hint sentinel already filtered in hook)
  const wrongCount = wrongGuesses.length;

  return (
    <div className="app" data-theme={theme}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Header stats={stats} theme={theme} toggleTheme={toggleTheme} />

      {/* ── Main game area ──────────────────────────────────────────────────── */}
      <main className="game-layout">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <HangmanCanvas wrongCount={wrongCount} gameStatus={gameStatus} />
          <HintPanel
            category={category}
            hint={hint}
            hintUsed={hintUsed}
            hintVisible={hintVisible}
            gameStatus={gameStatus}
            useHint={useHint}
          />
          <ScoreBoard stats={stats} />
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
          <WordDisplay
            maskedWord={maskedWord}
            attemptsLeft={attemptsLeft}
            maxAttempts={maxAttempts}
          />
          <Keyboard
            guessedLetters={guessedLetters}
            wrongGuesses={wrongGuesses}
            gameStatus={gameStatus}
            guessLetter={guessLetter}
            shakingKey={shakingKey}
          />
          <button
            className="btn-new-game"
            onClick={() => newGame()}
            aria-label="Start a new game with a different word"
          >
            ↺ New Word
          </button>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="app-footer">
        Built by{" "}
        <a
          href="https://saroj-portfolio-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Saroj Dhital
        </a>
        {" · "}
        <a
          href="https://saroj-portfolio-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          saroj-portfolio-website.vercel.app
        </a>
      </footer>

      {/* ── Win / Lose Modal ─────────────────────────────────────────────────── */}
      {gameStatus !== "playing" && (
        <GameStatusModal
          gameStatus={gameStatus}
          word={word}
          stats={stats}
          newGame={newGame}
          setDifficulty={setDifficulty}
          difficulty={difficulty}
        />
      )}
    </div>
  );
}
