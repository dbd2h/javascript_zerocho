const playerNumber = prompt("몇명이 참가하나요?");
const $order = document.querySelector(".end-to-end__number");
const $input = document.querySelector("form input:first-child");
const $button = document.querySelector("form input:last-child");
const $suggestion = document.querySelector(".end-to-end__words");
const $finish = document.querySelector("end-to-end");

let word;
let newWord;

const numberUp = () => {};

const onClickButton = () => {
  if (!word || word[word.length - 1] == newWord[0]) {
    word = newWord;
    $suggestion.textContent = word;
    const order = parseInt($order.textContent);
    console.log(order);
    if (order === parseInt(playerNumber)) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
  } else {
    alert("올바르지 않은 단어입니다.");
  }
  $input.value = "";
  $input.focus();
};

const onInput = (event) => {
  newWord = event.target.value;
};

$button.addEventListener("click", onClickButton);
$input.addEventListener("input", onInput);
