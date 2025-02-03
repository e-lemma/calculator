let operator;
const numbers = [];

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
      if (numbers.length === 2) {
        result = evalAndDisplay();
        numbers.shift();
        numbers.push(parseInt(result));
        clearDigitArray(pressedDigitsArray);
      } else if (numbers.length === 1) {
        storeNumber();
        result = evalAndDisplay();
        numbers.length = 0;
        numbers.push(parseInt(result));
      } else {
        storeNumber();
      }
      operator = button.textContent;
    })
  );
}

function resetVariables() {
  numbers.length = 0;
  operator = undefined;
}

function addClearBtnListener() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    resetVariables();
    clearDigitArray(pressedDigitsArray);
    updateDisplay(displayDiv, pressedDigitsArray);
  });
}

function storeNumber() {
  if (pressedDigitsArray.length > 0) {
    numberB = parseInt(pressedDigitsArray.join(""));
  } else {
    numberB = 0;
  }
  numbers.push(parseInt(numberB));
  clearDigitArray(pressedDigitsArray);
}

function addEqualsBtnListener() {
  const equalsBtn = document.querySelector(".equals");
  equalsBtn.addEventListener("click", () => {
    if (pressedDigitsArray.length == 0) {
      if (numbers.length === 1) {
        storeNumber();
        result = evalAndDisplay();
        numbers.length = 0;
        numbers.push(parseInt(result));
      } else if (numbers.length === 2) {
        result = evalAndDisplay();
        clearDigitArray(pressedDigitsArray);
        numbers.shift();
        numbers.push(parseInt(result));
      }
    } else {
      // do nothing
    }
  });
}

function evalAndDisplay() {
  numberA = numbers[0];
  numberB = numbers[1];
  result = operate(numberA, operator, numberB);
  displayDiv.textContent = result;
  return result;
}

const displayDiv = document.querySelector(".display");
const pressedDigitsArray = ["0"];
addDigitListeners();
addClearBtnListener();
addOperatorListeners();
addEqualsBtnListener();
