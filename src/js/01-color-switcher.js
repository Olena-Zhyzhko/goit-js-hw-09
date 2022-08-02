const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId;
btnStop.disabled = true;


btnStart.addEventListener('click', onListenerBtnStart);
btnStop.addEventListener('click', onListenerBtnStop);


function nextColor() {
    return intervalId = setInterval(() => {
        return body.style.backgroundColor = getRandomHexColor();
    }, 1000);
} 

function onListenerBtnStart(event) {
    btnStart.disabled = true;
    btnStop.disabled = false;

    nextColor();
}

function onListenerBtnStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;

    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

