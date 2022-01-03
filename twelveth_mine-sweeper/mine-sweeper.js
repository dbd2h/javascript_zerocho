$gameBoard = document.querySelector(".game-board");
mines = [];
let remains = 30;

function mineSetting() {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    mine = [];
    for (let j = 0; j < 14; j++) {
      mine.push(0);
    }
    mines.push(mine);
  }
  while (count < remains) {
    a = Math.floor(Math.random() * 8);
    b = Math.floor(Math.random() * 14);
    if (mines[a][b] === 1) {
      continue;
    }
    mines[a][b] = 1;
    count++;
  }
  console.log(mines);
}
function gameMaker() {
  const $table = document.createElement("table");
  let back = true;
  for (let i = 0; i < 8; i++) {
    const $tr = document.createElement("tr");
    for (let j = 0; j < 14; j++) {
      const $td = document.createElement("td");
      const $span = document.createElement("span");
      if (mines[i][j] === 1) {
        $td.classList.add("mine");
        const $i = document.createElement("i");
        $i.setAttribute("class", "fas fa-bomb");
        $span.append($i);
      } else if (mines[i][j] === 0) {
        if (back) {
          $td.classList.add("light");
          back = !back;
        } else {
          $td.classList.add("dark");
          back = !back;
        }
      }
      $td.append($span);
      $td.addEventListener("contextmenu", (event) => {
        event.target.classList.toggle("flagged");
      });
      $td.addEventListener("click", (event) => {
        if (
          event.target.classList.contains("opened") ||
          event.target.classList.contains("flagged")
        ) {
          return;
        }
        event.target.classList.add("opened");
        if (event.target.classList.contains("light")) {
          event.target.classList.add("opened-light");
        } else if (event.target.classList.contains("dark")) {
          event.target.classList.add("opened-dark");
        }
      });
      $tr.append($td);
      back = !back;
    }
    $table.append($tr);
  }
  $gameBoard.append($table);
}
mineSetting();
gameMaker();
