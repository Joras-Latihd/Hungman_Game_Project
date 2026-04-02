import "../styles/Modal.css";

const CONFETTI_COLORS = [
  "#00e5ff", "#00ffb2", "#ffd166", "#ff4d6d",
  "#c084fc", "#ffffff", "#38bdf8", "#fb923c",
];

function ConfettiBurst() {
  return (
    <div className="confetti-wrap" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left   = `${(i * 4.8 + 3) % 96}%`;
        const delay  = `${(i * 0.065).toFixed(2)}s`;
        const dur    = `${(1.1 + (i % 4) * 0.25).toFixed(2)}s`;
        const size   = `${6 + (i % 3) * 3}px`;
        return (
          <span
            key={i}
            className="confetti-dot"
            style={{
              background: color,
              left,
              width: size,
              height: size,
              animationDelay: delay,
              animationDuration: dur,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Win / Game-Over modal.
 * Shown automatically when gameStatus !== 'playing'.
 */
export default function GameStatusModal({ gameStatus, word, stats, newGame, setDifficulty, difficulty }) {
  const won = gameStatus === "won";

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) newGame();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={won ? "You won!" : "Game over"}
      onClick={handleBackdropClick}
    >
      <div className="modal">
        {won && <ConfettiBurst />}

        <div className="modal-emoji" aria-hidden="true">
          {won ? "🎉" : "💀"}
        </div>

        <h2 className={`modal-title ${won ? "win" : "lose"}`}>
          {won ? "You Won!" : "Game Over"}
        </h2>

        <p className="modal-sub">
          {won ? "You guessed it! The word was:" : "The word was:"}
        </p>

        <div className="modal-word">
          <span>{word.toUpperCase()}</span>
        </div>

        {won && stats.currentStreak >= 1 && (
          <p className="modal-streak">
            🔥 Win Streak: {stats.currentStreak}
          </p>
        )}

        {!won && (
          <p className="modal-encouragement">
            Don't give up — try again!
          </p>
        )}

        <div className="modal-btns">
          <button
            className={`btn-primary ${won ? "btn-win" : "btn-try"}`}
            onClick={() => newGame()}
            aria-label={won ? "Play again" : "Try again"}
          >
            {won ? "Play Again 🎮" : "Try Again 💪"}
          </button>

          <button
            className="btn-secondary"
            onClick={() => {
              const diffs = ["easy", "medium", "hard"];
              const next = diffs[(diffs.indexOf(difficulty) + 1) % 3];
              setDifficulty(next);
            }}
            aria-label="Change difficulty"
          >
            Change Difficulty
          </button>
        </div>
      </div>
    </div>
  );
}
