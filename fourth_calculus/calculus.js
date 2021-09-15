let numOne = "";
let operator = "";
let numTwo = "";
const $result = document.querySelector(".calculus__screen");
const $operator = document.querySelector(".calculus__operator");
const onClickNumber = function (number) {
  return () => {
    if (!operator) {
      numOne += number;
      $result.value += number;
      return;
    }
    if (!numTwo) {
      $result.value = "";
    }
    numTwo += number;
    $result.value += number;
  };
};

const onClickOperator = function (op) {
  return () => {
    if (numTwo) {
      switch (operator) {
        case "+":
          numOne = parseInt(numOne) + parseInt(numTwo);
          break;
        case "-":
          numOne = parseInt(numOne) - parseInt(numTwo);
          break;
        case "x":
          numOne = parseInt(numOne) * parseInt(numTwo);
          break;
        case "÷":
          numOne = parseInt(numOne) / parseInt(numTwo);
          break;
      }
      numTwo = "";
    }
    if (numOne) {
      operator = op;
      $operator.value = op;
    } else {
      alert("숫자를 먼저 입력하세요");
    }
  };
};

document //7
  .querySelector(".calculus__division:nth-child(2)>div:nth-child(1)")
  .addEventListener("click", onClickNumber("7"));

document //8
  .querySelector(".calculus__division:nth-child(2)>div:nth-child(2)")
  .addEventListener("click", onClickNumber("8"));

document //9
  .querySelector(".calculus__division:nth-child(2)>div:nth-child(3)")
  .addEventListener("click", onClickNumber("9"));

document //+
  .querySelector(".calculus__division:nth-child(2)>div:nth-child(4)")
  .addEventListener("click", onClickOperator("+"));
document //4
  .querySelector(".calculus__division:nth-child(3)>div:nth-child(1)")
  .addEventListener("click", onClickNumber("4"));

document //5
  .querySelector(".calculus__division:nth-child(3)>div:nth-child(2)")
  .addEventListener("click", onClickNumber("5"));

document //6
  .querySelector(".calculus__division:nth-child(3)>div:nth-child(3)")
  .addEventListener("click", onClickNumber("6"));

document //-
  .querySelector(".calculus__division:nth-child(3)>div:nth-child(4)")
  .addEventListener("click", onClickOperator("-"));
document //1
  .querySelector(".calculus__division:nth-child(4)>div:nth-child(1)")
  .addEventListener("click", onClickNumber("1"));

document //2
  .querySelector(".calculus__division:nth-child(4)>div:nth-child(2)")
  .addEventListener("click", onClickNumber("2"));

document //3
  .querySelector(".calculus__division:nth-child(4)>div:nth-child(3)")
  .addEventListener("click", onClickNumber("3"));

document //나누기
  .querySelector(".calculus__division:nth-child(4)>div:nth-child(4)")
  .addEventListener("click", onClickOperator("÷"));
document //C
  .querySelector(".calculus__division:nth-child(5)>div:nth-child(1)")
  .addEventListener("click", () => {
    numOne = "";
    numTwo = "";
    operator = "";
    $result.value = "";
    $operator.value = "";
  });
document //0
  .querySelector(".calculus__division:nth-child(5)>div:nth-child(2)")
  .addEventListener("click", onClickNumber("0"));

document //=
  .querySelector(".calculus__division:nth-child(5)>div:nth-child(3)")
  .addEventListener("click", () => {
    if (!numTwo) {
      alert("첫번째숫자, 연산자, 두번째숫자 순으로 입력하여주십시오");
      return;
    }
    switch (operator) {
      case "+":
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case "-":
        $result.value = parseInt(numOne) - parseInt(numTwo);
        break;
      case "x":
        $result.value = parseInt(numOne) * parseInt(numTwo);
        break;
      case "÷":
        $result.value = parseInt(numOne) / parseInt(numTwo);
        break;
    }
  });
document //x
  .querySelector(".calculus__division:nth-child(5)>div:nth-child(4)")
  .addEventListener("click", onClickOperator("x"));
