import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { readStorage, writeStorage } from "../utils/storageUtils.js";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return readStorage().preferences.theme || "dark";
  });

  // Apply theme attribute to <html> on mount and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      const data = readStorage();
      data.preferences.theme = next;
      writeStorage(data);
      return next;
    });
  }, []);

  return (
    <GameContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used inside GameProvider");
  return ctx;
}
