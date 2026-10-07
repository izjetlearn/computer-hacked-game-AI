/**
 * CYBER//BREACH: Cyberpunk Terminal Escape Room Engine
 * Logic, Sound Synthesizer, Question Bank, Terminal Shell, Stopwatch & Leaderboard
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. QUESTION POOLS (Changes dynamically each game)
  // =========================================================================

  const QUESTION_POOLS = {
    // LOCK 1: LOGIC QUESTIONS
    lock1: [
      {
        id: 'L1_BIN_SEQ',
        category: 'Logic Sequence',
        title: 'Binary Exponentiation Flux',
        clue: 'Decode the next value in the binary bit-shift sequence:\n\n  00000001 (1) -> 00000010 (2) -> 00000100 (4) -> 00001000 (8) -> ???\n\nSubmit the decimal OR 8-bit binary value for the next node.',
        answers: ['16', '00010000', '00010000b'],
        hint: 'Each step shifts the bit left by 1 (powers of 2: 2^4 = 16).',
        explanation: 'Bit shifted left to position 4: decimal 16.'
      },
      {
        id: 'L1_CAESAR',
        category: 'Logic Cipher',
        title: 'Cyber Caesar ROT-3 Decryptor',
        clue: 'An intercepted transmission is shifted forward by 3 letters (A->D, B->E):\n\n  CIPHERTEXT: [ KDFN WKH SODQHW ]\n\nDecode the 3-word phrase to bypass this firewall.',
        answers: ['hack the planet', 'hacktheplanet'],
        hint: 'Shift each letter backward by 3. K->H, D->A, F->C...',
        explanation: 'ROT-3 decoded: "HACK THE PLANET" - a netrunner classic.'
      },
      {
        id: 'L1_BOOLEAN',
        category: 'Boolean Logic',
        title: 'Quantum Logic Gate Evaluation',
        clue: 'Evaluate the resulting boolean signal of this security gate:\n\n  (TRUE AND FALSE) OR (NOT (FALSE OR FALSE))\n\nDoes the gate evaluate to TRUE or FALSE?',
        answers: ['true', '1', 't'],
        hint: '(TRUE AND FALSE) is FALSE. (FALSE OR FALSE) is FALSE, so NOT(FALSE) is TRUE. FALSE OR TRUE = ?',
        explanation: 'Boolean logic resolves to TRUE (1).'
      },
      {
        id: 'L1_FIBONACCI',
        category: 'Logic Sequence',
        title: 'Recursion Pulse Matrix',
        clue: 'Identify the next key in the cryptographic growth curve:\n\n  1, 2, 3, 5, 8, 13, 21, ???\n\nCalculate the missing integer.',
        answers: ['34'],
        hint: 'Fibonacci sequence: each number is the sum of the two preceding numbers (13 + 21).',
        explanation: 'Fibonacci sequence sum: 13 + 21 = 34.'
      },
      {
        id: 'L1_PARITY',
        category: 'Logic Puzzle',
        title: 'Odd-One-Out Node Isolation',
        clue: 'Four security port checksums are logged. Exactly one contains corrupted parity:\n\n  [A: 12]   [B: 24]   [C: 35]   [D: 48]\n\nWhich port letter is NOT an even number? (Enter the letter)',
        answers: ['c', 'port c', '35'],
        hint: 'Look for the odd number among 12, 24, 35, 48.',
        explanation: 'Port C (35) has odd parity, breaking the symmetric encryption.'
      }
    ],

    // LOCK 2: QUIZ QUESTIONS (Cybersecurity, tech concepts, cyber culture)
    lock2: [
      {
        id: 'L2_MALWARE',
        category: 'Cyber Quiz',
        title: 'Threat Taxonomy Diagnostic',
        clue: 'QUIZ QUESTION:\nWhat type of malicious payload encrypts victim files and demands extortion payment for the decryption key?',
        answers: ['ransomware', 'ransom-ware', 'ransom ware'],
        hint: 'Combines the words "ransom" and "software".',
        explanation: 'Ransomware threat vector neutralized.'
      },
      {
        id: 'L2_PROTOCOL',
        category: 'Cyber Quiz',
        title: 'Secure Transmission Standard',
        clue: 'QUIZ QUESTION:\nWhich secure web protocol uses TLS/SSL over port 443 to encrypt HTTP traffic between browser and server?',
        answers: ['https', 'https protocol', 'ssl/tls'],
        hint: 'HTTP with an extra "S" at the end for Secure.',
        explanation: 'HTTPS protocol verified and handshake authenticated.'
      },
      {
        id: 'L2_DDOS',
        category: 'Cyber Quiz',
        title: 'Network Attack Vector',
        clue: 'QUIZ QUESTION:\nIn cyber warfare, what does the "DDoS" acronym stand for?\n(Answer with the full 4-word term, or just the missing word from "Distributed Denial of ______")',
        answers: [
          'distributed denial of service',
          'distributed denial-of-service',
          'service',
          'ddos'
        ],
        hint: 'Distributed Denial of ________.',
        explanation: 'Distributed Denial of Service flood signature mitigated.'
      },
      {
        id: 'L2_HACKER_ETHICS',
        category: 'Cyber Quiz',
        title: 'Security Operator Classification',
        clue: 'QUIZ QUESTION:\nWhat 2-word term describes an ethical security researcher who finds and reports vulnerabilities to help organizations defend themselves?',
        answers: ['white hat', 'whitehat', 'white hat hacker', 'ethical hacker'],
        hint: 'The opposite of a malicious "black hat" hacker.',
        explanation: 'White Hat credential validated.'
      },
      {
        id: 'L2_ENCRYPTION',
        category: 'Cyber Quiz',
        title: 'Symmetric Cipher Standard',
        clue: 'QUIZ QUESTION:\nWhat 3-letter acronym denotes the Advanced Encryption Standard widely used globally with 128, 192, and 256-bit keys?',
        answers: ['aes', 'a.e.s.'],
        hint: 'Stands for "Advanced Encryption Standard".',
        explanation: 'AES-256 cipher deciphered.'
      }
    ],

    // LOCK 3: COMPUTER & TECHNICAL QUESTIONS
    lock3: [
      {
        id: 'L3_HEX',
        category: 'Computer Systems',
        title: 'Hexadecimal Core Memory Address',
        clue: 'Convert the following 1-byte hexadecimal memory address into its decimal equivalent:\n\n  0xFF = ???\n\nEnter the decimal integer (0 to 255).',
        answers: ['255'],
        hint: 'In hex: 15 * 16 + 15 = 255.',
        explanation: 'Hex byte 0xFF converts directly to decimal 255.'
      },
      {
        id: 'L3_LINUX_PWD',
        category: 'Computer Systems',
        title: 'Unix Navigation Primitive',
        clue: 'What standard 3-letter Unix/Linux shell command prints the full path of the Current Working Directory?',
        answers: ['pwd', 'print working directory'],
        hint: 'Stands for "Print Working Directory".',
        explanation: '`pwd` command verified: /sys/security/escape_vault'
      },
      {
        id: 'L3_SSH_PORT',
        category: 'Computer Systems',
        title: 'Remote Shell Port Beacon',
        clue: 'What is the default IANA registered TCP port number for SSH (Secure Shell) remote connections?',
        answers: ['22', 'port 22'],
        hint: 'One more than FTP (21).',
        explanation: 'SSH Port 22 terminal link established.'
      },
      {
        id: 'L3_XOR',
        category: 'Computer Systems',
        title: 'Bitwise Logic Arithmetic',
        clue: 'In binary computer arithmetic, what is the output of the bitwise XOR operation:\n\n  1 XOR 1 = ???\n\n(Enter 0 or 1)',
        answers: ['0', 'zero', 'false'],
        hint: 'Exclusive OR yields 1 only when the inputs differ. Same inputs yield 0.',
        explanation: '1 XOR 1 = 0. Bitwise parity matched.'
      },
      {
        id: 'L3_OSI',
        category: 'Computer Systems',
        title: 'OSI Network Layer Topology',
        clue: 'Which layer number of the 7-layer OSI model handles logical addressing (IP) and packet routing?\n(Enter the layer number 1-7 or the layer name)',
        answers: ['3', 'layer 3', 'network', 'network layer'],
        hint: 'Layer 1: Physical, Layer 2: Data Link, Layer 3: _______?',
        explanation: 'Layer 3 (Network Layer) route discovered.'
      }
    ]
  };

  // =========================================================================
  // 2. AUDIO SYNTHESIZER (Web Audio API - No external asset requirements)
  // =========================================================================

  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playKeyClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    }

    playBeep(freq = 600, duration = 0.08, type = 'sine') {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    playErrorBuzz() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.22);
    }

    playSuccessChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    }

    playVictoryFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const chords = [
        { f: 523.25, t: 0.0, d: 0.2 },
        { f: 659.25, t: 0.15, d: 0.2 },
        { f: 783.99, t: 0.3, d: 0.2 },
        { f: 1046.50, t: 0.45, d: 0.6 },
        { f: 1318.51, t: 0.65, d: 0.8 }
      ];
      chords.forEach(c => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + c.t;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(c.f, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + c.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + c.d);
      });
    }
  }

  // =========================================================================
  // 3. STOPWATCH COMPONENT (Top Right Corner)
  // =========================================================================

  class Stopwatch {
    constructor(displayEl, subtextEl, dotEl) {
      this.displayEl = displayEl;
      this.subtextEl = subtextEl;
      this.dotEl = dotEl;
      this.startTime = null;
      this.elapsedMs = 0;
      this.intervalId = null;
      this.isRunning = false;
      this.bestTimeKey = 'cyber_escape_best_time';
    }

    start() {
      if (this.isRunning) return;
      this.startTime = performance.now() - this.elapsedMs;
      this.isRunning = true;
      this.displayEl.classList.remove('stopped');
      this.subtextEl.textContent = 'STATUS: ACTIVE';
      if (this.dotEl) this.dotEl.style.backgroundColor = 'var(--neon-green)';

      this.intervalId = setInterval(() => {
        this.elapsedMs = performance.now() - this.startTime;
        this.render();
      }, 33); // ~30 fps update
    }

    stop() {
      if (!this.isRunning) return this.elapsedMs;
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      this.displayEl.classList.add('stopped');
      this.subtextEl.textContent = 'STATUS: BREACHED';
      if (this.dotEl) this.dotEl.style.backgroundColor = 'var(--neon-cyan)';
      this.render();

      this.saveBestTime(this.elapsedMs);
      return this.elapsedMs;
    }

    reset() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      this.elapsedMs = 0;
      this.startTime = null;
      this.displayEl.classList.remove('stopped');
      this.subtextEl.textContent = 'STATUS: READY';
      this.render();
    }

    formatTime(ms) {
      const totalSec = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      const centis = Math.floor((ms % 1000) / 10);
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      const cc = String(centis).padStart(2, '0');
      return `${mm}:${ss}.${cc}`;
    }

    render() {
      this.displayEl.textContent = this.formatTime(this.elapsedMs);
    }

    saveBestTime(ms) {
      const currentBest = localStorage.getItem(this.bestTimeKey);
      if (!currentBest || ms < parseFloat(currentBest)) {
        localStorage.setItem(this.bestTimeKey, ms);
        this.updateBestBadge();
      }
    }

    getBestTimeFormatted() {
      const best = localStorage.getItem(this.bestTimeKey);
      if (!best) return '--:--.--';
      return this.formatTime(parseFloat(best));
    }

    updateBestBadge() {
      const badge = document.getElementById('best-time-badge');
      if (badge) {
        badge.textContent = `BEST: ${this.getBestTimeFormatted()}`;
      }
    }
  }

  // =========================================================================
  // 4. ESCAPE ROOM GAME CONTROLLER
  // =========================================================================

  class EscapeRoomGame {
    constructor() {
      this.audio = new CyberAudio();
      
      // DOM Elements
      this.termScreen = document.getElementById('terminal-screen');
      this.termOutput = document.getElementById('terminal-output');
      this.termAnchor = document.getElementById('terminal-anchor');
      this.termForm = document.getElementById('terminal-form');
      this.termInput = document.getElementById('terminal-input');
      this.statusText = document.getElementById('system-status-text');
      this.solvedCountEl = document.getElementById('solved-count');
      this.integrityValEl = document.getElementById('integrity-value');
      
      // Stopwatch
      this.stopwatch = new Stopwatch(
        document.getElementById('stopwatch-display'),
        document.getElementById('stopwatch-subtext'),
        document.getElementById('timer-status-dot')
      );
      this.stopwatch.updateBestBadge();

      // Command History
      this.history = [];
      this.historyIndex = -1;

      // Codewords recognized
      this.validCodewords = ['help', 'scan', 'inspect', 'solve', 'unlock', 'reset', 'clear'];

      // Active Locks State
      this.activeLocks = [];
      this.currentFocusLock = 1;
      this.gameWon = false;
      this.started = false;

      this.initEvents();
      this.initParticles();
      this.bootGame();
    }

    // Pick random questions from each category pool
    generateQuestions() {
      const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];
      return [
        { lockNum: 1, ...pickRandom(QUESTION_POOLS.lock1), status: 'locked', cracked: false },
        { lockNum: 2, ...pickRandom(QUESTION_POOLS.lock2), status: 'locked', cracked: false },
        { lockNum: 3, ...pickRandom(QUESTION_POOLS.lock3), status: 'locked', cracked: false }
      ];
    }

    bootGame() {
      this.activeLocks = this.generateQuestions();
      this.currentFocusLock = 1;
      this.gameWon = false;
      this.started = false;
      this.stopwatch.reset();

      this.updateHUD();
      this.clearTerminal();

      // Terminal Boot Sequence Animation
      this.printLine('================================================================', 'dim');
      this.printLine(' [!] ALERT: MAINFRAME LOCKDOWN ENGAGED // ESCAPE PROTOCOL ACTIVE', 'error');
      this.printLine('================================================================', 'dim');
      this.printLine('System security has locked down 3 critical firewall layers:', 'info');
      this.printLine('  • LAYER 01: [LOGIC CORE]        - Status: LOCKED', 'warning');
      this.printLine('  • LAYER 02: [CYBER QUIZ]        - Status: LOCKED', 'dim');
      this.printLine('  • LAYER 03: [SYSTEM KERNEL]     - Status: LOCKED', 'dim');
      this.printLine('');
      this.printLine('Escape instructions:', 'info');
      this.printLine('  1. Use codeword "scan" to assess security network status.');
      this.printLine('  2. Use codeword "inspect" (or "inspect 1") to decrypt questions.');
      this.printLine('  3. Use codeword "solve <answer>" to submit a bypass key.');
      this.printLine('  4. Use codeword "unlock" to disengage cracked layers.');
      this.printLine('  5. Type "help" anytime to review all available codewords.');
      this.printLine('');
      this.printLine('⏱ The Escape Stopwatch in the top right is primed and ready.', 'highlight');
      this.printLine('Type a codeword below to begin breach.', 'dim');
      this.printLine('');

      this.audio.playBeep(440, 0.1);
    }

    ensureStarted() {
      if (!this.started && !this.gameWon) {
        this.started = true;
        this.stopwatch.start();
      }
    }

    initEvents() {
      // Terminal Form Submit
      this.termForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = this.termInput.value.trim();
        if (!rawCmd) return;
        this.audio.playKeyClick();
        this.termInput.value = '';
        this.history.push(rawCmd);
        this.historyIndex = this.history.length;
        this.executeCommand(rawCmd);
      });

      // Arrow keys for history & TAB for autocomplete
      this.termInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.historyIndex > 0) {
            this.historyIndex--;
            this.termInput.value = this.history[this.historyIndex] || '';
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.termInput.value = this.history[this.historyIndex] || '';
          } else {
            this.historyIndex = this.history.length;
            this.termInput.value = '';
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.handleAutocomplete();
        } else {
          this.audio.playKeyClick();
        }
      });

      // Quick Codeword Chips
      document.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cmd = btn.getAttribute('data-cmd');
          this.audio.playKeyClick();
          this.termInput.value = cmd;
          this.termInput.focus();
          if (!cmd.endsWith(' ')) {
            this.executeCommand(cmd);
            this.termInput.value = '';
          }
        });
      });

      // Click on Lock Cards to inspect
      document.querySelectorAll('.lock-card').forEach(card => {
        card.addEventListener('click', () => {
          const lockId = parseInt(card.getAttribute('data-lock'), 10);
          this.audio.playKeyClick();
          this.executeCommand(`inspect ${lockId}`);
        });
      });

      // Sound Toggle Button
      const soundBtn = document.getElementById('toggle-sound-btn');
      soundBtn.addEventListener('click', () => {
        const enabled = this.audio.toggle();
        soundBtn.innerHTML = enabled ? '<span>🔊</span> AUDIO ON' : '<span>🔇</span> AUDIO OFF';
        this.printLine(`Audio output has been ${enabled ? 'ENABLED' : 'MUTED'}.`, 'dim');
      });

      // CRT Scanlines Toggle
      const crtBtn = document.getElementById('toggle-crt-btn');
      crtBtn.addEventListener('click', () => {
        document.body.classList.toggle('crt-overlay');
        document.body.classList.toggle('crt-flicker');
        const active = document.body.classList.contains('crt-overlay');
        this.printLine(`CRT scanline shaders ${active ? 'ENGAGED' : 'DISABLED'}.`, 'dim');
      });

      // Modal Buttons
      const modalReplayBtn = document.getElementById('modal-replay-btn');
      modalReplayBtn.addEventListener('click', () => {
        this.hideVictoryModal();
        this.bootGame();
      });

      const modalCloseBtn = document.getElementById('modal-close-btn');
      modalCloseBtn.addEventListener('click', () => {
        this.hideVictoryModal();
        this.printLine('Victory state preserved. Type "reset" anytime to start a fresh escape room.', 'info');
      });

      const saveScoreBtn = document.getElementById('save-score-btn');
      saveScoreBtn.addEventListener('click', () => {
        this.submitCallsign();
      });

      // Focus terminal on click anywhere on screen
      document.addEventListener('click', (e) => {
        if (!e.target.closest('button') && !e.target.closest('input') && !e.target.closest('.modal-box')) {
          this.termInput.focus();
        }
      });
    }

    handleAutocomplete() {
      const current = this.termInput.value.toLowerCase().trim();
      if (!current) return;
      const match = this.validCodewords.find(c => c.startsWith(current));
      if (match) {
        this.termInput.value = match + ' ';
      }
    }

    // =========================================================================
    // 5. COMMAND DISPATCHER & LOGIC
    // =========================================================================

    executeCommand(commandLine) {
      this.ensureStarted();

      // Echo command into terminal screen
      this.printLine(`guest@cybercore:~$ ${commandLine}`, 'cmd-echo');

      const parts = commandLine.trim().split(/\s+/);
      const mainCmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (mainCmd) {
        case 'help':
          this.cmdHelp();
          break;
        case 'scan':
          this.cmdScan();
          break;
        case 'inspect':
          this.cmdInspect(args);
          break;
        case 'solve':
          this.cmdSolve(args);
          break;
        case 'unlock':
          this.cmdUnlock();
          break;
        case 'reset':
          this.cmdReset();
          break;
        case 'clear':
          this.clearTerminal();
          break;
        case 'status':
          this.cmdStatus();
          break;
        case 'hint':
          this.cmdHint(args);
          break;
        case 'whoami':
          this.printLine('IDENTITY: Netrunner Agent // Trapped in Apex Mainframe // Protocol 2099', 'info');
          break;
        case 'time':
          this.printLine(`Elapsed Escape Time: ${this.stopwatch.formatTime(this.stopwatch.elapsedMs)}`, 'highlight');
          break;
        default:
          this.audio.playErrorBuzz();
          this.printLine(`bash: '${mainCmd}': command not recognized.`, 'error');
          this.printLine('Available codewords: help, scan, inspect, solve, unlock, reset, clear.', 'dim');
          break;
      }

      this.scrollToBottom();
    }

    // HELP COMMAND
    cmdHelp() {
      this.audio.playBeep(520, 0.08);
      this.printLine('----------------------------------------------------------------', 'dim');
      this.printLine('  CYBER//BREACH COMMAND DIRECTORY & CODEWORDS', 'info');
      this.printLine('----------------------------------------------------------------', 'dim');
      
      const commandsHelp = [
        { cmd: 'help', desc: 'Display this command manual and mission directives' },
        { cmd: 'scan', desc: 'Perform system security diagnostic & inspect all 3 locks' },
        { cmd: 'inspect [n]', desc: 'Examine lock question details (e.g., "inspect 1", "inspect 2")' },
        { cmd: 'solve <ans>', desc: 'Submit bypass key for active lock (or "solve <n> <ans>")' },
        { cmd: 'unlock', desc: 'Disengage firewall layer once cracked, or trigger escape' },
        { cmd: 'reset', desc: 'Re-encrypt system with new random questions & reset stopwatch' },
        { cmd: 'clear', desc: 'Clear terminal screen display buffer' },
        { cmd: 'hint [n]', desc: 'Request encrypted hint for a specific lock' },
        { cmd: 'status', desc: 'View current lockdown integrity telemetry' }
      ];

      commandsHelp.forEach(item => {
        this.printRow(item.cmd, item.desc);
      });

      this.printLine('');
      this.printLine('QUICK ESCAPE GUIDE:', 'warning');
      this.printLine(' 1. Type "scan" to see all 3 security layers.');
      this.printLine(' 2. Type "inspect 1" to read the logic question for Layer 1.');
      this.printLine(' 3. Type "solve <answer>" to crack it.');
      this.printLine(' 4. Type "unlock" to lower Layer 1 and proceed to Layer 2!');
      this.printLine('----------------------------------------------------------------', 'dim');
    }

    // SCAN COMMAND
    cmdScan() {
      this.audio.playBeep(680, 0.12);
      this.printLine('Initiating deep security network scan...', 'info');

      // Visual progress animation
      let p = 0;
      const progressLine = this.createDynamicLine('[░░░░░░░░░░░░░░░░░░░░] 0% Scanning subnets...');
      
      const scanInterval = setInterval(() => {
        p += 25;
        const filled = '█'.repeat(p / 5);
        const empty = '░'.repeat(20 - p / 5);
        progressLine.textContent = `[${filled}${empty}] ${p}% Scanning node topology...`;
        this.scrollToBottom();

        if (p >= 100) {
          clearInterval(scanInterval);
          progressLine.textContent = '[████████████████████] 100% SCAN COMPLETE.';
          progressLine.className = 'term-line success';
          this.displayScanResults();
        }
      }, 70);
    }

    displayScanResults() {
      this.printLine('');
      this.printLine('========== MAINFRAME FIREWALL TOPOLOGY ==========', 'highlight');
      
      this.activeLocks.forEach(lock => {
        let statusStr = lock.status.toUpperCase();
        let colorClass = 'warning';
        if (lock.status === 'unlocked') {
          statusStr = 'UNLOCKED [BYPASSED]';
          colorClass = 'success';
        } else if (lock.cracked) {
          statusStr = 'CRACKED [READY TO UNLOCK]';
          colorClass = 'info';
        } else if (lock.status === 'active') {
          statusStr = 'ARMED [IN PROGRESS]';
          colorClass = 'warning';
        } else {
          statusStr = 'LOCKED [ENCRYPTED]';
          colorClass = 'dim';
        }

        this.printLine(`[LAYER 0${lock.lockNum}] ${lock.category.toUpperCase()} - ${lock.title}`, 'info');
        this.printLine(`  Status: ${statusStr} (Type: inspect ${lock.lockNum})`, colorClass);
      });

      const solvedCount = this.activeLocks.filter(l => l.status === 'unlocked').length;
      const integrity = Math.round(((3 - solvedCount) / 3) * 100);
      this.printLine(`Security Integrity: ${integrity}% | Active Focus: Layer 0${this.currentFocusLock}`, 'dim');
      this.printLine('=================================================', 'highlight');
      this.scrollToBottom();
    }

    // INSPECT COMMAND
    cmdInspect(args) {
      let targetLockNum = this.currentFocusLock;
      if (args.length > 0) {
        const parsed = parseInt(args[0], 10);
        if ([1, 2, 3].includes(parsed)) {
          targetLockNum = parsed;
        } else {
          this.printLine(`Invalid layer identifier: '${args[0]}'. Use 1, 2, or 3.`, 'error');
          return;
        }
      }

      const lock = this.activeLocks[targetLockNum - 1];

      // Check if previous locks are solved
      if (targetLockNum > 1) {
        const prevLock = this.activeLocks[targetLockNum - 2];
        if (prevLock.status !== 'unlocked') {
          this.audio.playErrorBuzz();
          this.printLine(`[ACCESS DENIED] Layer 0${targetLockNum} is encrypted behind Layer 0${targetLockNum - 1}.`, 'error');
          this.printLine(`You must completely bypass and 'unlock' Layer 0${targetLockNum - 1} first!`, 'warning');
          return;
        }
      }

      this.audio.playBeep(720, 0.09);
      this.currentFocusLock = targetLockNum;
      this.updateHUD();

      this.printLine(`================================================================`, 'dim');
      this.printLine(` [INSPECTING] LAYER 0${lock.lockNum}: ${lock.title.toUpperCase()}`, 'highlight');
      this.printLine(` Category: ${lock.category}`, 'info');
      
      if (lock.status === 'unlocked') {
        this.printLine(` [STATUS: UNLOCKED] This firewall has already been breached.`, 'success');
        this.printLine(` Archive Note: ${lock.explanation}`, 'dim');
      } else if (lock.cracked) {
        this.printLine(` [STATUS: CRACKED] Bypass key verified! Ready to disengage.`, 'info');
        this.printLine(` Type "unlock" to disengage this layer.`, 'warning');
      } else {
        this.printLine(` [STATUS: ARMED] Decrypted security puzzle:`, 'warning');
        this.printLine('');
        this.printBox(lock.clue);
        this.printLine('');
        this.printLine(` 👉 To submit your answer, type: solve <your_answer>`, 'info');
        this.printLine(` Need a clue? Type: hint ${lock.lockNum}`, 'dim');
      }
      this.printLine(`================================================================`, 'dim');
    }

    // SOLVE COMMAND
    cmdSolve(args) {
      if (args.length === 0) {
        this.audio.playErrorBuzz();
        this.printLine('Usage: solve <answer>   OR   solve <layer_number> <answer>', 'error');
        this.printLine('Example: solve 16   or   solve 1 hack the planet', 'dim');
        return;
      }

      let targetLockNum = this.currentFocusLock;
      let submittedAnswer = '';

      // Check if first arg is 1, 2, or 3
      if (['1', '2', '3'].includes(args[0]) && args.length > 1) {
        targetLockNum = parseInt(args[0], 10);
        submittedAnswer = args.slice(1).join(' ').trim();
      } else {
        submittedAnswer = args.join(' ').trim();
      }

      const lock = this.activeLocks[targetLockNum - 1];

      // Check access permission
      if (targetLockNum > 1) {
        const prevLock = this.activeLocks[targetLockNum - 2];
        if (prevLock.status !== 'unlocked') {
          this.audio.playErrorBuzz();
          this.printLine(`[ACCESS DENIED] Layer 0${targetLockNum} is inaccessible until Layer 0${targetLockNum - 1} is unlocked.`, 'error');
          return;
        }
      }

      if (lock.status === 'unlocked') {
        this.printLine(`Layer 0${lock.lockNum} is already breached and unlocked.`, 'warning');
        return;
      }

      // Normalization
      const normalizedSubmit = this.normalizeAnswer(submittedAnswer);
      const isMatch = lock.answers.some(ans => this.normalizeAnswer(ans) === normalizedSubmit);

      if (isMatch) {
        // Success cracking
        lock.cracked = true;
        this.audio.playSuccessChime();
        this.printLine('');
        this.printLine(`✅ [CORRECT] Key accepted for Layer 0${lock.lockNum} (${lock.title})!`, 'success');
        this.printLine(` Decryption payload: ${lock.explanation}`, 'dim');
        this.printLine(` Firewall cracked! Type "unlock" to lower this security layer.`, 'highlight');
        this.printLine('');
        this.updateHUD();
      } else {
        // Incorrect
        this.audio.playErrorBuzz();
        this.printLine(`❌ [ACCESS DENIED] Invalid key '${submittedAnswer}' for Layer 0${lock.lockNum}.`, 'error');
        this.printLine(` Check spelling or type "hint ${lock.lockNum}" for tactical assistance.`, 'warning');
      }
    }

    // UNLOCK COMMAND
    cmdUnlock() {
      const lock = this.activeLocks[this.currentFocusLock - 1];

      if (!lock) {
        this.printLine('No active lock selected. Type "scan".', 'warning');
        return;
      }

      if (lock.status === 'unlocked') {
        // Check if next lock exists
        if (this.currentFocusLock < 3) {
          this.currentFocusLock++;
          this.cmdInspect([this.currentFocusLock]);
        } else {
          this.printLine('All locks are already unlocked! Mainframe escaped.', 'success');
        }
        return;
      }

      if (!lock.cracked) {
        this.audio.playErrorBuzz();
        this.printLine(`[OVERRIDE FAILED] Layer 0${lock.lockNum} has not been cracked yet.`, 'error');
        this.printLine(`You must first solve the puzzle! Type "inspect ${lock.lockNum}" to read it.`, 'warning');
        return;
      }

      // Disengage lock!
      lock.status = 'unlocked';
      this.audio.playSuccessChime();
      this.printLine('');
      this.printLine(`🔓 [LAYER 0${lock.lockNum} DISENGAGED] Firewall integrity lowered!`, 'success');

      // Check if all 3 unlocked
      const solvedCount = this.activeLocks.filter(l => l.status === 'unlocked').length;

      if (solvedCount === 3) {
        // FINAL ESCAPE!
        this.triggerEscapeVictory();
      } else {
        // Advance to next lock
        this.currentFocusLock++;
        this.updateHUD();
        this.printLine(`Advancing to Layer 0${this.currentFocusLock}...`, 'info');
        setTimeout(() => {
          this.cmdInspect([this.currentFocusLock]);
        }, 300);
      }
    }

    // RESET COMMAND
    cmdReset() {
      this.audio.playBeep(330, 0.15);
      this.printLine('Re-encrypting mainframe & generating brand new questions...', 'warning');
      this.bootGame();
    }

    // STATUS COMMAND
    cmdStatus() {
      const solvedCount = this.activeLocks.filter(l => l.status === 'unlocked').length;
      const integrity = Math.round(((3 - solvedCount) / 3) * 100);
      this.printLine('------------------------------------------------', 'dim');
      this.printLine(` MAINFRAME STATUS: ${this.gameWon ? 'ESCAPED' : 'LOCKDOWN ACTIVE'}`, this.gameWon ? 'success' : 'error');
      this.printLine(` Security Integrity: ${integrity}%`, 'warning');
      this.printLine(` Firewalls Breached: ${solvedCount} / 3`, 'info');
      this.printLine(` Active Layer: Layer 0${this.currentFocusLock}`, 'highlight');
      this.printLine(` Stopwatch Timer: ${this.stopwatch.formatTime(this.stopwatch.elapsedMs)}`, 'info');
      this.printLine('------------------------------------------------', 'dim');
    }

    // HINT COMMAND
    cmdHint(args) {
      let targetLockNum = this.currentFocusLock;
      if (args.length > 0) {
        const parsed = parseInt(args[0], 10);
        if ([1, 2, 3].includes(parsed)) targetLockNum = parsed;
      }
      const lock = this.activeLocks[targetLockNum - 1];
      this.audio.playBeep(600, 0.08);
      this.printLine(`💡 [DECRYPTED HINT for Layer 0${lock.lockNum}]:`, 'warning');
      this.printLine(`  ${lock.hint}`, 'info');
    }

    // =========================================================================
    // 6. VICTORY & ESCAPE EVENT
    // =========================================================================

    triggerEscapeVictory() {
      this.gameWon = true;
      const finalTimeMs = this.stopwatch.stop();
      const formattedTime = this.stopwatch.formatTime(finalTimeMs);

      this.audio.playVictoryFanfare();
      this.updateHUD();

      this.printLine('');
      this.printLine('################################################################', 'success');
      this.printLine(' ### ALL 3 LOCKS BYPASSED // MAINFRAME COMPROMISED // ESCAPED! ###', 'success');
      this.printLine('################################################################', 'success');
      this.printLine(`🎉 CONGRATULATIONS, OPERATOR! ESCAPE SUCCESSFUL.`, 'highlight');
      this.printLine(` Final Escape Time: ${formattedTime}`, 'info');
      this.printLine(' Opening global operator register...', 'dim');
      this.printLine('');

      // Show Victory Modal
      setTimeout(() => {
        this.showVictoryModal(formattedTime, finalTimeMs);
      }, 700);
    }

    showVictoryModal(formattedTime, finalTimeMs) {
      const modal = document.getElementById('victory-modal');
      const finalTimeEl = document.getElementById('modal-final-time');
      const rankEl = document.getElementById('modal-rank');

      finalTimeEl.textContent = formattedTime;

      // Calculate Netrunner Rank based on speed
      const totalSec = finalTimeMs / 1000;
      let rank = 'S-TIER NETRUNNER';
      if (totalSec < 45) rank = 'LEGENDARY GHOST (S+)';
      else if (totalSec < 90) rank = 'S-TIER NETRUNNER';
      else if (totalSec < 180) rank = 'A-TIER CYBER DECKER';
      else rank = 'B-TIER SCRIPT INFILTRATOR';

      rankEl.textContent = rank;
      modal.classList.remove('hidden');

      this.loadLeaderboard();
    }

    hideVictoryModal() {
      const modal = document.getElementById('victory-modal');
      modal.classList.add('hidden');
    }

    // Submit Callsign to Python Server / LocalStorage
    submitCallsign() {
      const input = document.getElementById('callsign-input');
      const statusMsg = document.getElementById('submit-status');
      const callsign = (input.value || 'CYBER_GHOST').trim().toUpperCase();
      const timeStr = this.stopwatch.formatTime(this.stopwatch.elapsedMs);
      const seconds = (this.stopwatch.elapsedMs / 1000);

      statusMsg.textContent = 'Transmitting data to Python Mainframe API...';
      statusMsg.style.color = 'var(--neon-cyan)';

      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callsign, time: timeStr, seconds })
      })
      .then(res => res.json())
      .then(data => {
        statusMsg.textContent = '✓ CALLSIGN REGISTERED ON MAINFRAME!';
        statusMsg.style.color = 'var(--neon-green)';
        this.renderLeaderboardTable(data.leaderboard);
      })
      .catch(err => {
        // Fallback to local storage if running without server
        console.warn('API error, saving locally:', err);
        const localBoard = this.saveLocalScore(callsign, timeStr, seconds);
        statusMsg.textContent = '✓ SAVED LOCALLY (OFFLINE MODE)';
        statusMsg.style.color = 'var(--neon-yellow)';
        this.renderLeaderboardTable(localBoard);
      });
    }

    saveLocalScore(callsign, timeStr, seconds) {
      let board = JSON.parse(localStorage.getItem('cyber_escape_leaderboard') || '[]');
      board.push({
        callsign,
        time: timeStr,
        seconds,
        date: new Date().toISOString().split('T')[0]
      });
      board.sort((a, b) => a.seconds - b.seconds);
      board = board.slice(0, 10);
      localStorage.setItem('cyber_escape_leaderboard', JSON.stringify(board));
      return board;
    }

    loadLeaderboard() {
      fetch('/api/leaderboard')
        .then(res => res.json())
        .then(data => {
          this.renderLeaderboardTable(data);
        })
        .catch(() => {
          const local = JSON.parse(localStorage.getItem('cyber_escape_leaderboard') || '[]');
          if (local.length === 0) {
            local.push(
              { callsign: 'NEO_PHREAK', time: '01:14.20', seconds: 74.20, date: '2099-10-01' },
              { callsign: 'ZERO_COOL', time: '01:38.85', seconds: 98.85, date: '2099-10-03' }
            );
          }
          this.renderLeaderboardTable(local);
        });
    }

    renderLeaderboardTable(board) {
      const tbody = document.getElementById('leaderboard-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      board.forEach((entry, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>#${idx + 1}</td>
          <td style="color: var(--neon-cyan); font-weight: bold;">${this.escapeHTML(entry.callsign)}</td>
          <td style="color: var(--neon-yellow);">${this.escapeHTML(entry.time)}</td>
          <td style="color: var(--text-muted);">${this.escapeHTML(entry.date || '')}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // =========================================================================
    // 7. HUD & DOM UPDATES
    // =========================================================================

    updateHUD() {
      const solvedCount = this.activeLocks.filter(l => l.status === 'unlocked').length;
      this.solvedCountEl.textContent = `${solvedCount} / 3`;
      
      const integrity = Math.round(((3 - solvedCount) / 3) * 100);
      this.integrityValEl.textContent = `${integrity}%`;

      if (solvedCount === 3) {
        this.statusText.textContent = 'SYSTEM BREACHED - ESCAPED';
        document.querySelector('.status-pill').className = 'status-pill status-cleared';
      } else {
        this.statusText.textContent = 'SYSTEM IN LOCKDOWN';
        document.querySelector('.status-pill').className = 'status-pill status-alert';
      }

      // Update 3 Lock Cards
      this.activeLocks.forEach(lock => {
        const card = document.getElementById(`lock-card-${lock.lockNum}`);
        const badge = document.getElementById(`lock-badge-${lock.lockNum}`);
        const icon = document.getElementById(`lock-icon-${lock.lockNum}`);
        const title = document.getElementById(`lock-title-${lock.lockNum}`);
        const statusNote = document.getElementById(`lock-status-${lock.lockNum}`);
        const progress = document.getElementById(`progress-${lock.lockNum}`);

        title.textContent = lock.title;

        if (lock.status === 'unlocked') {
          card.className = 'lock-card unlocked';
          badge.textContent = 'UNLOCKED';
          icon.textContent = '🔓';
          statusNote.innerHTML = 'Firewall breached. Layer disengaged.';
          progress.style.width = '100%';
        } else if (lock.cracked) {
          card.className = 'lock-card active';
          badge.textContent = 'CRACKED';
          icon.textContent = '⚡';
          statusNote.innerHTML = 'Key verified! Type <code>unlock</code>';
          progress.style.width = '75%';
        } else if (lock.lockNum === this.currentFocusLock) {
          card.className = 'lock-card active';
          badge.textContent = 'ACTIVE';
          icon.textContent = '🔒';
          statusNote.innerHTML = `Active target. Type <code>inspect ${lock.lockNum}</code>`;
          progress.style.width = '30%';
        } else if (lock.lockNum < this.currentFocusLock) {
          card.className = 'lock-card';
          badge.textContent = 'LOCKED';
          icon.textContent = '🔒';
          statusNote.innerHTML = 'Pending solution.';
          progress.style.width = '0%';
        } else {
          card.className = 'lock-card locked';
          badge.textContent = 'LOCKED';
          icon.textContent = '🔒';
          statusNote.innerHTML = `Encrypted. Solve Layer 0${lock.lockNum - 1} first.`;
          progress.style.width = '0%';
        }
      });
    }

    // =========================================================================
    // 8. TERMINAL PRINTING UTILITIES
    // =========================================================================

    printLine(text, className = '') {
      const line = document.createElement('div');
      line.className = `term-line ${className}`;
      line.textContent = text;
      this.termOutput.appendChild(line);
      this.scrollToBottom();
      return line;
    }

    createDynamicLine(initialText) {
      const line = document.createElement('div');
      line.className = 'term-line info';
      line.textContent = initialText;
      this.termOutput.appendChild(line);
      this.scrollToBottom();
      return line;
    }

    printBox(text) {
      const box = document.createElement('div');
      box.className = 'term-box';
      box.textContent = text;
      this.termOutput.appendChild(box);
      this.scrollToBottom();
    }

    printRow(cmd, desc) {
      const row = document.createElement('div');
      row.className = 'term-table';
      row.innerHTML = `
        <div class="term-row">
          <div class="term-cell-cmd">${this.escapeHTML(cmd)}</div>
          <div class="term-cell-desc">${this.escapeHTML(desc)}</div>
        </div>
      `;
      this.termOutput.appendChild(row);
    }

    clearTerminal() {
      this.termOutput.innerHTML = '';
      this.scrollToBottom();
    }

    scrollToBottom() {
      this.termScreen.scrollTop = this.termScreen.scrollHeight;
    }

    normalizeAnswer(str) {
      return (str || '')
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // strip punctuation & spaces for flexible matching
        .trim();
    }

    escapeHTML(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    // Background floating particle generation
    initParticles() {
      const container = document.getElementById('particles');
      if (!container) return;
      const count = 28;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 8}s`;
        p.style.animationDuration = `${6 + Math.random() * 6}s`;
        if (Math.random() > 0.6) {
          p.style.backgroundColor = 'var(--neon-pink)';
          p.style.boxShadow = '0 0 6px var(--neon-pink)';
        }
        container.appendChild(p);
      }
    }
  }

  // Auto-launch when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    window.CyberEscape = new EscapeRoomGame();
  });

})();
