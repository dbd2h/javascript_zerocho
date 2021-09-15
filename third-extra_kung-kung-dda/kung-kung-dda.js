const playerNumber = prompt("참가자 수를 입력해주세요.");
const $input = document.querySelector("form>input:first-child");
const $button = document.querySelector("form>input:last-child");
const $number = document.querySelector(".kung-kung-dda__number");
const $suggestion = document.querySelector(".kung-kung-dda__suggest");
let word;
let newWord;

function onClick() {
  if ((!word || word[word.length - 1] == newWord[0]) && newWord.length == 3) {
    word = newWord;
    $suggestion.textContent = word;
    const order = parseInt($number.textContent);
    if (order == playerNumber) {
      $number.textContent = 1;
    } else {
      $number.textContent = order + 1;
    }
  } else {
    alert("게임오버!");
    return;
  }
  $input.value = "";
  $input.focus();
}

function onInput(event) {
  newWord = event.target.value;
  console.log(newWord);
}

$input.addEventListener("input", onInput);
$button.addEventListener("click", onClick);
