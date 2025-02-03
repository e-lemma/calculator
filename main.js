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
  if (b === 0) {
    alert("Cannot divide by Zero!!");
    resetVariables();
    return "Error";
  }
  return a / b;
}

function operate(a, operator, b) {
  const operatorMapping = {
    "+": add,
    "-": subtract,
    "×": multiply,
    "÷": divide,
  };

  return operatorMapping[operator](a, b);
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
        result = evaluate();
        updateDisplay(displayDiv, result);
        numbers.shift();
        numbers.push(parseFloat(result));
      } else if (numbers.length === 1) {
        storeNumber();
        result = evaluate();
        updateDisplay(displayDiv, result);
      } else {
        storeNumber();
      }
      operator = button.textContent;
      clearDigitArray(inputtedDigits);
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
    numbers.push(parseFloat(processDigits(inputtedDigits)));
  }
  numbers.push(0);
}

function addEqualsBtnListener() {
  const equalsBtn = document.querySelector(".equals");
  equalsBtn.addEventListener("click", () => {
    console.log(numbers);
    if (inputtedDigits[0] === "0") {
      // do nothing
    } else {
      if (numbers.length === 1) {
        storeNumber();
        result = evaluate();
        updateDisplay(displayDiv, result);
      } else if (numbers.length === 2) {
        result = evaluate();
        updateDisplay(displayDiv, result);
        numbers.shift();
        numbers.push(parseFloat(result));
      }
    }
    clearDigitArray(inputtedDigits);
  });
}

function evaluate() {
  const numberA = numbers[0];
  const numberB = numbers[1];
  return operate(numberA, operator, numberB);
}

const displayDiv = document.querySelector(".display");
addDigitListeners();
addClearBtnListener();
addOperatorListeners();
addEqualsBtnListener();
