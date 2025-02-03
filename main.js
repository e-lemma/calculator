const currentInput = [];
const displayDiv = document.querySelector(".display");
let currentOperator;
let operands = [];

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
    updateDisplay("Error: Division by 0");
    resetCalculator();
    resetCurrentInput(currentInput);
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
function operate(firstOperand, operator, secondOperand) {
  return operatorMapping[operator](firstOperand, secondOperand);
}

function updateDisplay(value) {
  displayDiv.textContent = value;
}

function formatCurrentInput() {
  return currentInput.join("");
}

function resetCurrentInput() {
  currentInput.length = 0;
}

function clearDisplay() {
  displayDiv.textContent = "0";
}

function appendDigit(digit) {
  currentInput.push(digit);
}

function roundResult(value) {
  return Math.round(value * 100000) / 100000;
}

function addDigitListeners() {
  const digitButtons = document.querySelectorAll(".digit, .zero");
  digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const digit = button.textContent;

      if (currentInput.length === 1 && currentInput[0] === "0") {
        if (digit === "0") {
          return;
        } else {
          resetCurrentInput(currentInput);
        }
      }
      appendDigit(digit, currentInput);
      updateDisplay(formatCurrentInput(currentInput));
    })
  );
}

function setupOperatorButtons() {
  const operatorBtns = document.querySelectorAll(".operator");
  operatorBtns.forEach((button) =>
    button.addEventListener("click", () => {
      if (currentInput.length > 0) {
        if (operands.length === 1) {
          storeOperand();
          const result = computeResult();
          if (result !== undefined) {
            updateDisplay(result);
            operands = [parseFloat(result)];
          }
        } else {
          storeOperand();
        }
      }
      currentOperator = button.textContent;
      resetCurrentInput(currentInput);
    })
  );
}

function resetCalculator() {
  operands.length = 0;
  currentOperator = undefined;
}

function setupClearButton() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    resetCalculator();
    resetCurrentInput(currentInput);
    clearDisplay(displayDiv);
  });
}

function storeOperand() {
  if (currentInput.length > 0) {
    const numberToStore = parseFloat(formatCurrentInput(currentInput));
    operands.push(numberToStore);
  }
}

function setupEqualsButton() {
  const equalsBtn = document.querySelector(".equals");
  equalsBtn.addEventListener("click", () => {
    if (!currentOperator || currentInput.length === 0) return;
    storeOperand();
    const result = computeResult();
    if (result !== undefined) {
      updateDisplay(result);
      operands = [parseFloat(result)];
    }
    resetCurrentInput(currentInput);
  });
}

function computeResult() {
  if (!currentOperator || operands.length < 2) return operands[0];

  const [a, b] = operands;
  const result = operate(a, currentOperator, b);

  if (result === null) return;

  return roundResult(result);
}

addDigitListeners();
setupClearButton();
setupOperatorButtons();
setupEqualsButton();
