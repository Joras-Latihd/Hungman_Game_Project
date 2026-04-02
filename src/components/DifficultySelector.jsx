import "../styles/DifficultySelector.css";
import { DIFFICULTY_CONFIG } from "../utils/gameHelpers.js";

/**
 * Segmented control to pick Easy / Medium / Hard.
 * Switching difficulty immediately starts a new game.
 */
export default function DifficultySelector({ difficulty, setDifficulty }) {
  const levels = ["easy", "medium", "hard"];

  return (
    <div className="difficulty-selector card">
      <h3 className="panel-heading">⚙️ Difficulty</h3>
      <div className="diff-buttons" role="group" aria-label="Select difficulty">
        {levels.map((level) => {
          const cfg = DIFFICULTY_CONFIG[level];
          const active = difficulty === level;
          return (
            <button
              key={level}
              className={`btn-diff ${level}${active ? " active" : ""}`}
              onClick={() => setDifficulty(level)}
              aria-pressed={active}
              aria-label={`${cfg.label} difficulty — ${cfg.description}, ${cfg.attempts} attempts`}
            >
              <span className="diff-label">{cfg.label}</span>
              <span className="diff-desc">{cfg.description}</span>
              <span className="diff-attempts">{cfg.attempts} attempts</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
