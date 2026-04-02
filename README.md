# 🪢 Hangman Game

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Persisted-00e5ff?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-00ffb2?style=flat-square)

A production-grade, fully animated Hangman Game built from scratch with **React 18 + Vite** — no game libraries, pure component architecture, and a refined dark-arcade aesthetic.

> **Live Demo:** _[Add your deployed URL here]_

---

## ✨ Features

- 🔤 **Word Guessing Engine** — 200+ curated words across 7 categories (Animals, Countries, Technology, Movies, Sports, Food, Science), filtered by difficulty
- 🎨 **Animated SVG Hangman** — 8 body parts drawn progressively with `stroke-dashoffset` animation; shakes on game over
- ⌨️ **Dual-Input Keyboard** — on-screen A–Z keyboard + physical keyboard (keydown) fully supported, with colour-coded states
- 🎯 **Difficulty Levels** — Easy (8 attempts), Medium (6 attempts), Hard (4 attempts)
- 💡 **Hint System** — one hint per round reveals a clue at the cost of 1 attempt
- 📊 **Score & Streak Tracking** — wins, losses, current streak, best streak — all persisted to `localStorage`
- 🏆 **Win / Game-Over Modals** — animated modals with CSS confetti burst on win
- 🌗 **Light / Dark Theme** — full CSS variable system, toggled and persisted
- 📱 **Fully Responsive** — mobile (320px), tablet (768px), desktop (1200px)
- ♿ **Accessible** — ARIA labels, keyboard navigation, focus rings, colour + text indicators

---

## 📁 Folder Structure

```
hangman-game/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── words.js               # 200+ word bank with categories
│   ├── components/
│   │   ├── HangmanCanvas.jsx      # SVG animated hangman drawing
│   │   ├── WordDisplay.jsx        # Hidden word with blank slots & reveal
│   │   ├── Keyboard.jsx           # A–Z on-screen keyboard, colour-coded
│   │   ├── HintPanel.jsx          # Category + hint reveal button
│   │   ├── ScoreBoard.jsx         # Wins, losses, streak from localStorage
│   │   ├── GameStatusModal.jsx    # Win 🎉 / Game Over 💀 modal
│   │   ├── DifficultySelector.jsx # Easy / Medium / Hard segmented control
│   │   ├── ThemeToggle.jsx        # Light / Dark mode button
│   │   └── Header.jsx             # Logo + mini stats + theme toggle
│   ├── hooks/
│   │   ├── useHangman.js          # Core game logic hook
│   │   └── useLocalStorage.js     # Persistent state hook
│   ├── context/
│   │   └── GameContext.jsx        # Theme context (global)
│   ├── utils/
│   │   ├── wordSelector.js        # Random word picker by difficulty
│   │   ├── gameHelpers.js         # Win/loss checkers, mask builder
│   │   └── storageUtils.js        # localStorage read/write/record
│   ├── styles/
│   │   ├── global.css             # CSS reset, fonts, shared tokens
│   │   ├── themes.css             # Light + Dark CSS variable definitions
│   │   ├── App.css                # Layout grid, footer, responsive
│   │   ├── HangmanCanvas.css      # SVG stroke animations
│   │   ├── Keyboard.css           # Key states and shake animation
│   │   ├── Modal.css              # Win/lose modal with confetti
│   │   ├── WordDisplay.css        # Slot reveal animation
│   │   ├── HintPanel.css          # Hint button and badge
│   │   ├── ScoreBoard.css         # Stats grid and streak pulse
│   │   ├── DifficultySelector.css # Segmented control styling
│   │   ├── Header.css             # Sticky header layout
│   │   └── ThemeToggle.css        # Sun/moon toggle button
│   ├── App.jsx                    # Root component
│   └── main.jsx                   # React entry point
├── .env                           # Vite env vars
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
# 1. Clone or unzip the project
cd hangman-game

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Opens at http://localhost:3000
```

### Build for Production

```bash
npm run build
# Output goes to /dist — ready to deploy on Vercel, Netlify, GitHub Pages, etc.
```

### Preview Production Build

```bash
npm run preview
```

---

## 🗃️ localStorage Schema

All game data is stored under the key `hangman_saroj_v1`:

```json
{
  "stats": {
    "wins": 0,
    "losses": 0,
    "currentStreak": 0,
    "bestStreak": 0,
    "totalGames": 0
  },
  "history": [
    {
      "word": "elephant",
      "result": "win",
      "difficulty": "medium",
      "attemptsUsed": 3,
      "date": "2024-04-02T10:23:00Z"
    }
  ],
  "preferences": {
    "theme": "dark",
    "difficulty": "medium"
  }
}
```

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Plain CSS + CSS Variables | Styling & theming (no Tailwind) |
| localStorage | Score & preference persistence |
| Google Fonts (Syne + DM Mono) | Typography |
| SVG | Hand-crafted hangman illustration |

---

## 📸 Screenshots

> _Add screenshots of the dark theme, light theme, and win/lose modals here._

---

## 🙌 Built by Saroj Dhital

This project was designed and developed by **Saroj Dhital**.

- 🌐 Portfolio: [saroj-portfolio-website.vercel.app](https://saroj-portfolio-website.vercel.app/)
- Feel free to **fork**, **star**, and **customize**!

---

## 📄 License

MIT — free to use, modify, and distribute.
