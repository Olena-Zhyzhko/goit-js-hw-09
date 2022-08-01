import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitListener);

function onSubmitListener() {
  event.preventDefault();

  const deleyEl = Number(form.delay.value);
  const stepEl = Number(form.step.value);
  const amountEl = Number(form.amount.value);
  let delay = deleyEl;

  for (let position = 1; position <= amountEl; position += 1) {
    if (position !== 1) {
      delay += stepEl;
    }
  
    createPromise(`${position}`, `${delay}`)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}
  
  function createPromise(position, delay) {
    return new Promise((fulfill, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          fulfill({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    }
  )}