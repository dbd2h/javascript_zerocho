const $computer = document.getElementById("computer");
const $score = document.getElementById("score");
const $rock = document.getElementById("rock");
const $scissors = document.getElementById("scissors");
const $paper = document.getElementById("paper");
const $IMG_URL = "./rsp.png";
$computer.style.background = `url(${$IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

let computerChoice = 0;

function randomrsp() {
  computerChoice += 1;
  computerChoice = computerChoice % 3;
  $computer.style.background = `url(${$IMG_URL}) ${
    String(-computerChoice * 220) + "px"
  } 0`;
  $computer.style.backgroundSize = "auto 200px";
}

let intervalFunction = setInterval(() => {
  randomrsp();
}, 50);

const clickButton = function () {
  clearInterval(intervalFunction);
  setTimeout(() => {
    intervalFunction = setInterval(() => {
      randomrsp();
    }, 50);
  }, 1000);
};
$scissors.addEventListener("click", clickButton);
$rock.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
