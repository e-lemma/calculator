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
    "*": multiply(a, b),
    "/": divide(a, b),
  };

  return operatorMapping[operator];
}

function updateDisplay(displayElement, newNumber) {
  displayElement.textContent = newNumber;
}

function getCurrentDisplayNumber(displayElement) {
  return displayElement.textContent;
}

const displayDiv = document.querySelector(".display");
let currentDisplayNumber = getCurrentDisplayNumber(displayDiv);
