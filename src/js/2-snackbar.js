import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('.submit-btn');
const delayInput = document.querySelector('.delay-input');
const stateInputs = document.querySelectorAll('input[name="state"]');

function createPromise(value, delay, status) {
  const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (status) resolve(value);
    else reject(value);
  }, delay)
  });
  return promise;
}

function onFulfilled(value) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delayInput.value}ms`,
    backgroundColor: 'rgba(89, 161, 13, 0.8)',
    messageColor: 'rgb(255, 255, 255)',
    position: 'topRight',
  });
}

function onRejected(value) {
  iziToast.show({
    message: `❌ Rejected promise in ${delayInput.value}ms`,
    backgroundColor: 'rgba(239, 64, 64, 0.8)',
    messageColor: 'rgb(255, 255, 255)',
    position: 'topRight',
  });
}

button.addEventListener('click', (event) => {
  event.preventDefault();

  const delay = parseInt(delayInput.value, 10);
  const value = Array.from(stateInputs).find(input => input.checked).value;
  const status = value === 'fulfilled';

  createPromise(value, delay, status).then(onFulfilled).catch(onRejected);

  delayInput.value = '';

  stateInputs.forEach(input => {
      input.checked = false;
  });
});



