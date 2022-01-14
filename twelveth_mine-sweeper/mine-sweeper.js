const $gameBoard = document.querySelector(".game-board");
const mines = [];
const rows = [];
const row = 14;
const column = 8;
let remains = 20;
const mineValue = remains;
let finish = false;
let check = 0;

function mineLocation(find) {
  // 위치 찾기
  for (let i = 0; i < column; i++) {
    if (rows[i].includes(find)) {
      const a1 = i;
      const a2 = rows[i].indexOf(find);
      return [a1, a2];
    }
  }
}

function locateNumber(num1, num2) {
  // 숫자 넣기
  const a1 = num1;
  const a2 = num2;
  let count = 0;
  for (let i = a1 - 1; i < a1 + 2; i++) {
    for (let j = a2 - 1; j < a2 + 2; j++) {
      if (i < 0 || i >= column || j < 0 || j >= row || (a1 === i && a2 === j)) {
        continue;
      }
      if (mines[i][j] === 1) {
        count++;
      }
    }
  }
  return count;
}

function numToStr(number) {
  if (number === 0) {
    return "none";
  } else if (number === 1) {
    return "one";
  } else if (number === 2) {
    return "two";
  } else if (number === 3) {
    return "three";
  } else if (number === 4) {
    return "four";
  } else if (number === 5) {
    return "five";
  } else if (number === 6) {
    return "six";
  } else if (number === 7) {
    return "seven";
  } else if (number === 8) {
    return "eight";
  }
}

function mineSetting() {
  //폭탄 위치 지정
  let count = 0;
  for (let i = 0; i < column; i++) {
    mine = [];
    for (let j = 0; j < row; j++) {
      mine.push(0);
    }
    mines.push(mine);
  }
  while (count < remains) {
    a = Math.floor(Math.random() * column);
    b = Math.floor(Math.random() * row);
    if (mines[a][b] === 1) {
      continue;
    }
    mines[a][b] = 1;
    count++;
  }
  console.log(mines);
}
function gameMaker() {
  //게임 실행
  const $table = document.createElement("table");
  let back = true;
  for (let i = 0; i < column; i++) {
    const $tr = document.createElement("tr");
    const cells = [];
    for (let j = 0; j < row; j++) {
      const $td = document.createElement("td");
      const $span = document.createElement("span");
      $span.classList.add("hidden");
      if (mines[i][j] === 1) {
        $td.classList.add("mine");
        const $i = document.createElement("i");
        $i.setAttribute("class", "fas fa-bomb");
        $span.append($i);
      } else if (mines[i][j] === 0) {
        const count = locateNumber(i, j);
        const str = numToStr(count);
        $td.classList.add(str);
        if (count !== 0) {
          $span.innerHTML = count;
        }
        $span.classList.add("num");
      }
      if (back) {
        $td.classList.add("light");
      } else {
        $td.classList.add("dark");
      }
      $td.append($span);
      const $flagbox = document.createElement("span");
      const $flagIcon = document.createElement("i");
      $flagIcon.setAttribute("class", "fas fa-flag");
      $flagbox.append($flagIcon);
      $flagbox.classList.add("hidden");
      $td.append($flagbox);
      $td.addEventListener("contextmenu", (event) => {
        //우클릭
        event.preventDefault();
        if ($td.classList.contains("opened")) {
          return;
        }
        $flagbox.classList.toggle("hidden");
        $td.classList.toggle("flagged");
      });
      $td.addEventListener(
        "click",
        (clickFunc = (event) => {
          //좌클릭
          if (
            event.target.classList.contains("opened") ||
            event.target.classList.contains("flagged") ||
            event.target.tagName != "TD" ||
            finish
          ) {
            return;
          }
          if (event.target.classList.contains("mine")) {
            finish = !finish;
            const $div = document.createElement("div");
            $div.innerHTML = "지뢰를 밟으셨군요... 패배..";
            $gameBoard.append($div);
          }
          event.target.classList.add("opened");
          event.target.childNodes[0].classList.remove("hidden");
          if (event.target.classList.contains("none")) {
            [x, y] = mineLocation(event.target);
            for (let i = x - 1; i < x + 2; i++) {
              for (let j = y - 1; j < y + 2; j++) {
                if (
                  i < 0 ||
                  i >= column ||
                  j < 0 ||
                  j >= row ||
                  (x === i && y === j)
                ) {
                  continue;
                }
                if (rows[i][j].classList.contains("opened")) {
                  continue;
                }
                console.log(rows[x][y], ":", rows[i][j]);
                setTimeout(() => {
                  rows[i][j].click();
                }, 0);
              }
            }
          }
          if (event.target.classList.contains("light")) {
            event.target.classList.add("opened-light");
          } else if (event.target.classList.contains("dark")) {
            event.target.classList.add("opened-dark");
          }
          check++;
          if (check === row * column - mineValue) {
            finish = !finish;
            const $div = document.createElement("div");
            $div.innerHTML = "축하드립니다. 모든 지뢰를 찾았습니다.";
            $gameBoard.append($div);
          }
        })
      );
      $tr.append($td);
      back = !back;
      cells.push($td);
    }
    back = !back;
    $table.append($tr);
    rows.push(cells);
  }
  $gameBoard.append($table);
}
mineSetting();
gameMaker();
//클릭했을 때 폭탄, 빈칸, 숫자가 span에 들어가게
//우클릭시 깃발, 클릭 못하게, 다시 우클릭시 깃발사라짐 클릭가능
//지뢰 개수, 타이머 설정
//
