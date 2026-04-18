import { useState } from "react";
import "./styles/global.css";
import "./styles/App.css";

import Login   from "./components/Login.jsx";
import Game    from "./components/Game.jsx";

const STORAGE_KEY = "hangman_saroj_v1";

function getInitialLogin() {
  try {
    return sessionStorage.getItem("hangman_logged_in") === "true";
  } catch {
    return false;
  }
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(getInitialLogin);

  function handleLogin() {
    // Preserve stats + history + preferences but wipe nothing —
    // useHangman initializes cleanly because Game only mounts here,
    // AFTER this function runs. No stale game state can exist.
    sessionStorage.setItem("hangman_logged_in", "true");
    setLoggedIn(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("hangman_logged_in");
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Game onLogout={handleLogout} />;
}