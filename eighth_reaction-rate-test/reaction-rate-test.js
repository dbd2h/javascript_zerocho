const $screen = document.querySelector(".screen");
const $screenText = document.querySelector(".screen>span");
const $result = document.querySelector(".result");
const rateList = [];

let startTime;
let programTime;
let timerFunc;

function onClickWaiting() {
  $screenText.innerHTML = "아직 누르지 마시오!!";
  $screen.classList.toggle("screen__waiting");
  $screen.classList.toggle("screen__ready");
  const timeStart = new Date();
  const randomNumber = Math.floor((Math.random() * 4 + 3) * 1000);
  programTime = randomNumber;
  timerFunc = setTimeout(() => {
    $screen.classList.toggle("screen__ready");
    $screen.classList.toggle("screen__now");
    $screenText.innerHTML = "누르세요!!!";
  }, randomNumber);
  return timeStart;
}

function timeAdd(time, list) {
  list.push(time);
  list.sort(function (a, b) {
    return a - b;
  });
}

$screen.addEventListener("click", (event) => {
  if (event.target.classList.contains("screen__waiting")) {
    startTime = onClickWaiting();
  } else if (event.target.classList.contains("screen__ready")) {
    $screen.classList.toggle("screen__ready");
    $screen.classList.toggle("screen__now");
    clearTimeout(timerFunc);
    $screenText.innerHTML = "";
    $result.innerHTML =
      "화면이 초록색으로 바꼈을 때 눌러주세요</br>재시작하려면 클릭";
  } else if (
    event.target.classList.contains("screen__now") &&
    $result.innerHTML === ""
  ) {
    const endTime = new Date();
    $screenText.innerHTML = "";
    const duringTime = (endTime - startTime - programTime) / 1000;
    $result.innerHTML = `${duringTime}초 걸리셨습니다~</br>재시작하려면 클릭`;
    timeAdd(duringTime, rateList);
    for (let i = 0; i < 5; i++) {
      document.querySelector(`.order-list>li:nth-child(${i + 1})`).innerHTML =
        rateList[i];
      if (i + 1 === rateList.length) {
        break;
      }
    }
  } else if ($result.innerHTML !== "") {
    $screen.classList.toggle("screen__waiting");
    $screen.classList.toggle("screen__now");
    $result.innerHTML = "";
    $screenText.innerHTML = "클릭해서 시작하세요";
  }
});
