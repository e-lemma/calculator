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
