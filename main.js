let operator;
let numbers = [];
const inputtedDigits = ["0"];

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

function updateDisplay(displayElement, valueToDisplay) {
  displayElement.textContent = valueToDisplay;
}

function processDigits(arrayOfDigits) {
  return arrayOfDigits.join("");
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
      addDigitToArray(button.textContent, inputtedDigits);
      updateDisplay(displayDiv, processDigits(inputtedDigits));
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
        clearDigitArray(inputtedDigits);
      } else if (numbers.length === 1) {
        storeNumber();
        clearDigitArray(inputtedDigits);
        result = evalAndDisplay();
        numbers.length = 0;
        numbers.push(parseInt(result));
      } else {
        storeNumber();
        clearDigitArray(inputtedDigits);
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
    clearDigitArray(inputtedDigits);
    updateDisplay(displayDiv, processDigits(inputtedDigits));
  });
}

function storeNumber() {
  if (inputtedDigits.length > 0) {
    numberB = parseInt(inputtedDigits.join(""));
  } else {
    numberB = 0;
  }
  numbers.push(parseInt(numberB));
}

function addEqualsBtnListener() {
  const equalsBtn = document.querySelector(".equals");
  equalsBtn.addEventListener("click", () => {
    if (inputtedDigits[0] === "0") {
      // do nothing
    } else {
      console.log(inputtedDigits.length);
      console.log(inputtedDigits);
      if (numbers.length === 1) {
        storeNumber();
        clearDigitArray(inputtedDigits);
        result = evalAndDisplay();
        numbers = [parseInt(result)];
      } else if (numbers.length === 2) {
        result = evalAndDisplay();
        clearDigitArray(inputtedDigits);
        numbers.shift();
        numbers.push(parseInt(result));
      }
    }
  });
}

function evalAndDisplay() {
  const numberA = numbers[0];
  const numberB = numbers[1];
  const result = operate(numberA, operator, numberB);
  updateDisplay(displayDiv, result);
  return result;
}

const displayDiv = document.querySelector(".display");
addDigitListeners();
addClearBtnListener();
addOperatorListeners();
addEqualsBtnListener();
