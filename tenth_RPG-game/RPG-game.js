const $startScreen = document.querySelector(".start-screen");
const $gameMenu = document.querySelector(".game-menu");
const $battleMenu = document.querySelector(".battle-menu");
const $heroName = document.querySelector(".hero-inf__hero-stat");
const $heroLavel = document.querySelector(".hero-inf__hero-level");
const $heroHp = document.querySelector(".hero-inf__hero-hp");
const $heroXp = document.querySelector(".hero-inf__hero-xp");
const $heroAtt = document.querySelector(".hero-inf__hero-att");
const $monsterName = document.querySelector(".monster-stat__monster-name");
const $monsterHp = document.querySelector(".monster-stat__monster-hp");
const $monsterAtt = document.querySelector(".monster-stat__monster-att");
const $message = document.querySelector(".message");
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
$startScreen.addEventListener("submit", (event) => {});
