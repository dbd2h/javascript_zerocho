const clockTitle = document.querySelector(".js-clock");
let day = 0;
let hour = 0;
let minute = 0;
let second = 0;

function getTime() {
  const date = new Date();
  d = String(date.getDate());
  h = String(date.getHours());
  m = String(date.getMinutes());
  s = String(date.getSeconds());
  fakeList = [d, h, m, s];
  for (let i = 1; i < 4; i++) {
    if (fakeList[i] < 10) {
      fakeList[i] = "0" + String(fakeList[i]);
    }
  }
  return fakeList;
}

function getClock() {
  const dateList = getTime();
  clockTitle.innerHTML = `${dateList[0]}:${dateList[1]}:${dateList[2]}:${dateList[3]}`;
}

getClock();
setInterval(getClock, 1000);
