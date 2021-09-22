let turn = "O";
const rows = [];
let finish = "";

function winLose(target) {
  const hor = Array.from(target.parentNode.parentNode.children).indexOf(
    target.parentNode
  );
  const ver = Array.from(target.parentNode.children).indexOf(target);
  if (
    (rows[hor][0].innerHTML === turn &&
      rows[hor][1].innerHTML === turn &&
      rows[hor][2].innerHTML === turn) ||
    (rows[0][ver].innerHTML === turn &&
      rows[1][ver].innerHTML === turn &&
      rows[2][ver].innerHTML === turn)
  ) {
    return 1;
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
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    return 2;
  }
}

function computerPlay() {
  const computerPick = Math.floor(Math.random() * flatRows.length);
  const flatRowsTag = flatRows[computerPick];
  flatRowsTag.textContent = turn;
  flatRows.splice(flatRows.indexOf(flatRows[computerPick]), 1);
  return flatRowsTag;
}

function resultRecord() {
  if (finish === 1) {
    const $result = document.createElement("div");
    const $resultText = document.createTextNode(`${turn}승리`);
    $result.append($resultText);
    document.body.append($result);
  }
  if (finish === 2) {
    const $result = document.createElement("div");
    const $resultText = document.createTextNode(`무승부`);
    $result.append($resultText);
    document.body.append($result);
  }
  turn = turn === "O" ? "X" : "O";
}

function callBack(event) {
  if (finish || turn === "X") {
    return;
  }
  if (event.target.textContent) {
    return;
  }
  event.target.textContent = turn;
  flatRows.splice(flatRows.indexOf(event.target), 1);
  finish = winLose(event.target);
  resultRecord();
  if (turn === "X" && !finish) {
    setTimeout(() => {
      const tag = computerPlay();
      finish = winLose(tag);
      resultRecord();
    }, 1000);
  }
}

const $table = document.createElement("table");
for (let i = 0; i < 3; i++) {
  const cells = [];
  const $tr = document.createElement("tr");
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener("click", callBack);
document.body.append($table);
const flatRows = rows.flat();
