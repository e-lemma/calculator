let numberA;
let numberB;
let operator;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, operator, b) {
  const operatorMapping = {
    "+": add(a, b),
    "-": subtract(a, b),
    "×": multiply(a, b),
    "÷": divide(a, b),
  };

  return operatorMapping[operator];
}

function updateDisplay(displayElement, arrayOfDigits) {
  displayElement.textContent = arrayOfDigits.join("");
}

function clearDigitArray(digitArray) {
  digitArray.length = 0;
  digitArray.push("0");
}

function addDigitToArray(digit, array) {
  if (array[0] === "0") {
    // remove leading zero
    array.shift();
  }
  array.push(digit);
}

function addDigitListeners() {
  const digitButtons = document.querySelectorAll(".digit, .zero");
  digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
      addDigitToArray(button.textContent, pressedDigitsArray);
      updateDisplay(displayDiv, pressedDigitsArray);
    })
  );
}

function addOperatorListeners() {
  const operatorBtns = document.querySelectorAll(".operator");
  operatorBtns.forEach((button) =>
    button.addEventListener("click", () => {
      storeFirstNumber();
      operator = button.textContent;
      console.log(operator);
    })
  );
}

function addClearBtnListener() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    clearDigitArray(pressedDigitsArray);
    updateDisplay(displayDiv, pressedDigitsArray);
  });
}

function storeFirstNumber() {
  if (pressedDigitsArray.length > 0) {
    numberA = parseInt(pressedDigitsArray.join(""));
  } else {
    numberA = 0;
  }

  clearDigitArray(pressedDigitsArray);
}

const displayDiv = document.querySelector(".display");
const pressedDigitsArray = ["0"];
addDigitListeners();
addClearBtnListener();
addOperatorListeners();
