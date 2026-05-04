# JavaScript Asíncrono: Temporizadores, Intervalos y Promesas

**🌐 Idioma:** [English](./README.md) · [Українська](./README.ua.md) ·
[Русский](./README.ru.md) · **Español** · [العربية](./README.ar.md)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Async](https://img.shields.io/badge/Async-Promises-success?style=flat-square)
![flatpickr](https://img.shields.io/badge/flatpickr-date_picker-blue?style=flat-square)
![iziToast](https://img.shields.io/badge/iziToast-notifications-orange?style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black)

> Una demostración práctica de los **fundamentos de JavaScript asíncrono**:
> trabajo con Promesas y su ciclo de vida, programación de código mediante
> `setTimeout` y `setInterval`, integración de librerías UI vía npm y manejo del
> estado de la interfaz a través de fronteras asíncronas.

🔗 **Demo en vivo:**
[mrkorzun.github.io/async-js-timer-promises-lab](https://mrkorzun.github.io/async-js-timer-promises-lab/)

![Preview](./preview.png)

---

## 🎯 Qué demuestra este proyecto

El código asíncrono es uno de los temas más preguntados en entrevistas de
front-end y el área donde los bugs más duelen. Este repositorio es una
exploración práctica enfocada en el toolkit asíncrono esencial:
**temporizadores, intervalos, Promesas** y los patrones UX que los rodean
(validación, estados deshabilitados, feedback estructurado al usuario).

| #   | Mini-aplicación                  | Habilidad demostrada                                                                           |
| --- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | Temporizador de cuenta regresiva | Ciclo de vida de `setInterval`, aritmética de fechas, estado UI durante operaciones asíncronas |
| 2   | Generador de Promesas            | Creación de Promesas, flujo resolve/reject, feedback asíncrono al usuario                      |

---

## 💡 Habilidades y competencias

### 🔹 JavaScript asíncrono

- **Promesas** — creación manual mediante
  `new Promise((resolve, reject) => ...)`, ambos flujos `fulfilled` y
  `rejected`.
- **`setTimeout`** para resolución diferida de Promesas.
- **`setInterval`** + **`clearInterval`** para actualizaciones recurrentes con
  limpieza correcta.
- Conciencia de las trampas habituales del código asíncrono: drift, leaks,
  intervalos que se disparan dos veces.

### 🔹 Manejo de fechas y tiempo

- Trabajo con objetos `Date`, diferencias en milisegundos y `Date.now()`.
- Utilidad `convertMs` propia que descompone un delta en milisegundos a días /
  horas / minutos / segundos.
- Validación defensiva: rechazar fechas pasadas antes de iniciar la cuenta
  regresiva.
- Relleno con ceros mediante `String.prototype.padStart` para un formato
  consistente `00:00:00:00`.

### 🔹 Build Tooling — Vite

- Proyecto configurado con **Vite** como dev server y bundler con HMR.
- Entry-points por página configurados en `vite.config.js`.
- Build de producción desplegado vía **GitHub Pages**.

### 🔹 Integración de paquetes npm

- **flatpickr** — date/time picker multi-navegador con configuración
  personalizada (formato 24h, hook de validación para fechas futuras).
- **iziToast** — notificaciones toast estilizadas para feedback de éxito/error.
- Tanto JS como CSS importados directamente desde paquetes vía ES Modules.

### 🔹 UX y manejo del estado de UI

- Inputs/botones deshabilitados durante cuentas regresivas activas para prevenir
  cambios de estado inválidos.
- Validación inline con feedback toast en lugar del `alert()` nativo.
- Feedback visual alineado con el modelo mental del usuario (inicio → tic →
  fin).

### 🔹 Calidad de código y flujo de trabajo

- **Prettier** para formato consistente.
- **EditorConfig** para coherencia entre IDEs.
- **Git** con commits descriptivos y atómicos (más de 25 commits que reflejan
  desarrollo iterativo).
- **GitHub Pages** para despliegue continuo vía `npm run deploy`.

---

## 🧩 Recorrido por las funcionalidades

### 1. Temporizador de cuenta regresiva

Un temporizador que permite al usuario elegir cualquier fecha futura y observar
cómo el reloj cuenta hacia atrás hasta ella en formato `dd:hh:mm:ss`. El modelo
de interacción está estrictamente controlado: la entrada inválida se rechaza
desde el inicio y, una vez que el temporizador está corriendo, el input de fecha
y el botón Start quedan bloqueados para evitar estados corruptos.

**Qué demuestra esto:**

- El **ciclo de vida de `setInterval`**: arranque, tic-tac y limpieza única al
  alcanzar la fecha límite.
- **Aritmética de fechas** sin librerías externas — milisegundos puros → tiempo
  humano.
- **UX defensivo**: validar antes de arrancar y luego bloquear la UI para que no
  derive a un estado roto.
- Conectar un widget de terceros (`flatpickr`) con la lógica del resto de la app
  mediante hooks callback.

```js
// Hook de validación desde flatpickr
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

// Utilidad pura — sin librería de fechas
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

### 2. Generador de Promesas

Un entorno controlado para experimentar con la mecánica de Promesas: el usuario
elige un retraso en milisegundos, selecciona `fulfilled` o `rejected` y envía —
tras transcurrir el retraso, la Promesa se asienta en el estado elegido y el
resultado aparece como notificación toast.

**Qué demuestra esto:**

- **Construcción manual de Promesas** con el patrón
  `new Promise((resolve, reject) => ...)`.
- Integración de **`setTimeout`** en el flujo de resolución de la Promesa.
- Separación entre el consumidor de la Promesa (`.then` / `.catch`) y su
  productor — el cimiento de todo código asíncrono en aplicaciones reales.
- Traducción de resultados asíncronos a eventos de UI que el usuario realmente
  ve.

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

## 🚀 Ejecución local

El proyecto usa Vite — se requiere un dev server basado en Node.js.

```bash
git clone https://github.com/mrkorzun/async-js-timer-promises-lab.git
cd async-js-timer-promises-lab
npm install
npm run dev
```

El dev server imprimirá una URL local (normalmente `http://localhost:5173`).

### Build de producción

```bash
npm run build       # genera ./dist
npm run preview     # sirve el build de producción localmente
npm run deploy      # publica en GitHub Pages
```

---

## 📁 Estructura del proyecto

```
async-js-timer-promises-lab/
├── .github/workflows/      # CI/CD para despliegue en GitHub Pages
├── src/
│   ├── css/
│   │   ├── 1-timer.css
│   │   └── 2-snackbar.css
│   ├── js/
│   │   ├── 1-timer.js      # Lógica del temporizador
│   │   └── 2-snackbar.js   # Lógica del generador de Promesas
│   ├── 1-timer.html        # Página del temporizador
│   ├── 2-snackbar.html     # Página del generador de Promesas
│   └── index.html          # Hub de navegación
├── .editorconfig
├── .prettierrc.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 👤 Autor

**Romario Korzun** — Front-End Developer

- GitHub: [@mrkorzun](https://github.com/mrkorzun)
- Página personal: [mrkorzun.github.io](https://mrkorzun.github.io)

---

<sub>Originalmente creado como ejercicio práctico dentro del curso **GoIT
JavaScript** para consolidar la experiencia con temporizadores, intervalos y la
API de Promesas.</sub>
