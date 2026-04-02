import "../styles/WordDisplay.css";

/**
 * Renders the secret word as blank slots with smooth reveal animations.
 * Spaces create a visible gap between words.
 */
export default function WordDisplay({ maskedWord, attemptsLeft, maxAttempts }) {
  return (
    <div className="word-display-section">
      <div className="word-slots" aria-label="Word to guess">
        {maskedWord.map((char, i) => {
          if (char === " ") {
            return <div key={i} className="letter-spacer" aria-hidden="true" />;
          }
          const revealed = char !== "_";
          return (
            <div key={i} className="letter-slot">
              <span
                className={`letter-char${revealed ? " revealed" : ""}`}
                aria-label={revealed ? `Letter ${char}` : "Hidden letter"}
              >
                {revealed ? char.toUpperCase() : ""}
              </span>
              <span className="letter-underline" />
            </div>
          );
        })}
      </div>

      <div className="attempts-info" aria-live="polite">
        <span className="attempts-label">Attempts left:</span>
        <span className="attempts-count">{attemptsLeft}</span>
        <span className="attempts-sep">/</span>
        <span className="attempts-max">{maxAttempts}</span>
        <div className="attempts-pips" aria-hidden="true">
          {Array.from({ length: maxAttempts }).map((_, i) => (
            <span
              key={i}
              className={`pip${i >= attemptsLeft ? " pip-used" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
