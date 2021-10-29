const $startScreen = document.querySelector(".start-screen");
const $gameMenu = document.querySelector(".game-menu");
const $battleMenu = document.querySelector(".battle-menu");
const $heroInf = document.querySelector(".hero-inf");
const $heroName = document.querySelector(".hero-inf__hero-name");
const $heroLevel = document.querySelector(".hero-inf__hero-level");
const $heroHp = document.querySelector(".hero-inf__hero-hp");
const $heroXp = document.querySelector(".hero-inf__hero-xp");
const $heroAtt = document.querySelector(".hero-inf__hero-att");
const $monsterInf = document.querySelector(".monster-inf");
const $monsterName = document.querySelector(".monster-inf__monster-name");
const $monsterHp = document.querySelector(".monster-inf__monster-hp");
const $monsterAtt = document.querySelector(".monster-inf__monster-att");
const $message = document.querySelector(".message");
let oneOneString = null;
let monsterHp = null;

function reset() {
  $message.innerHTML = "";
  $startScreen.classList.remove("hidden");
  $gameMenu.classList.add("hidden");
  $monsterInf.classList.add("hidden");
  $heroInf.classList.add("hidden");
  $battleMenu.classList.add("hidden");
  oneOneString = 0;
  monsterHp = null;
  hero.name = "";
  hero.xp = 0;
  hero.level = 1;
  hero.att = 10;
  hero.maxHp = 100;
  hero.hp = 100;
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function oneOneFunc() {
  $message.innerHTML = "";
  for (let i = 0; i < oneOneString.length; i++) {
    $message.innerHTML += oneOneString[i];
    await delay(80);
  }
}

async function levelUp() {
  if (hero.xp >= hero.level * 15) {
    hero.xp -= $heroLevel * 15;
    hero.level += 1;
    await delay(200);
    $heroXp.innerHTML = `XP: ${hero.xp}/${hero.level * 15}`;
    oneOneString = `레벨업! ${hero.level}레벨이 되었다.`;
    await oneOneFunc();
    await delay(200);
    hero.maxHp = hero.level * 50 + 50;
    hero.hp = hero.maxHp;
    hero.att = hero.att + 5;
    $heroHp.innerHTML = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroAtt.innerHTML = `Att: ${hero.att}`;
    oneOneString = "플레이어의 최대체력과 공격력이 올라갔다.";
    await oneOneFunc();
    await delay(200);
    return;
  }
  $heroXp.innerHTML = `XP: ${hero.xp}/${hero.level * 15}`;
  return;
}

async function monsterAtt(randomNumber) {
  oneOneString = `${monsterList[randomNumber].name}의 공격`;
  await oneOneFunc();
  await delay(200);
  hero.hp -= monsterList[randomNumber].att;
  $heroHp.innerHTML = `HP: ${hero.hp}/${hero.maxHp}`;
  await delay(1000);
  $battleMenu.classList.toggle("hidden");
  $message.innerHTML = "무엇을 할까?";
}

const hero = {
  name: "",
  level: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
};
let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

async function battleMenuSelect1(randomNumber) {
  $battleMenu.classList.toggle("hidden");
  oneOneString = "플레이어의 공격!";
  await oneOneFunc();
  await delay(200);
  monsterHp -= hero.att;
  if (monsterHp <= 0) {
    $monsterHp.innerHTML = `HP: 0/${monsterList[randomNumber].hp}`;
    await delay(200);
    oneOneString = "플레이어의 승리";
    await oneOneFunc();
    await delay(1000);
    hero.xp += monsterList[randomNumber].xp;
    oneOneString = `경험치 ${monsterList[randomNumber].xp}xp 획득`;
    await oneOneFunc();
    levelUp();
    await delay(1000);
    $gameMenu.classList.toggle("hidden");
    $monsterInf.classList.toggle("hidden");
    $message.innerHTML = "";
    return;
  }
  $monsterHp.innerHTML = `HP: ${monsterHp}/${monsterList[randomNumber].hp}`;
  await delay(1000);
  monsterAtt(randomNumber);
}

async function gameMenuSelect1() {
  $gameMenu.classList.toggle("hidden");
  $monsterInf.classList.toggle("hidden");
  let randomNumberStan = null;
  if (hero.level <= 2) {
    randomNumberStan = 1;
  } else if (hero.level <= 4) {
    randomNumberStan = 2;
  } else if (hero.level >= 5) {
    randomNumberStan = 3;
  }
  const randomNumber = Math.floor(Math.random() * randomNumberStan);
  $monsterName.innerHTML = monsterList[randomNumber].name;
  monsterHp = monsterList[randomNumber].hp;
  $monsterHp.innerHTML = `HP: ${monsterHp}/${monsterList[randomNumber].hp}`;
  $monsterAtt.innerHTML = `Att: ${monsterList[randomNumber].att}`;
  oneOneString = `야생의 ${monsterList[randomNumber].name}이 나타났다.`;
  await oneOneFunc();
  await delay(200);
  oneOneString = "무엇을 할까?";
  await oneOneFunc();
  await delay(200);
  $battleMenu.classList.toggle("hidden");
  $battleMenu.addEventListener("submit", (event) => {
    if ($battleMenu.classList.contains("hidden")) {
      return;
    }
    event.preventDefault();
    const battleSelectNumber = event.target["battle-menu__battle-input"].value;
    event.target["battle-menu__battle-input"].value = "";
    if (battleSelectNumber == 1) {
      battleMenuSelect1(randomNumber);
    } else if (battleSelectNumber == 2) {
    } else if (battleSelectNumber == 3) {
    } else {
      alert("1,2,3 숫자중 하나를 입력해주세요.");
    }
  });
}
function gameMenuSelect2() {}

function gameMenuSelect3() {}

$startScreen.addEventListener("submit", (event) => {
  if ($startScreen.classList.contains("hidden")) {
    return;
  }
  event.preventDefault();
  const name = event.target["start-screen__name-input"].value;
  $startScreen.classList.toggle("hidden");
  $heroInf.classList.toggle("hidden");
  $gameMenu.classList.toggle("hidden");
  $heroName.textContent = `Name: ${name}`;
  $heroLevel.textContent = `level: ${hero.level}`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.level}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
  event.target["start-screen__name-input"].value = "";
});

$gameMenu.addEventListener("submit", (event) => {
  if ($gameMenu.classList.contains("hidden")) {
    return;
  }
  event.preventDefault();
  const number = event.target["game-menu__input-number"].value;
  event.target["game-menu__input-number"].value = "";
  if (number == 1) {
    gameMenuSelect1();
  } else if (number == 2) {
  } else if (number == 3) {
  } else {
    alert("1,2,3 숫자중 하나를 입력해주세요.");
  }
});
