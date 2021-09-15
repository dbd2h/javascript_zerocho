const clockTitle = document.querySelector(".js-clock");
let day = 0;
let hour = 0;
let minute = 0;
let second = 0;

function getTime() {
  const today = new Date();
  const christmas = new Date(2021, 11, 25);
  let timeInterval = christmas - today;
  const fakeList = [];
  const timeDivideList = [1, 24, 60, 60];
  let timeDivideConst = 1;
  for (let i = 0; i < 4; i++) {
    timeDivideConst = timeDivideConst * timeDivideList[i];
    fakeList.push(
      Math.floor(timeInterval / ((1000 * 60 * 60 * 24) / timeDivideConst))
    );
    timeInterval = timeInterval % ((1000 * 60 * 60 * 24) / timeDivideConst);
  }
  for (let i = 1; i < 4; i++) {
    fakeList[i] = String(fakeList[i]);
    if (fakeList[i] < 10) {
      fakeList[i] = "0" + fakeList[i];
    }
  }
  return fakeList;
}

function getClock() {
  const dateList = getTime();
  clockTitle.innerHTML = `${dateList[0]}d ${dateList[1]}h ${dateList[2]}m ${dateList[3]}s`;
}

getClock();
setInterval(getClock, 1000);
