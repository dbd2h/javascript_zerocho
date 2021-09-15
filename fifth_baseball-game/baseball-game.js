const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $button = document.querySelector("button");
const $logs = document.querySelector(".logs");
let playerNumber;
let out = 0;

const numberList = [];
for (let i = 1; i <= 9; i++) {
  numberList.push(i);
}

const answerList = [];
for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * numberList.length);
  answerList.push(numberList[index]);
  numberList.splice(index, 1);
}
const onInput = function (event) {
  playerNumber = event.target.value;
};
console.log(answerList);
const tries = [];

const checkInput = function (input) {
  if (input.length !== 4) {
    return alert("4자리 숫자를 입력해주십시오");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력해주십시오");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값입니다");
  }
  if (input.includes("0")) {
    return alert("0을 포함하지 않는 4자리수 숫자를 입력해주십시오");
  }
  return true;
};

$input.addEventListener("input", onInput);
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  $input.value = "";
  $input.focus();
  if (!checkInput(playerNumber)) {
    return;
  }
  if (answerList.join("") === playerNumber) {
    $logs.innerHTML = "홈런!!!";
    return;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(
      `패배 정답은 ${answerList.join("")}`
    );
    $logs.appendChild(message);
    return;
  }
  tries.push(playerNumber);
  let ball = 0;
  let strike = 0;
  let i = 0;
  while (i < 4) {
    if (parseInt(playerNumber[i]) === answerList[i]) {
      strike++;
    }
    if (answerList.includes(parseInt(playerNumber[i]))) {
      ball++;
    }
    i++;
  }
  ball = ball - strike;
  $logs.innerHTML =
    $logs.innerHTML +
    "<div>" +
    playerNumber +
    " " +
    String(ball) +
    "B " +
    String(strike) +
    "S" +
    "</div>";
  if (ball == 0 && strike == 0) {
    out++;
    $logs.append("아웃", document.createElement("br"));
  }
  if (out == 3) {
    $logs.textContent = "삼진 아웃 게임종료";
    $input.readOnly = true;
    $button.readOnly = true;
  }
});
