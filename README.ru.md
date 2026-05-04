# Асинхронный JavaScript: Таймеры, Интервалы и Промисы

**🌐 Язык:** [English](./README.md) · [Українська](./README.ua.md) · **Русский**
· [Español](./README.es.md) · [العربية](./README.ar.md)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Async](https://img.shields.io/badge/Async-Promises-success?style=flat-square)
![flatpickr](https://img.shields.io/badge/flatpickr-date_picker-blue?style=flat-square)
![iziToast](https://img.shields.io/badge/iziToast-notifications-orange?style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black)

> Практическая демонстрация **основ асинхронного JavaScript**: работа с
> промисами и их жизненным циклом, планирование кода через `setTimeout` и
> `setInterval`, интеграция UI-библиотек через npm и управление состоянием
> интерфейса через асинхронные границы.

🔗 **Живая демо-версия:**
[mrkorzun.github.io/async-js-timer-promises-lab](https://mrkorzun.github.io/async-js-timer-promises-lab/)

![Preview](./preview.png)

---

## 🎯 Что демонстрирует этот проект

Асинхронный код — одна из самых популярных тем на front-end собеседованиях и та
область, где баги болят сильнее всего. Этот репозиторий — сфокусированное
практическое исследование ключевого асинхронного инструментария: **таймеров,
интервалов, промисов** и UX-паттернов вокруг них (валидация, disabled-состояния,
структурированные сообщения для пользователя).

| #   | Мини-приложение          | Демонстрируемый навык                                                                     |
| --- | ------------------------ | ----------------------------------------------------------------------------------------- |
| 1   | Таймер обратного отсчёта | Жизненный цикл `setInterval`, арифметика дат, управление UI во время асинхронных операций |
| 2   | Генератор промисов       | Создание промисов, поток resolve/reject, асинхронный фидбек пользователю                  |

---

## 💡 Навыки и компетенции

### 🔹 Асинхронный JavaScript

- **Промисы** — ручное создание через `new Promise((resolve, reject) => ...)`,
  оба потока `fulfilled` и `rejected`.
- **`setTimeout`** для отложенного resolve промиса.
- **`setInterval`** + **`clearInterval`** для периодических обновлений с
  корректным завершением.
- Понимание типичных ловушек async-кода: дрейф, утечки, повторные срабатывания
  интервалов.

### 🔹 Работа с датами и временем

- Работа с объектами `Date`, разностями в миллисекундах, `Date.now()`.
- Собственная утилита `convertMs`, разбирающая дельту в миллисекундах на дни /
  часы / минуты / секунды.
- Защитная валидация: отклонение дат из прошлого до старта таймера.
- Дополнение нулями через `String.prototype.padStart` для стабильного формата
  `00:00:00:00`.

### 🔹 Build-тулинг — Vite

- Проект развёрнут на **Vite** как dev-сервере и сборщике с HMR.
- Кастомные entry-points для каждой страницы в `vite.config.js`.
- Production-сборка задеплоена через **GitHub Pages**.

### 🔹 Интеграция npm-пакетов

- **flatpickr** — кросс-браузерный date/time picker с кастомной конфигурацией
  (24-часовой формат, валидационный хук на будущие даты).
- **iziToast** — стилизованные toast-уведомления для успехов и ошибок.
- И JS, и CSS импортируются напрямую из пакетов через ES Modules.

### 🔹 UX и управление состоянием UI

- Disabled-состояния для инпутов/кнопок во время активного отсчёта, чтобы
  предотвратить невалидные изменения.
- Inline-валидация с toast-фидбеком вместо нативного `alert()`.
- Визуальный фидбек, соответствующий ожиданиям пользователя (старт → тиканье →
  завершение).

### 🔹 Качество кода и рабочий процесс

- **Prettier** для единого форматирования.
- **EditorConfig** для кросс-IDE-консистентности.
- **Git** с описательными, атомарными коммитами (25+ коммитов, показывающих
  итеративную разработку).
- **GitHub Pages** для непрерывного деплоя через `npm run deploy`.

---

## 🧩 Разбор функциональности

### 1. Таймер обратного отсчёта

Таймер, позволяющий пользователю выбрать любую будущую дату и наблюдать, как
часы отсчитывают время до неё в формате `dd:hh:mm:ss`. Модель взаимодействия
жёстко контролируется: некорректный ввод отклоняется сразу, а когда таймер
работает — поле даты и кнопка Start заблокированы, чтобы предотвратить
испорченное состояние.

**Что это демонстрирует:**

- **Жизненный цикл `setInterval`**: запуск, тикание и одноразовая очистка при
  достижении дедлайна.
- **Арифметика дат** без внешних библиотек — чистые миллисекунды → человеческое
  время.
- **Защитный UX**: валидация до старта и блокировка UI, чтобы он не дрейфовал в
  сломанное состояние.
- Связывание сторонней библиотеки (`flatpickr`) с логикой приложения через
  callback-хуки.

```js
// Хук валидации из flatpickr
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

// Чистая утилита — без Date-библиотек
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

### 2. Генератор промисов

Контролируемая среда для работы с механикой промисов: пользователь задаёт
задержку в миллисекундах, выбирает `fulfilled` или `rejected` и сабмитит — после
окончания задержки промис оседает в выбранном состоянии, а результат прилетает
как toast-уведомление.

**Что это демонстрирует:**

- **Ручное создание промисов** через паттерн
  `new Promise((resolve, reject) => ...)`.
- Интеграция **`setTimeout`** в поток resolve промиса.
- Разделение консьюмера промиса (`.then` / `.catch`) и его продьюсера —
  фундамент всего async-кода в реальных приложениях.
- Перевод асинхронных результатов в UI-события, которые видит пользователь.

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

## 🚀 Локальный запуск

Проект использует Vite — нужен dev-сервер на Node.js.

```bash
git clone https://github.com/mrkorzun/async-js-timer-promises-lab.git
cd async-js-timer-promises-lab
npm install
npm run dev
```

Dev-сервер выведет локальный адрес (обычно `http://localhost:5173`).

### Production-сборка

```bash
npm run build       # собирает в ./dist
npm run preview     # поднимает production-сборку локально
npm run deploy      # публикует на GitHub Pages
```

---

## 📁 Структура проекта

```
async-js-timer-promises-lab/
├── .github/workflows/      # CI/CD для деплоя на GitHub Pages
├── src/
│   ├── css/
│   │   ├── 1-timer.css
│   │   └── 2-snackbar.css
│   ├── js/
│   │   ├── 1-timer.js      # Логика таймера обратного отсчёта
│   │   └── 2-snackbar.js   # Логика генератора промисов
│   ├── 1-timer.html        # Страница таймера
│   ├── 2-snackbar.html     # Страница генератора промисов
│   └── index.html          # Хаб навигации
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
- Живая страница: [mrkorzun.github.io](https://mrkorzun.github.io)

---

<sub>Изначально создано как практическое упражнение в рамках курса **GoIT
JavaScript** для закрепления опыта работы с таймерами, интервалами и Promise
API.</sub>
