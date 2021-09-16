const $computer = document.getElementById("computer");
const $score = document.getElementById("score");
const $rock = document.getElementById("rock");
const $scissors = document.getElementById("scissors");
const $paper = document.getElementById("paper");
const $IMG_URL = "./rsp.png";
const $retryBtn = document.querySelector(".retry-btn");
$computer.style.background = `url(${$IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

const RETRYBUTTON = "<form><button class='retry-btn'>Retry</button></form>";

let computerChoice = 0;
let score = 0;
let computerScore = 0;
let gameScore = 0;

function randomrsp() {
  computerChoice += 1;
  computerChoice = computerChoice % 3;
  $computer.style.background = `url(${$IMG_URL}) ${
    String(-computerChoice * 220) + "px"
  } 0`;
  $computer.style.backgroundSize = "auto 200px";
  /*
  보자기 2
  가위 0
  주먹 1
  */
  return computerChoice;
}

let intervalFunction = setInterval(() => {
  let computerValue = randomrsp();
}, 50);

let retrySelect = true;

function gameSetter(user, com, set) {
  if (!(set === 3 || user === 2 || com === 2)) {
    return;
  }
  if (user == 2) {
    $score.innerHTML += ` 유저가 이겼습니다!!</br>${RETRYBUTTON}`;
    const $form = document.querySelector("form");
    $form.innerHTML = "다시 하시겠습니까?" + $form.innerHTML;
  } else {
    $score.innerHTML += ` 컴퓨터가 이겼습니다...</br>${RETRYBUTTON}`;
    const $form = document.querySelector("form");
    $form.innerHTML = "다시 하시겠습니까?" + $form.innerHTML;
  }
  retrySelect = false;
}

function scoreAppender(user, com) {
  if (user === "scissors") {
    user = 0;
  } else if (user === "rock") {
    user = 1;
  } else if (user === "paper") {
    user = 2;
  }
  let message;
  const diff = user - com;
  if (diff === 1 || diff === -2) {
    message = "승리";
    score += 1;
    gameScore += 1;
  } else if (diff === -1 || diff === 2) {
    message = "패배";
    computerScore += 1;
    gameScore += 1;
  } else {
    message = "무승무";
  }
  $score.innerHTML = `${message} 유저:${score}점 컴퓨터:${computerScore}점`;
  gameSetter(score, computerScore, gameScore);
}

let clickable = true;
const clickButton = function (event) {
  if (!clickable) {
    return;
  }

  clearInterval(intervalFunction);
  clickable = false;
  const myChoice = event.target.id;
  scoreAppender(myChoice, computerChoice);
  if (retrySelect) {
    setTimeout(() => {
      clickable = true;
      intervalFunction = setInterval(() => {
        randomrsp();
      }, 50);
    }, 1000);
  }
};
$scissors.addEventListener("click", clickButton);
$rock.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
