const $wrapper = document.querySelector(".wrapper");
const total = 12;
const colors = ["red", "orange", "yellow", "green", "white", "pink"];
let colorCopy = colors.concat(colors);
let shuffled = [];
let flipped = [];

function shuffle() {
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function cardClick(event) {
  if (!event.target.classList.contains("card-front") || flipped.length == 2) {
    return;
  }
  if (flipped.length == 1) {
    if (flipped[0][1] == event.target.parentElement.parentElement) {
      return;
    }
  }
  event.target.parentElement.parentElement.classList.add("flipped");
  flipped.push([
    event.target.parentElement.childNodes[1].style.backgroundColor,
    event.target.parentElement.parentElement,
  ]);
  console.log(flipped.length);
  if (!(flipped.length === 2)) {
    return;
  }
  if (flipped[0][0] == flipped[1][0]) {
    setTimeout(() => {
      flipped[0][1].classList.add("hidden");
      flipped[1][1].classList.add("hidden");
      flipped = [];
    }, 1000);
  } else {
    setTimeout(() => {
      flipped[0][1].classList.remove("flipped");
      flipped[1][1].classList.remove("flipped");
      flipped = [];
    }, 1000);
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
    card.addEventListener("click", cardClick);
  }, 5000);

  return card;
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    });
  }, 5000);
}
startGame();
