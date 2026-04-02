import "../styles/ScoreBoard.css";

/**
 * Displays wins, losses, current streak, and best streak.
 * The streak badge pulses when streak ≥ 3.
 */
export default function ScoreBoard({ stats }) {
  const { wins, losses, currentStreak, bestStreak } = stats;
  const showStreakBadge = currentStreak >= 3;

  return (
    <div className="scoreboard card">
      <h3 className="panel-heading">📊 Scoreboard</h3>

      <div className="score-grid">
        <div className="score-item score-wins">
          <span className="score-value">{wins}</span>
          <span className="score-label">Wins</span>
        </div>
        <div className="score-item score-losses">
          <span className="score-value">{losses}</span>
          <span className="score-label">Losses</span>
        </div>
        <div className="score-item score-streak">
          <span className="score-value">{currentStreak}</span>
          <span className="score-label">Streak</span>
        </div>
        <div className="score-item score-best">
          <span className="score-value">{bestStreak}</span>
          <span className="score-label">Best</span>
        </div>
      </div>

      {showStreakBadge && (
        <div className="streak-badge pulse" aria-live="polite">
          🔥 {currentStreak} game streak!
        </div>
      )}
    </div>
  );
}
