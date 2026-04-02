import "../styles/HintPanel.css";

/**
 * Displays the word category, and optionally the hint text.
 * Clicking "Reveal Hint" costs 1 attempt.
 */
export default function HintPanel({ category, hint, hintUsed, hintVisible, gameStatus, useHint }) {
  const disabled = hintUsed || gameStatus !== "playing";

  return (
    <div className="hint-panel card">
      <h3 className="panel-heading">🔍 Hint Panel</h3>

      <div className="hint-category-row">
        <span className="hint-label">Category</span>
        <span className="hint-category-badge">{category}</span>
      </div>

      {hintVisible && (
        <div className="hint-text-box" role="alert" aria-live="polite">
          <span className="hint-icon">💡</span>
          <span>{hint}</span>
        </div>
      )}

      <button
        className="btn-hint"
        onClick={useHint}
        disabled={disabled}
        aria-label={hintUsed ? "Hint already used" : "Reveal hint (costs 1 attempt)"}
      >
        {hintUsed ? "✓ Hint Used" : "💡 Reveal Hint  (−1 attempt)"}
      </button>
    </div>
  );
}
