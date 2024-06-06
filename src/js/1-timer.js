import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';

const startBtn = document.querySelector('.btn-start');
const timer = document.querySelector('.timer');

let userSelectedDate = null;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
    },
});

let intervalId;

startBtn.addEventListener('click', (event) => {
  const initTime = event.target.value;

  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = initTime - currentTime;
    const time = convertMs(remainingTime);
    const str = getTime(time);

    timer.innerHTML = str;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    startBtn.disabled = false;
  }, initTime - Date.now() - 1000)
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getTime({ days, hours, minutes, seconds }) {
  days = days.toString();
  hours = hours.toString();
  minutes = minutes.toString();
  seconds = seconds.toString();

  return `${days}:${hours}:${minutes}:${seconds}`;
}

function formatTimeComponent(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerDisplay.textContent = `${formatTimeComponent(days)}:${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`;
}
