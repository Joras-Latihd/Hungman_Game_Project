import Header             from "./Header.jsx";
import HangmanCanvas      from "./HangmanCanvas.jsx";
import WordDisplay        from "./WordDisplay.jsx";
import Keyboard           from "./Keyboard.jsx";
import HintPanel          from "./HintPanel.jsx";
import ScoreBoard         from "./ScoreBoard.jsx";
import GameStatusModal    from "./GameStatusModal.jsx";
import DifficultySelector from "./DifficultySelector.jsx";

import { useHangman }     from "../hooks/useHangman.js";
import { useGameContext } from "../context/GameContext.jsx";

export default function Game({ onLogout }) {
  const { theme, toggleTheme } = useGameContext();

  const {
    word,
    maskedWord,
    guessedLetters,
    wrongGuesses,
    attemptsLeft,
    maxAttempts,
    gameStatus,
    gameStarted,
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

  const wrongCount = wrongGuesses.length;

  return (
    <div className="app" data-theme={theme}>
      <Header
        stats={stats}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={onLogout}
      />

      <main className="game-layout">
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

      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-dev">
            <span className="footer-label">About the Developer</span>
            <p className="footer-bio">
              BCSIT student &amp; Frontend Developer based in Kathmandu, Nepal.
              Building practical web apps with JavaScript, React, Next.js &amp; PHP.
            </p>
          </div>
          <div className="footer-links">
            <a href="https://saroj-portfolio-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="footer-link-icon">🌐</span>Portfolio
            </a>
            <a href="https://github.com/Joras-Latihd" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="footer-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </span>GitHub
            </a>
            <a href="https://www.linkedin.com/in/sarojdhital71/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span className="footer-link-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>LinkedIn
            </a>
            <a href="mailto:sarojdhital71@gmail.com" className="footer-link">
              <span className="footer-link-icon">✉</span>Email
            </a>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Saroj Dhital</span>
            <span className="footer-dot">·</span>
            <span>Hangman Game Project</span>
          </div>
        </div>
      </footer>

      {/* Only show modal after player has made at least one guess */}
      {gameStarted && gameStatus !== "playing" && (
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