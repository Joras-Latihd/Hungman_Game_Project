import "../styles/Keyboard.css";

const ROWS = [
  ["a","b","c","d","e","f","g","h","i","j"],
  ["k","l","m","n","o","p","q","r","s","t"],
  ["u","v","w","x","y","z"],
];

/**
 * On-screen A–Z keyboard with colour-coded states.
 * Correct = green, Wrong = red/strikethrough, Disabled after game ends.
 */
export default function Keyboard({ guessedLetters, wrongGuesses, gameStatus, guessLetter, shakingKey }) {
  const wrongSet = new Set(wrongGuesses);
  const disabled = gameStatus !== "playing";

  const getKeyClass = (letter) => {
    if (wrongSet.has(letter)) return "key-btn wrong";
    if (guessedLetters.has(letter)) return "key-btn correct";
    return "key-btn";
  };

  const handleClick = (letter) => {
    if (!disabled && !guessedLetters.has(letter) && !wrongSet.has(letter)) {
      guessLetter(letter);
    }
  };

  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {ROWS.map((row, ri) => (
        <div key={ri} className="key-row">
          {row.map((letter) => {
            const alreadyGuessed = guessedLetters.has(letter) || wrongSet.has(letter);
            const isShaking = shakingKey === letter;
            return (
              <button
                key={letter}
                className={`${getKeyClass(letter)}${isShaking ? " shake-key" : ""}`}
                onClick={() => handleClick(letter)}
                disabled={disabled || alreadyGuessed}
                aria-label={`Guess letter ${letter.toUpperCase()}`}
                aria-pressed={alreadyGuessed}
              >
                {letter.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
