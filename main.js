const inputtedDigits = [];
const displayDiv = document.querySelector(".display");
let operator;
let numbers = [];

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
    updateDisplay(displayDiv, "Error: Division by 0");
    resetVariables();
    clearDigitArray(inputtedDigits);
    return null;
  } else {
    return a / b;
  }
}

const operatorMapping = {
  "+": add,
  "-": subtract,
  "×": multiply,
  "÷": divide,
};
function operate(a, operator, b) {
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

function clearDisplay(displayElement) {
  displayElement.textContent = "0";
}

function addDigitToArray(digit, array) {
  if (array[0] === "0") {
    // remove leading zero
    array.shift();
  }
  array.push(digit);
}

function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}

function addDigitListeners() {
  const digitButtons = document.querySelectorAll(".digit, .zero");
  digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const digit = button.textContent;

      if (inputtedDigits.length === 1 && inputtedDigits[0] === "0") {
        if (digit === "0") {
          return;
        } else {
          clearDigitArray(inputtedDigits);
        }
      }
      addDigitToArray(digit, inputtedDigits);
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
    clearDisplay(displayDiv);
  });
}

function storeNumber() {
  if (inputtedDigits.length > 0) {
    const numberToStore = parseFloat(processDigits(inputtedDigits));
    numbers.push(numberToStore);
  }
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
  if (!operator || numbers.length < 2) return numbers[0];
  const numberA = numbers[0];
  const numberB = numbers[1];
  const result = operate(numberA, operator, numberB);
  if (result === null) {
    return;
  }
  return roundResult(result);
}

const displayDiv = document.querySelector(".display");
addDigitListeners();
addClearBtnListener();
addOperatorListeners();
addEqualsBtnListener();
