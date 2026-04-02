import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/Header.css";

/**
 * Sticky top bar — game logo, mini stats, and theme toggle.
 */
export default function Header({ stats, theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-dot" aria-hidden="true">⚫</span>
        <span className="logo-text">HANGMAN</span>
      </div>

      <div className="header-center" aria-label="Quick stats">
        <div className="mini-stat">
          <strong className="mini-value wins">{stats.wins}</strong>
          <span className="mini-label">Wins</span>
        </div>
        <div className="mini-stat">
          <strong className="mini-value losses">{stats.losses}</strong>
          <span className="mini-label">Losses</span>
        </div>
        <div className="mini-stat">
          <strong className="mini-value streak">{stats.currentStreak}</strong>
          <span className="mini-label">Streak</span>
        </div>
      </div>

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
}
