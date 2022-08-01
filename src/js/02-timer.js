import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const dd = document.querySelector('span[data-days]');
const hh = document.querySelector('span[data-hours]');
const mm = document.querySelector('span[data-minutes]');
const ss = document.querySelector('span[data-seconds]');

btn.disabled = true;
const date = new Date();
let finalDates;
let deltaTime;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        finalDates = selectedDates[0];
    if (finalDates.getTime() < fp.now.getTime()) {
        Notiflix.Confirm.show("Please choose a date in the future");
    } else {
        btn.disabled = false;
        btn.addEventListener('click', onBtnClick, { once: true });
    }
  },
};


const fp = flatpickr("#datetime-picker", options);

function onBtnClick() {
    input.setAttribute('disabled', 'true');
    timer();
    convertMs(deltaTime);
}

function timer() {
    timerId = setInterval(() => {
        const currentTime = Date.now();
        deltaTime = finalDates.getTime() - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        if (deltaTime > 0) {
            onSpanResult({ days, hours, minutes, seconds });
        } else {
            input.removeAttribute('disabled');
            return;
        }
    }, 1000);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function onSpanResult({ days, hours, minutes, seconds }) {
    dd.textContent = days;
    hh.textContent = hours;
    mm.textContent = minutes;
    ss.textContent = seconds;
}

