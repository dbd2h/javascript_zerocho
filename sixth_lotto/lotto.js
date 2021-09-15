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

const numberDis = function (inputTag, n) {
  inputTag.innerHTML = n;
  if (1 <= n && n <= 10) {
    inputTag.className = "lotto__balls lotto__balls--red";
  } else if (11 <= n && n <= 20) {
    inputTag.className = "lotto__balls lotto__balls--orange";
  } else if (21 <= n && n <= 30) {
    inputTag.className = "lotto__balls lotto__balls--yellow";
  } else if (31 <= n && n <= 40) {
    inputTag.className = "lotto__balls lotto__balls--blue";
  } else if (41 <= n && n <= 45) {
    inputTag.className = "lotto__balls lotto__balls--green";
  }
};

numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(1)"),
  lottoList[0]
);
numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(2)"),
  lottoList[1]
);
numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(3)"),
  lottoList[2]
);
numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(4)"),
  lottoList[3]
);
numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(5)"),
  lottoList[4]
);
numberDis(
  document.querySelector(".lotto-result__box>div:nth-child(6)"),
  lottoList[5]
);
numberDis(document.querySelector(".lotto-bonus>div"), bonusNumber);
