# Asynchronous JavaScript: Timers, Intervals & Promises

**🌐 Language:** **English** · [Українська](./README.ua.md) ·
[Русский](./README.ru.md) · [Español](./README.es.md) ·
[العربية](./README.ar.md)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Async](https://img.shields.io/badge/Async-Promises-success?style=flat-square)
![flatpickr](https://img.shields.io/badge/flatpickr-date_picker-blue?style=flat-square)
![iziToast](https://img.shields.io/badge/iziToast-notifications-orange?style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black)

> A practical demonstration of **asynchronous JavaScript fundamentals**: working
> with Promises and their lifecycle, scheduling code via `setTimeout` and
> `setInterval`, integrating UI libraries through npm, and maintaining UI state
> across async boundaries.

🔗 **Live demo:**
[mrkorzun.github.io/async-js-timer-promises-lab](https://mrkorzun.github.io/async-js-timer-promises-lab/)

![Preview](./preview.png)

---

## 🎯 What This Project Demonstrates

Asynchronous code is one of the most-asked-about topics in front-end interviews
— and the area where bugs hurt the most. This repository is a focused, hands-on
exploration of the core async toolkit: **timers, intervals, Promises**, and the
UX patterns that surround them (validation, disabled states, structured user
feedback).

| #   | Mini-App          | Skill Demonstrated                                             |
| --- | ----------------- | -------------------------------------------------------------- |
| 1   | Countdown Timer   | `setInterval` lifecycle, date math, UI state during async work |
| 2   | Promise Generator | Promise creation, resolve/reject flow, async user feedback     |

---

## 💡 Skills & Competencies

### 🔹 Asynchronous JavaScript

- **Promises** — manual creation via `new Promise((resolve, reject) => ...)`,
  both `fulfilled` and `rejected` flows.
- **`setTimeout`** for delayed Promise resolution.
- **`setInterval`** + **`clearInterval`** for recurring updates with a clean
  shutdown.
- Awareness of common async pitfalls: drift, leaks, double-fired intervals.

### 🔹 Date & Time Handling

- Working with `Date` objects, millisecond differences, and `Date.now()`.
- Custom `convertMs` utility breaking down a millisecond delta into days / hours
  / minutes / seconds.
- Defensive validation: rejecting past dates before starting the countdown.
- Zero-padding via `String.prototype.padStart` for consistent `00:00:00:00`
  formatting.

### 🔹 Build Tooling — Vite

- Project scaffolded with **Vite** as a dev server and bundler with HMR.
- Per-page entry points configured in `vite.config.js`.
- Production build deployed via **GitHub Pages**.

### 🔹 npm Package Integration

- **flatpickr** — cross-browser date/time picker with custom configuration (24h
  time, future-only validation hook).
- **iziToast** — styled toast notifications for success/error feedback.
- Both JS and CSS imported directly from packages via ES Modules.

### 🔹 UX & UI State Management

- Disabled inputs/buttons during active countdowns to prevent invalid state
  changes.
- Inline validation with toast feedback instead of native `alert()`.
- Visual feedback that aligns with the user's mental model (start → tick →
  finish).

### 🔹 Code Quality & Workflow

- **Prettier** for consistent formatting.
- **EditorConfig** for cross-IDE consistency.
- **Git** with descriptive, atomic commits (25+ commits showing iterative
  development).
- **GitHub Pages** for continuous deployment via `npm run deploy`.

---

## 🧩 Feature Walkthrough

### 1. Countdown Timer

A countdown timer that lets the user pick any future date and watches the clock
tick down to it in `dd:hh:mm:ss` format. The interaction model is tightly
controlled: invalid input is rejected upfront, and once the timer is running,
the date input and Start button are locked to prevent corrupted state.

**What this demonstrates:**

- The **lifecycle of `setInterval`**: starting, ticking, and cleaning up exactly
  once when the deadline is reached.
- **Date arithmetic** without external libraries — pure milliseconds → human
  time.
- **Defensive UX**: validating before starting, then locking the UI so it can't
  drift into a broken state.
- Bridging a third-party widget (`flatpickr`) with the rest of the app's logic
  via callback hooks.

```js
// Date validation hook from flatpickr
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    if (selectedDate <= Date.now()) {
      iziToast.error({ message: 'Please choose a date in the future' });
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
});

// Pure utility — no Date library needed
function convertMs(ms) {
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}
```

---

### 2. Promise Generator

A controlled environment to play with Promise mechanics: the user chooses a
delay in milliseconds, picks `fulfilled` or `rejected`, and submits — after the
delay elapses, the Promise settles into the chosen state and the result lands as
a toast notification.

**What this demonstrates:**

- **Manually constructing Promises** with the
  `new Promise((resolve, reject) => ...)` pattern.
- Hooking **`setTimeout`** into the Promise resolution flow.
- Splitting the Promise consumer (`.then` / `.catch`) from its producer — the
  foundation of all async code in real applications.
- Translating async outcomes into UI events the user actually sees.

```js
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const { delay, state } = e.target.elements;
  createPromise(Number(delay.value), state.value)
    .then(message => iziToast.success({ message }))
    .catch(message => iziToast.error({ message }));
});
```

---

## 🚀 Running Locally

This project uses Vite — a Node.js-based dev server is required.

```bash
git clone https://github.com/mrkorzun/async-js-timer-promises-lab.git
cd async-js-timer-promises-lab
npm install
npm run dev
```

The dev server will print a local URL (usually `http://localhost:5173`).

### Production build

```bash
npm run build       # builds into ./dist
npm run preview     # serves the production build locally
npm run deploy      # publishes to GitHub Pages
```

---

## 📁 Project Structure

```
async-js-timer-promises-lab/
├── .github/workflows/      # CI/CD for GitHub Pages deployment
├── src/
│   ├── css/
│   │   ├── 1-timer.css
│   │   └── 2-snackbar.css
│   ├── js/
│   │   ├── 1-timer.js      # Countdown timer logic
│   │   └── 2-snackbar.js   # Promise generator logic
│   ├── 1-timer.html        # Timer page
│   ├── 2-snackbar.html     # Promise generator page
│   └── index.html          # Navigation hub
├── .editorconfig
├── .prettierrc.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 👤 Author

**Romario Korzun** — Front-End Developer

- GitHub: [@mrkorzun](https://github.com/mrkorzun)
- Portfolio: [mrkorzun.github.io](https://mrkorzun.github.io)

---

<sub>Originally built as a practical exercise within the **GoIT JavaScript**
curriculum to consolidate experience with timers, intervals, and the Promise
API.</sub>
