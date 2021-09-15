const $result = document.querySelector(".lotto-result");
const $bonus = document.querySelector(".lotto-bonus");

const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);

const lottoList = [];
for (let i = 0; i < 7; i++) {
  const index = Math.floor(Math.random() * candidate.length);
  lottoList.push(candidate[index]);
  candidate.splice(index, 1);
}
const randomNumber = Math.floor(Math.random() * 7);
const bonusNumber = lottoList[randomNumber];
lottoList.splice(randomNumber, 1);
lottoList.sort((a, b) => a - b);

const numberDis = function (n) {
  if (1 <= n && n <= 10) {
    return " lotto__balls--red";
  } else if (11 <= n && n <= 20) {
    return " lotto__balls--orange";
  } else if (21 <= n && n <= 30) {
    return " lotto__balls--yellow";
  } else if (31 <= n && n <= 40) {
    return " lotto__balls--blue";
  } else if (41 <= n && n <= 45) {
    return " lotto__balls--green";
  }
};

for (let i = 0; i < 6; i++) {
  setTimeout(() => {
    $result.innerHTML += `<div class="lotto__balls"></div>`;
    document.querySelector(".lotto-result>.lotto__balls:last-child").innerHTML =
      lottoList[i];
    document.querySelector(
      ".lotto-result>.lotto__balls:last-child"
    ).className += numberDis(lottoList[i]);
  }, 1000 * i + 1000);
}
setTimeout(() => {
  $bonus.innerHTML += `<div class="lotto__balls"></div>`;
  document.querySelector(".lotto-bonus>div").innerHTML = bonusNumber;
  document.querySelector(".lotto-bonus>div").className +=
    numberDis(bonusNumber);
}, 7000);
