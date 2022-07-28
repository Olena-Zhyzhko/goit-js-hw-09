const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId;
btnStop.disabled = true;


btnStart.addEventListener('click', onListenerBtnStart);

const timer = {
    firstColor() {
        return startId = setTimeout(() => {
            return body.style.backgroundColor = getRandomHexColor();
        }, 0);
    },

    nextColor() {
        return timerId = setInterval(() => {
            return body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    }        
}  

function onListenerBtnStart(event) {
    btnStop.addEventListener('click', onListenerBtnStop);
    btnStart.disabled = true;
    btnStop.disabled = false;

    timer.firstColor();
    timer.nextColor();
}

function onListenerBtnStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

