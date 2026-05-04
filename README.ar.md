<div dir="rtl">

# JavaScript غير المتزامن: المؤقتات والفواصل الزمنية والـ Promises

**🌐 اللغة:** [English](./README.md) · [Українська](./README.ua.md) ·
[Русский](./README.ru.md) · [Español](./README.es.md) · **العربية**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Async](https://img.shields.io/badge/Async-Promises-success?style=flat-square)
![flatpickr](https://img.shields.io/badge/flatpickr-date_picker-blue?style=flat-square)
![iziToast](https://img.shields.io/badge/iziToast-notifications-orange?style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black)

> عرض عملي **لأساسيات JavaScript غير المتزامن**: التعامل مع الـ Promises ودورة
> حياتها، جدولة الكود عبر `setTimeout` و`setInterval`، دمج مكتبات الواجهة عبر
> npm، وإدارة حالة الواجهة عبر الحدود غير المتزامنة.

🔗 **العرض المباشر:**
[mrkorzun.github.io/async-js-timer-promises-lab](https://mrkorzun.github.io/async-js-timer-promises-lab/)

![Preview](./preview.png)

---

## 🎯 ما الذي يُظهره هذا المشروع

الكود غير المتزامن من أكثر المواضيع طرحاً في مقابلات الواجهة الأمامية، وهو
المجال الذي تكون فيه الأخطاء الأكثر إيلاماً. هذا المستودع استكشاف عملي مركّز
لمجموعة الأدوات الأساسية للتعامل مع الكود غير المتزامن: **المؤقتات والفواصل
الزمنية والـ Promises**، إلى جانب أنماط تجربة المستخدم المرتبطة بها (التحقق،
الحالات المعطّلة، الرسائل المنظّمة للمستخدم).

| #   | التطبيق المصغّر      | المهارة الموضّحة                                                                     |
| --- | -------------------- | ------------------------------------------------------------------------------------ |
| 1   | مؤقّت العدّ التنازلي | دورة حياة `setInterval`، حسابات التواريخ، إدارة الواجهة أثناء العمليات غير المتزامنة |
| 2   | مولّد Promises       | إنشاء الـ Promises، مسار resolve/reject، التغذية الراجعة غير المتزامنة للمستخدم      |

---

## 💡 المهارات والكفاءات

### 🔹 JavaScript غير المتزامن

- **Promises** — إنشاء يدوي عبر `new Promise((resolve, reject) => ...)`، مع
  المسارين `fulfilled` و`rejected`.
- **`setTimeout`** لتأجيل عملية resolve للـ Promise.
- **`setInterval`** + **`clearInterval`** للتحديثات الدورية مع تنظيف صحيح.
- وعي بمزالق الكود غير المتزامن الشائعة: الانحراف الزمني، التسريبات، الفواصل
  الزمنية المتكرّرة دون قصد.

### 🔹 التعامل مع التواريخ والوقت

- العمل مع كائنات `Date`، الفروقات بالميلي ثانية، و`Date.now()`.
- دالة مساعدة `convertMs` تُفكّك فرق ميلي ثانية إلى أيام / ساعات / دقائق /
  ثوانٍ.
- تحقّق دفاعي: رفض التواريخ السابقة قبل بدء العدّ التنازلي.
- ملء الأصفار عبر `String.prototype.padStart` لصيغة ثابتة `00:00:00:00`.

### 🔹 أدوات البناء — Vite

- بناء المشروع باستخدام **Vite** كخادم تطوير ومُحزّم مع HMR.
- نقاط دخول مخصّصة لكل صفحة في `vite.config.js`.
- بناء الإنتاج منشور عبر **GitHub Pages**.

### 🔹 دمج حزم npm

- **flatpickr** — منتقي تاريخ ووقت متوافق مع جميع المتصفحات بضبط مخصّص (تنسيق 24
  ساعة، ربط تحقّق على التواريخ المستقبلية).
- **iziToast** — تنبيهات منمّقة لرسائل النجاح والخطأ.
- استيراد كل من JS وCSS مباشرةً من الحزم عبر وحدات ES.

### 🔹 تجربة المستخدم وإدارة حالة الواجهة

- تعطيل المدخلات/الأزرار أثناء العدّ التنازلي النشط لمنع التغييرات غير الصالحة.
- تحقّق مدمج بتغذية راجعة عبر toast بدلاً من `alert()` الأصلي.
- تغذية بصرية متوافقة مع توقّعات المستخدم (بدء → تكتكة → إنهاء).

### 🔹 جودة الكود وسير العمل

- **Prettier** لتنسيق متّسق.
- **EditorConfig** للتوافق بين بيئات التطوير.
- **Git** بكوميتات وصفية وذرّية (أكثر من 25 كوميتاً تُظهر تطويراً تكرارياً).
- **GitHub Pages** للنشر المستمر عبر `npm run deploy`.

---

## 🧩 استعراض الوظائف

### 1. مؤقّت العدّ التنازلي

مؤقّت يتيح للمستخدم اختيار أي تاريخ مستقبلي ومراقبة الساعة وهي تعدّ تنازلياً
نحوه بصيغة `dd:hh:mm:ss`. نموذج التفاعل مضبوط بدقّة: تُرفَض المدخلات غير الصالحة
منذ البداية، وما إن يبدأ المؤقّت حتى يُغلَق حقل التاريخ وزرّ Start لمنع تعطّل
الحالة.

**ما يُظهره ذلك:**

- **دورة حياة `setInterval`**: البدء، التكتكة، والتنظيف لمرة واحدة عند بلوغ
  الموعد النهائي.
- **حساب التواريخ** دون مكتبات خارجية — ميلي ثانية صرفة → وقت قابل للقراءة.
- **تجربة مستخدم دفاعية**: التحقّق قبل البدء ثم قفل الواجهة كي لا تنحرف إلى حالة
  معطّلة.
- ربط مكوّن طرف ثالث (`flatpickr`) بمنطق التطبيق عبر دوال callback.

```js
// ربط التحقّق من flatpickr
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

// دالة نقية — دون مكتبة تواريخ
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

### 2. مولّد Promises

بيئة تجريبية مضبوطة للعب مع آلية الـ Promises: يحدّد المستخدم تأخيراً بالميلي
ثانية، يختار `fulfilled` أو `rejected` ثم يُرسِل — وبعد انقضاء التأخير يستقرّ
الـ Promise في الحالة المختارة وتظهر النتيجة كرسالة toast.

**ما يُظهره ذلك:**

- **بناء Promises يدوياً** بنمط `new Promise((resolve, reject) => ...)`.
- ربط **`setTimeout`** بمسار حلّ الـ Promise.
- الفصل بين مستهلك الـ Promise (`.then` / `.catch`) ومُنتجه — أساس كلّ كود غير
  متزامن في التطبيقات الحقيقية.
- ترجمة النتائج غير المتزامنة إلى أحداث واجهة يراها المستخدم فعلاً.

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

## 🚀 التشغيل محلياً

يستخدم المشروع Vite — يلزم خادم تطوير مبني على Node.js.

```bash
git clone https://github.com/mrkorzun/async-js-timer-promises-lab.git
cd async-js-timer-promises-lab
npm install
npm run dev
```

سيطبع خادم التطوير عنواناً محلياً (عادةً `http://localhost:5173`).

### بناء الإنتاج

```bash
npm run build       # يبني إلى ./dist
npm run preview     # يُشغّل بناء الإنتاج محلياً
npm run deploy      # ينشر على GitHub Pages
```

---

## 📁 بنية المشروع

```
async-js-timer-promises-lab/
├── .github/workflows/      # CI/CD لنشر GitHub Pages
├── src/
│   ├── css/
│   │   ├── 1-timer.css
│   │   └── 2-snackbar.css
│   ├── js/
│   │   ├── 1-timer.js      # منطق مؤقّت العدّ التنازلي
│   │   └── 2-snackbar.js   # منطق مولّد الـ Promises
│   ├── 1-timer.html        # صفحة المؤقّت
│   ├── 2-snackbar.html     # صفحة مولّد الـ Promises
│   └── index.html          # مركز التنقل
├── .editorconfig
├── .prettierrc.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 👤 المؤلف

**Romario Korzun** — مطوّر واجهات أمامية

- GitHub: [@mrkorzun](https://github.com/mrkorzun)
- الصفحة الشخصية: [mrkorzun.github.io](https://mrkorzun.github.io)

---

<sub>أُنشئ في الأصل كتمرين عملي ضمن منهج **GoIT JavaScript** لترسيخ الخبرة
بالمؤقتات والفواصل الزمنية وواجهة Promise API.</sub>

</div>
