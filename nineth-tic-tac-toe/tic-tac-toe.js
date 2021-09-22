let turn = "O";
const rows = [];
let result = "";

function winLose() {
  console.log(rows);
  for (let i = 0; i < 3; i++) {
    if (
      (rows[0][i].innerHTML === turn &&
        rows[1][i].innerHTML === turn &&
        rows[2][i].innerHTML === turn) ||
      (rows[i][0].innerHTML === turn &&
        rows[i][1].innerHTML === turn &&
        rows[i][2].innerHTML === turn)
    ) {
      return 1;
    }
  }
  if (
    (rows[0][0].innerHTML === turn &&
      rows[1][1].innerHTML === turn &&
      rows[2][2].innerHTML === turn) ||
    (rows[0][2].innerHTML === turn &&
      rows[1][1].innerHTML === turn &&
      rows[2][0].innerHTML === turn)
  ) {
    return 1;
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!rows[i][j].innerHTML) {
        return;
      }
    }
  }
  return 2;
}

const $table = document.createElement("table");
for (let i = 0; i < 3; i++) {
  const cells = [];
  const $tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const $td = document.createElement("td");
    $td.addEventListener("click", (event) => {
      if (result) {
        return;
      }
      if (event.target.textContent) {
        return;
      }

      event.target.textContent = turn;
      result = winLose();
      if (result === 1) {
        const $result = document.createElement("div");
        const $resultText = document.createTextNode(
          `${turn}플레이어가 이겼습니다.`
        );
        $result.append($resultText);
        document.body.append($result);
      } else if (result === 2) {
        const $result = document.createElement("div");
        const $resultText = document.createTextNode("무승부");
        $result.append($resultText);
        document.body.append($result);
      }
      turn = turn === "O" ? "X" : "O";
    });
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
document.body.append($table);
