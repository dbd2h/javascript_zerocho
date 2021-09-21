let turn = "O";
const rows = [];
let result = "";

/*
winLose 함수 구현
같은거 세개 있는지 확인법
한줄이라도 다 같은게 있으면 됨
rows[0][0]=rows[0][1]=rows[0][2]이런거나
rows[0][0]=rows[1][0]=rows[2][0]
rows[0][0]=rows[1][1]=rows[2][2]
rows[0][2]=rows[1][1]=rows[2][0] */

function winLose() {
  for (let i = 0; i < 3; i++) {
    const vertical = rows[0][i];
    const horizontal = rows[i][0];
    let hor = 0;
    let ver = 0;
    for (let j = 0; j < 3; j++) {
      if (!rows[i][j].innerHTML) {
        break;
      }
      if (horizontal.innerHTML !== rows[i][j].innerHTML) {
        break;
      }

      hor += 1;
    }
    for (let j = 0; j < 3; j++) {
      if (!rows[j][i].innerHTML) {
        break;
      }
      if (vertical.innerHTML !== rows[j][i].innerHTML) {
        break;
      }
      ver += 1;
    }
    if (hor === 3 || ver === 3) {
      return 1;
    }
  }
  const diagonal = rows[0][0];
  let dia = 0;
  for (let i = 0; i < 3; i++) {
    if (!rows[i][i].innerHTML) {
      break;
    }
    if (diagonal.innerHTML !== rows[i][i].innerHTML) {
      break;
    }
    dia += 1;
  }
  const diffdiagonal = rows[0][2];
  let dif = 0;
  for (let i = 0; i < 3; i++) {
    if (!rows[i][2 - i].innerHTML) {
      break;
    }
    if (diffdiagonal.innerHTML !== rows[i][2 - i].innerHTML) {
      break;
    }
    dif += 1;
  }
  if (dia === 3 || dif === 3) {
    return 1;
  }
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
      if (result) {
        const $result = document.createElement("div");
        const $resultText = document.createTextNode(
          `${turn}플레이어가 이겼습니다.`
        );
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
