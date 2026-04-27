import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  btn: document.querySelector('button'),
  input: document.querySelector('#datetime-picker'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = Date.now();

    if (userSelectedDate.getTime() < currentDate) {
      refs.btn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      refs.btn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onBtnSetTimer() {
  // console.log('Button click');
  refs.btn.disabled = true;
  refs.input.disabled = true;
  return new Promise(resolve => {
    const intervalID = setInterval(() => {
      const now = Date.now();
      const deltaTime = userSelectedDate.getTime() - now;
      if (deltaTime <= 0) {
        clearInterval(intervalID);
        refs.input.disabled = false;
        resolve('Time is up!');
        return;
      }
      const currentTime = convertMs(deltaTime);

      refs.days.textContent = addZero(currentTime.days);
      refs.hours.textContent = addZero(currentTime.hours);
      refs.minutes.textContent = addZero(currentTime.minutes);
      refs.seconds.textContent = addZero(currentTime.seconds);
    }, 1000);
  });
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.btn.addEventListener('click', () => {
  onBtnSetTimer().then(message => {
    console.log(message);
  });
});
