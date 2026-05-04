# Асинхронний JavaScript: Таймери, Інтервали та Проміси

**🌐 Мова:** [English](./README.md) · **Українська** · [Русский](./README.ru.md)
· [Español](./README.es.md) · [العربية](./README.ar.md)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Async](https://img.shields.io/badge/Async-Promises-success?style=flat-square)
![flatpickr](https://img.shields.io/badge/flatpickr-date_picker-blue?style=flat-square)
![iziToast](https://img.shields.io/badge/iziToast-notifications-orange?style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black)

> Практична демонстрація **основ асинхронного JavaScript**: робота з промісами
> та їхнім життєвим циклом, планування коду через `setTimeout` і `setInterval`,
> інтеграція UI-бібліотек через npm та керування станом інтерфейсу через
> асинхронні межі.

🔗 **Жива демо-версія:**
[mrkorzun.github.io/async-js-timer-promises-lab](https://mrkorzun.github.io/async-js-timer-promises-lab/)

![Preview](./preview.png)

---

## 🎯 Що демонструє цей проєкт

Асинхронний код — одна з найпопулярніших тем на front-end співбесідах і та
область, де баги болять найбільше. Цей репозиторій — сфокусоване практичне
дослідження ключового асинхронного інструментарію: **таймерів, інтервалів,
промісів** і UX-патернів навколо них (валідація, disabled-стани, структуровані
повідомлення для користувача).

| #   | Міні-застосунок           | Демонстрований навик                                                                   |
| --- | ------------------------- | -------------------------------------------------------------------------------------- |
| 1   | Таймер зворотного відліку | Життєвий цикл `setInterval`, арифметика дат, керування UI під час асинхронних операцій |
| 2   | Генератор промісів        | Створення промісів, потік resolve/reject, асинхронний фідбек користувачеві             |

---

## 💡 Навички та компетенції

### 🔹 Асинхронний JavaScript

- **Проміси** — ручне створення через `new Promise((resolve, reject) => ...)`,
  обидва потоки `fulfilled` і `rejected`.
- **`setTimeout`** для відкладеного resolve промісу.
- **`setInterval`** + **`clearInterval`** для періодичних оновлень з коректним
  завершенням.
- Розуміння типових пасток async-коду: дрейф, витоки, повторні спрацьовування
  інтервалів.

### 🔹 Робота з датами та часом

- Робота з об'єктами `Date`, різницями в мілісекундах, `Date.now()`.
- Власна утиліта `convertMs`, що розкладає дельту в мілісекундах на дні / години
  / хвилини / секунди.
- Захисна валідація: відхилення дат з минулого до старту таймера.
- Доповнення нулями через `String.prototype.padStart` для стабільного формату
  `00:00:00:00`.

### 🔹 Build-тулінг — Vite

- Проєкт розгорнуто на **Vite** як dev-сервері та збірнику з HMR.
- Кастомні entry-points для кожної сторінки в `vite.config.js`.
- Production-збірка задеплоєна через **GitHub Pages**.

### 🔹 Інтеграція npm-пакетів

- **flatpickr** — крос-браузерний date/time picker з кастомною конфігурацією
  (24-годинний формат, валідаційний хук на майбутні дати).
- **iziToast** — стилізовані toast-повідомлення для успіхів і помилок.
- І JS, і CSS імпортуються напряму з пакетів через ES Modules.

### 🔹 UX та керування станом UI

- Disabled-стани для інпутів/кнопок під час активного відліку, щоб запобігти
  невалідним змінам.
- Inline-валідація з toast-фідбеком замість нативного `alert()`.
- Візуальний фідбек, що відповідає очікуванням користувача (старт → тікання →
  завершення).

### 🔹 Якість коду та робочий процес

- **Prettier** для уніфікованого форматування.
- **EditorConfig** для крос-IDE-консистенції.
- **Git** з описовими, атомарними комітами (25+ комітів, що показують ітеративну
  розробку).
- **GitHub Pages** для безперервного деплою через `npm run deploy`.

---

## 🧩 Розбір функціональності

### 1. Таймер зворотного відліку

Таймер, що дозволяє користувачеві обрати будь-яку майбутню дату й спостерігати,
як годинник відлічує час до неї у форматі `dd:hh:mm:ss`. Модель взаємодії
жорстко контрольована: некоректний ввід відхиляється одразу, а коли таймер
працює — поле дати й кнопка Start заблоковані, щоб запобігти зіпсованому стану.

**Що це демонструє:**

- **Життєвий цикл `setInterval`**: запуск, тікання та одноразове очищення при
  досягненні дедлайну.
- **Арифметика дат** без зовнішніх бібліотек — чисті мілісекунди → людський час.
- **Захисний UX**: валідація до старту й блокування UI, щоб він не дрейфував у
  поламаний стан.
- З'єднання сторонньої бібліотеки (`flatpickr`) з логікою застосунку через
  callback-хуки.

```js
// Хук валідації з flatpickr
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

// Чиста утиліта — без Date-бібліотек
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

### 2. Генератор промісів

Контрольоване середовище для роботи з механікою промісів: користувач задає
затримку в мілісекундах, обирає `fulfilled` або `rejected` і сабмітить — після
закінчення затримки проміс осідає в обраному стані, а результат прилітає як
toast-повідомлення.

**Що це демонструє:**

- **Ручне створення промісів** через патерн
  `new Promise((resolve, reject) => ...)`.
- Інтеграція **`setTimeout`** у потік resolve промісу.
- Розділення консьюмера промісу (`.then` / `.catch`) і його продьюсера —
  фундамент усього async-коду в реальних застосунках.
- Переклад асинхронних результатів у UI-події, які бачить користувач.

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

## 🚀 Локальний запуск

Проєкт використовує Vite — потрібен dev-сервер на Node.js.

```bash
git clone https://github.com/mrkorzun/async-js-timer-promises-lab.git
cd async-js-timer-promises-lab
npm install
npm run dev
```

Dev-сервер виведе локальну адресу (зазвичай `http://localhost:5173`).

### Production-збірка

```bash
npm run build       # збирає у ./dist
npm run preview     # піднімає production-збірку локально
npm run deploy      # публікує на GitHub Pages
```

---

## 📁 Структура проєкту

```
async-js-timer-promises-lab/
├── .github/workflows/      # CI/CD для деплою на GitHub Pages
├── src/
│   ├── css/
│   │   ├── 1-timer.css
│   │   └── 2-snackbar.css
│   ├── js/
│   │   ├── 1-timer.js      # Логіка таймера зворотного відліку
│   │   └── 2-snackbar.js   # Логіка генератора промісів
│   ├── 1-timer.html        # Сторінка таймера
│   ├── 2-snackbar.html     # Сторінка генератора промісів
│   └── index.html          # Хаб навігації
├── .editorconfig
├── .prettierrc.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 👤 Автор

**Romario Korzun** — Front-End Developer

- GitHub: [@mrkorzun](https://github.com/mrkorzun)
- Жива сторінка: [mrkorzun.github.io](https://mrkorzun.github.io)

---

<sub>Початково створено як практична вправа в межах курсу **GoIT JavaScript**
для закріплення досвіду роботи з таймерами, інтервалами та Promise API.</sub>
