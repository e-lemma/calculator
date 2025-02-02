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
    "&times": multiply(a, b),
    "&divide": divide(a, b),
  };

  return operatorMapping[operator];
}

function updateDisplay(displayElement, arrayOfDigits) {
  displayElement.textContent = arrayOfDigits.join("");
}

function clearDigitArray(digitArray) {
  digitArray.length = 0;
}

function addDigitToArray(digit, array) {
  if (array[0] === "0") {
    // remove leading zero
    array = [];
  }
  array.push(digit);
  return array;
}

function addDigitListeners() {
  const digitButtons = document.querySelectorAll(".digit, .zero");
  digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
      pressedDigitsArray = addDigitToArray(
        button.textContent,
        pressedDigitsArray
      );
      updateDisplay(displayDiv, pressedDigitsArray);
    })
  );
}
function addClearBtnListener() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    clearDigitArray();
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
