export const STORAGE_KEY = "hangman_saroj_v1";

export const defaultData = {
  stats: {
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
  },
  history: [],
  preferences: {
    theme: "dark",
    difficulty: "medium",
  },
};

export function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultData);
    const parsed = JSON.parse(raw);
    // merge to ensure all keys exist if schema was updated
    return {
      stats: { ...defaultData.stats, ...parsed.stats },
      history: Array.isArray(parsed.history) ? parsed.history : [],
      preferences: { ...defaultData.preferences, ...parsed.preferences },
    };
  } catch (_) {
    return structuredClone(defaultData);
  }
}

export function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // storage may be unavailable (private mode, quota exceeded)
  }
}

export function recordWin(data, wordObj, difficulty, attemptsUsed) {
  const updated = structuredClone(data);
  updated.stats.wins += 1;
  updated.stats.currentStreak += 1;
  updated.stats.totalGames += 1;
  if (updated.stats.currentStreak > updated.stats.bestStreak) {
    updated.stats.bestStreak = updated.stats.currentStreak;
  }
  updated.history.unshift({
    word: wordObj.word,
    result: "win",
    difficulty,
    attemptsUsed,
    date: new Date().toISOString(),
  });
  if (updated.history.length > 10) updated.history = updated.history.slice(0, 10);
  return updated;
}

export function recordLoss(data, wordObj, difficulty, attemptsUsed) {
  const updated = structuredClone(data);
  updated.stats.losses += 1;
  updated.stats.currentStreak = 0;
  updated.stats.totalGames += 1;
  updated.history.unshift({
    word: wordObj.word,
    result: "loss",
    difficulty,
    attemptsUsed,
    date: new Date().toISOString(),
  });
  if (updated.history.length > 10) updated.history = updated.history.slice(0, 10);
  return updated;
}
