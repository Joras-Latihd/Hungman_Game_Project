import { useState } from "react";
import "../styles/Login.css";

const CORRECT_NAME     = "SarojDTL";
const CORRECT_PASSWORD = "TimetoPlay";

export default function Login({ onLogin }) {
  const [name, setName]         = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [shaking, setShaking]   = useState(false);
  const [loading, setLoading]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (name === CORRECT_NAME && password === CORRECT_PASSWORD) {
      setLoading(true);
      setTimeout(() => onLogin(), 900);
    } else {
      setError(
        name !== CORRECT_NAME
          ? "Unknown player name."
          : "Wrong password. Try again."
      );
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <div className="login-backdrop">
      <div className="login-scanlines" aria-hidden="true" />
      <div className="login-orb login-orb-1" aria-hidden="true" />
      <div className="login-orb login-orb-2" aria-hidden="true" />

      <div className={`login-card ${shaking ? "login-shake" : ""} ${loading ? "login-entering" : ""}`}>
        <div className="login-card-shimmer" aria-hidden="true" />

        <div className="login-header">
          <div className="login-dot" aria-hidden="true" />
          <h1 className="login-title">HANGMAN</h1>
          <p className="login-subtitle">Enter your credentials to play</p>
        </div>

        <div className="login-divider" aria-hidden="true">
          <span />
          <span className="login-divider-text">PLAYER ACCESS</span>
          <span />
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <div className="login-field">
            <label className="login-label" htmlFor="login-name">Player Name</label>
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                id="login-name"
                className="login-input"
                type="text"
                placeholder="Enter player name"
                value={name}
                onChange={e => { setName(e.target.value); setError(""); }}
                autoComplete="username"
                autoFocus
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="login-password"
                className="login-input"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            className={`login-btn ${loading ? "login-btn-loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner" aria-hidden="true" />
                ENTERING GAME...
              </>
            ) : (
              "PLAY NOW →"
            )}
          </button>
        </form>

        <p className="login-hint">
          Hint — Name: <strong>SarojDTL</strong> · Password: <strong>TimetoPlay</strong>
        </p>
      </div>
    </div>
  );
}