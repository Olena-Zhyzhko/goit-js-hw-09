import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysOnTimer = document.querySelector('span[data-days]');
const hoursOnTimer = document.querySelector('span[data-hours]');
const minutesOnTimer = document.querySelector('span[data-minutes]');
const secondsOnTimer = document.querySelector('span[data-seconds]');

btn.disabled = true;
let finalDates;
let currentTime;
btn.addEventListener('click', onBtnClick, { once: true });


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        finalDates = selectedDates[0];
        currentTime = Date.now();
    if (finalDates < currentTime) {
        Notiflix.Confirm.show("Please choose a date in the future");
    } else {
        btn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);



function onBtnClick() {
    input.setAttribute('disabled', 'true');
    btn.disabled = true;
    timer();
}

function timer() {
        const timerId = setInterval(() => {
        currentTime = Date.now();
        const deltaTime = finalDates - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        if (deltaTime > 0) {
            onSpanResult({ days, hours, minutes, seconds });
        } else {
            input.removeAttribute('disabled');
            clearInterval(timerId);
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
    daysOnTimer.textContent = days;
    hoursOnTimer.textContent = hours;
    minutesOnTimer.textContent = minutes;
    secondsOnTimer.textContent = seconds;
}

