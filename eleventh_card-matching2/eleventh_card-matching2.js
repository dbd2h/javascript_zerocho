$wrapper = document.querySelector(".wrapper");
$textBar = document.querySelector(".text-bar");
$input = document.querySelector("form");
$timer = document.querySelector(".timer");
$button = document.querySelector("button");
let loop;
let count = 0;
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "white",
  "pink",
  "blue",
  "purple",
  "brown",
  "gray",
];
colorCopy = colors.concat(colors);
let shuffled = [];
let timeConst = 0;
let clickedCard = [];

function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomNumber = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomNumber, 1));
  }
}

function createCard(i) {
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  setTimeout(() => {
    card.addEventListener("click", clickCard);
  }, 3800 + 100 * shuffled.length);

  return card;
}

function clickCard() {
  if (this.classList.contains("card-back") || clickedCard.length === 2) {
    return;
  }

  if (clickedCard.length == 1) {
    if (clickedCard[0] === this) {
      return;
    }
  }
  clickedCard.push(this);
  this.classList.add("flipped");
  if (clickedCard.length === 1) {
    return;
  }
  console.log(clickedCard);
  setTimeout(() => {
    const card1 = clickedCard[0];
    const card2 = clickedCard[1];
    if (
      card1.childNodes[0].childNodes[1].style.backgroundColor ==
      card2.childNodes[0].childNodes[1].style.backgroundColor
    ) {
      clickedCard[0].classList.add("none");
      clickedCard[1].classList.add("none");
      count += 1;
    } else {
      clickedCard[0].classList.remove("flipped");
      clickedCard[1].classList.remove("flipped");
    }
    clickedCard = [];
    if (count === shuffled.length / 2) {
      console.log("끝");
      clearInterval(loop);
      $button.classList.remove("hidden");
    }
  }, 1000);
}

function startGame() {
  shuffle();
  for (let i = 0; i < shuffled.length; i++) {
    const card = createCard(i);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
      console.log("flipped추가");
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      console.log("flipped제거");
      card.classList.remove("flipped");
    });
    loop = setInterval(() => {
      $timer.innerHTML = `${timeConst}초`;
      timeConst += 1;
    }, 1000);
  }, 3800 + 100 * shuffled.length);
}

$textBar.querySelector("form").addEventListener("submit", (event) => {
  console.log("hello");
  event.preventDefault();
  const inputNumber = event.target["input"].value;
  if (inputNumber % 2 === 1 || inputNumber > 20 || inputNumber <= 0) {
    alert("다시 입력");
    return;
  }
  colorCopy.splice(inputNumber / 2, 10 - inputNumber / 2);
  colorCopy.splice(inputNumber, 10 - inputNumber / 2);
  $input.classList.add("hidden");
  startGame();
});

$button.addEventListener("click", () => {
  $input.classList.remove("hidden");
  $input.querySelector("input").value = "";
  shuffled = [];
  count = 0;
  colorCopy = colors.concat(colors);
  $wrapper.innerHTML = "";
  timeConst = 0;
  clickedCard = [];
  $timer.innerHTML = "";
  $button.classList.add("hidden");
});
