const selector = (e) => document.querySelector(e);
const digitalClock = selector('.digital');
const horElement = selector('.p_h');
const minElement = selector('.p_m');
const secElement = selector('.p_s');

const fixZero = (time) => time < 10 ? `0${time}` : time;

function updateClock () {
  const now = new Date();
  const hour = fixZero(now.getHours());
  const minute = fixZero(now.getMinutes());
  const second = fixZero(now.getSeconds());
  digitalClock.innerText = `${hour}:${minute}:${second}`;

  const hDeg = ((360 / 12) * hour) - 90;
  const mDeg = ((360 / 60) * minute) - 90;
  const sDeg = ((360 / 60) * second) - 90;

  horElement.style.transform = `rotate(${hDeg}deg)`;
  minElement.style.transform = `rotate(${mDeg}deg)`;
  secElement.style.transform = `rotate(${sDeg}deg)`;
}
updateClock();
setInterval(updateClock, 1000);
