# ⚡ CYBER//BREACH: Cyberpunk Terminal Escape Room

A computer escape room web game built with **HTML5**, **CSS3**, and **Python**. Infiltrate an encrypted mainframe, crack 3 layers of security firewalls using authentic terminal codewords, and escape before time runs out!

---

## 🎮 Game Concept & Features

- **Cyberpunk / Hacking Aesthetics:** Neon cyan & hot pink HUD, glowing terminals, interactive scanlines (CRT shader), responsive digital particle field.
- **Top-Right Escape Stopwatch:** High-precision stopwatch (MM:SS.ms) located in the upper-right corner that boots automatically upon starting and stops when all 3 locks are breached.
- **3 Security Firewalls (Dynamically randomized on each game / reset):**
  1. **Layer 01 - Logic Core:** Binary sequences, quantum boolean logic, Fibonacci recursions, parity puzzles, and Caesar ciphers.
  2. **Layer 02 - Cyber Quiz:** Cybersecurity threats (ransomware, DDoS), TLS/HTTPS protocols, encryption standards (AES-256), ethical hacker classifications.
  3. **Layer 03 - Computer Systems:** Linux command primitives (`pwd`), hexadecimal memory conversion (`0xFF` to 255), SSH port numbers (`22`), bitwise arithmetic (XOR), OSI layer models.
- **Authentic Terminal Panel:** Interactive command-line interface with typing sounds, error buzzers, success chimes, auto-scrolling, command history (<kbd>↑</kbd>/<kbd>↓</kbd>), and <kbd>Tab</kbd> auto-completion.
- **Synthesized Audio:** Built with the Web Audio API — retro computer beeps, keystroke sounds, access granted chimes, and victory fanfare without requiring external audio files.
- **Python Backend & Leaderboard:** Built-in Python HTTP server (`server.py`) with persistent leaderboard JSON storage (`leaderboard.json`) and REST API.

---

## ⌨️ Required Codewords & Terminal Commands

| Codeword | Description | Example Usage |
| :--- | :--- | :--- |
| `help` | Lists all available codewords and mission briefing | `help` |
| `scan` | Performs deep system diagnostic on all 3 locks | `scan` |
| `inspect` | Examines puzzle for the active lock or a specific layer | `inspect 1`, `inspect 2`, `inspect 3` |
| `solve` | Submits bypass answer for the active lock | `solve 16`, `solve https`, `solve 22` |
| `unlock` | Disengages a cracked lock and advances to next layer | `unlock` |
| `reset` | Re-encrypts mainframe with brand new questions and resets timer | `reset` |
| `clear` | Clears the terminal screen buffer | `clear` |
| `hint` | Decrypts an encrypted hint for the target lock | `hint 1`, `hint 2` |
| `status` | Displays mainframe integrity and escape metrics | `status` |

---

## 🚀 How to Run the Game

### Method 1: Using the Python Server (Recommended)
Run the included Python 3 server:

```bash
python3 server.py
```

Then open your browser to:
[http://localhost:8000](http://localhost:8000)

### Method 2: Standalone Browser
Open `index.html` directly in any modern browser (Google Chrome, Safari, Firefox, Edge).

---

## 🛠️ Tech Stack
- **HTML5:** Semantic architecture, accessible forms, HUD structure.
- **Vanilla CSS3:** Custom cyberpunk color variables, glowing neon animations, glassmorphism, responsive grid layout.
- **JavaScript (ES6+):** Game state engine, dynamic question banks, Web Audio synthesizer, command parser.
- **Python 3:** HTTP server (`server.py`) with REST API endpoints (`/api/leaderboard`, `/api/status`) and JSON persistence.
