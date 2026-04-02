import "../styles/HangmanCanvas.css";

/**
 * SVG Hangman — draws each body part progressively.
 * All coordinates are hand-crafted for a 260×220 viewBox.
 * Each part animates in via stroke-dashoffset on the `.visible` class.
 */
export default function HangmanCanvas({ wrongCount, gameStatus }) {
  const lost = gameStatus === "lost";
  const won  = gameStatus === "won";

  const partClass = (step) =>
    `hangman-part${wrongCount >= step ? " visible" : ""}`;

  return (
    <div className={`canvas-wrapper${lost ? " shake-canvas" : ""}`}>
      <svg
        viewBox="0 0 260 220"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Hangman drawing with ${wrongCount} wrong guesses`}
        className="hangman-svg"
      >
        {/* ── Gallows ── */}
        {/* Ground */}
        <line className="gallows" x1="10"  y1="210" x2="250" y2="210" />
        {/* Vertical pole */}
        <line className="gallows" x1="55"  y1="210" x2="55"  y2="10"  />
        {/* Top beam */}
        <line className="gallows" x1="55"  y1="10"  x2="140" y2="10"  />
        {/* Noose drop */}
        <line className="gallows" x1="140" y1="10"  x2="140" y2="38"  />
        {/* Brace */}
        <line className="gallows brace" x1="55" y1="40" x2="90" y2="10" />

        {/* ── Body parts (drawn on wrong guess) ── */}
        {/* 1 — Head */}
        <circle
          className={partClass(1) + " head"}
          cx="140" cy="58" r="20"
        />
        {/* 2 — Body / torso */}
        <line className={partClass(2)} x1="140" y1="78" x2="140" y2="140" />
        {/* 3 — Left arm */}
        <line className={partClass(3)} x1="140" y1="95" x2="108" y2="122" />
        {/* 4 — Right arm */}
        <line className={partClass(4)} x1="140" y1="95" x2="172" y2="122" />
        {/* 5 — Left leg */}
        <line className={partClass(5)} x1="140" y1="140" x2="108" y2="178" />
        {/* 6 — Right leg */}
        <line className={partClass(6)} x1="140" y1="140" x2="172" y2="178" />
        {/* 7 — Left foot */}
        <line className={partClass(7)} x1="108" y1="178" x2="88"  y2="172" />
        {/* 8 — Right foot */}
        <line className={partClass(8)} x1="172" y1="178" x2="192" y2="172" />
      </svg>

      {won && (
        <div className="win-celebration" aria-hidden="true">
          🎉
        </div>
      )}
    </div>
  );
}
