import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/Header.css";

export default function Header({ stats, theme, toggleTheme, onLogout }) {
  return (
    <header className="header">

      {/* ── Logo ───────────────────────────────────────────────────────────── */}
      <div className="header-logo">
        <span className="logo-dot" aria-hidden="true"></span>
        <span className="logo-text">HANGMAN Game - Saroj DTL</span>
      </div>

      {/* ── Mini stats ─────────────────────────────────────────────────────── */}
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

      {/* ── Right controls: theme toggle + logout ──────────────────────────── */}
      <div className="header-right">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button
          className="btn-logout"
          onClick={onLogout}
          aria-label="Log out"
          title="Log out"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="btn-logout-label">Logout</span>
        </button>
      </div>

    </header>
  );
}