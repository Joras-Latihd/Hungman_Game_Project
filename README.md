# 🪢 Hangman Game - Saroj Dhital

A feature-rich and responsive **Hangman Word Game** built by **SAROJ DHITAL** using **React.js** and deployed on Vercel.

🔗 Live Demo:
https://saroj-hungman-game.vercel.app/

This application challenges players to guess hidden words across 3 difficulty modes, complete with hints, a scoring system, streak tracking, and a full dark/light amber arcade aesthetic.

---

## 🛠 Languages & Technologies Used

### 💻 Languages

- JavaScript (ES6+)
- HTML5
- CSS3

### ⚙️ Technologies & Tools

- React.js (Component-based UI)
- React Hooks (useState, useEffect, useContext)
- Vite (Build tool & dev server)
- Node.js (Development environment)
- npm (Package manager)
- localStorage (Score & streak persistence)
- Google Fonts (Bebas Neue, Barlow Condensed)
- Vercel (Deployment)

---

## 📷 Screenshots

### Dark Mode
![Dark](https://github.com/Joras-Latihd/Hungman_Game_Project/blob/823c3a57b45d7bfb1bb48edcdf07e7f50a5019bf/Dark%20Mode.png)

### Light Mode
![Light](https://github.com/Joras-Latihd/Hungman_Game_Project/blob/823c3a57b45d7bfb1bb48edcdf07e7f50a5019bf/Light%20Mode.png)

### During Gameplay
![Gameplay](https://github.com/Joras-Latihd/Hungman_Game_Project/blob/823c3a57b45d7bfb1bb48edcdf07e7f50a5019bf/During%20Gameplay.png)


---

## 🚀 Core Features

### ✅ Word Database

- Categorised word pool across multiple themes
- Words filtered by difficulty - Easy (4–5 letters), Medium (6–8 letters), Hard (9+ letters)
- Random word selection every new game

### ✅ 3 Difficulty Modes

- 🟢 **Easy** - 4–5 letter words, 8 attempts
- 🟡 **Medium** - 6–8 letter words, 6 attempts
- 🔴 **Hard** - 9+ letter words, 4 attempts

### ✅ Hint System

- One hint available per round (costs 1 attempt)
- Category label shown for every word
- Hint text revealed on request

### ✅ Scoreboard & Streak Tracking

- Wins, losses, current streak and best streak tracked
- Persistent across sessions via localStorage
- Streak badge pulses when on a winning run

### ✅ Animated Hangman Canvas

- SVG-based hangman figure drawn progressively per wrong guess
- Shake animation on each incorrect letter
- Win celebration triggered on correct completion

### ✅ Interactive Keyboard

- Full A–Z on-screen keyboard
- Keys colour-coded - correct (green), wrong (red), unused (default)
- 3D press-down animation on click
- Physical keyboard input also supported

### ✅ Win / Lose Modal

- Animated modal on game end showing result, the correct word, and current streak
- Confetti effect on win
- Quick restart and difficulty change from modal

### ✅ Dark / Light Theme Toggle

- Amber arcade dark mode (default)
- Clean white light mode with full contrast
- Theme persists via context

### ✅ Responsive Design

- Works on desktop, tablet and mobile
- Dark amber arcade aesthetic with glassmorphism cards, 3D shadows, and glowing accents

---

## 📘 How It Works

1. Open the application.
2. Select a difficulty - Easy, Medium or Hard.
3. Guess the hidden word one letter at a time using the on-screen keyboard or your physical keyboard.
4. Use the hint wisely - it costs one attempt.
5. Complete the word before the hangman is fully drawn.
6. See your result in the modal and track your streak on the scoreboard.
7. Start a new word and keep your streak alive.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Joras-Latihd/Hungman_Game_Project.git

# Navigate into the project
cd Hungman_Game_Project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

---

## 👨‍💻 Author

**Saroj Dhital**
BCSIT Student & Frontend Developer.

| Platform  | Link |
|-----------|------|
| 🌐 Portfolio | [saroj-portfolio-website.vercel.app](https://saroj-portfolio-website.vercel.app/) |
| 💼 LinkedIn | [linkedin.com/in/sarojdhital71](https://www.linkedin.com/in/sarojdhital71/) |
| 🐙 GitHub | [github.com/Joras-Latihd](https://github.com/Joras-Latihd) |
| ✉️ Email | sarojdhital71@gmail.com |

---

## ⭐ Support

If you found this project useful:

- ⭐ Star this repository
- 🔗 Share it with others
