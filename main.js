let currentInput = "";
const displayDiv = document.querySelector(".display");
let currentOperator;
let previousValue = "";
let currentValue = "";

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
    currentInput = "";
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

function applyOperator(firstOperand, operator, secondOperand) {
  console.log(operator);
  return operatorMapping[operator](firstOperand, secondOperand);
}

function updateDisplay(value) {
  displayDiv.textContent = value;
}

function clearDisplay() {
  displayDiv.textContent = "0";
}

function resetCalculator() {
  currentValue = "";
  previousValue = "";
  currentOperator = undefined;
}

function roundResult(value) {
  return Math.round(value * 100000) / 100000;
}

function shortenResult(value) {
  if (Math.abs(value) >= 10 ** 12) {
    return value.toExponential(5);
  }
  return value;
}

function storeCurrentValue() {
  if (currentInput !== "") {
    currentValue = currentInput;
  }
}

function moveCurrentValueToPrevious() {
  previousValue = currentValue;
  currentValue = "";
}

function computeResult() {
  console.log("computing result");
  if (!currentOperator || previousValue === "") return currentValue;

  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  const result = applyOperator(a, currentOperator, b);

  if (result === null) return;

  return shortenResult(roundResult(result));
}

function handleNumberInput(value) {
  if (currentInput === "0") {
    if (value === "0") return;
    currentInput = "";
  }
  currentInput += value;
  updateDisplay(currentInput || "0");
}

function handleOperatorInput(operator) {
  if (currentInput !== "") {
    if (currentValue !== "") {
      moveCurrentValueToPrevious();
      storeCurrentValue();
      const result = computeResult();
      if (result !== undefined) {
        updateDisplay(result);
        previousValue = "";
        currentValue = result;
      }
    } else {
      storeCurrentValue();
    }
  }
  currentOperator = operator;
  currentInput = "";
}

function handleDecimalInput() {
  if (!currentInput.includes(".")) {
    currentInput += currentInput === "" ? "0." : ".";
    updateDisplay(currentInput);
  }
}

function handleBackspace() {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

function handleClear() {
  resetCalculator();
  currentInput = "";
  clearDisplay();
}

function handleEquals() {
  if (!currentOperator || currentInput === "") return;
  moveCurrentValueToPrevious();
  storeCurrentValue();
  const result = computeResult();
  if (result !== undefined) {
    updateDisplay(result);
    previousValue = "";
    currentValue = result;
  }
  currentInput = "";
}

function setupDigitButtons() {
  document.querySelectorAll(".digit, .zero").forEach((button) => {
    button.addEventListener("click", () =>
      handleNumberInput(button.textContent)
    );
  });
}

function setupOperatorButtons() {
  document.querySelectorAll(".operator").forEach((button) => {
    button.addEventListener("click", () =>
      handleOperatorInput(button.textContent)
    );
  });
}

function setupDecimalButton() {
  document
    .querySelector(".decimal")
    .addEventListener("click", handleDecimalInput);
}

function setupBackspaceButton() {
  document
    .querySelector(".backspace")
    .addEventListener("click", handleBackspace);
}

function setupClearButton() {
  document.querySelector(".clear").addEventListener("click", handleClear);
}

function setupEqualsButton() {
  document.querySelector(".equals").addEventListener("click", handleEquals);
}

function setupKeyboardSupport() {
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const operatorMap = { "/": "÷", "*": "×", "-": "-", "+": "+" };

    if (!isNaN(key)) {
      handleNumberInput(key);
    } else if (operatorMap[key]) {
      handleOperatorInput(operatorMap[key]);
    } else if (key === ".") {
      handleDecimalInput();
    } else if (key === "Enter") {
      handleEquals();
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key === "Escape") {
      handleClear();
    }
  });
}

setupDigitButtons();
setupClearButton();
setupOperatorButtons();
setupEqualsButton();
setupDecimalButton();
setupBackspaceButton();
setupKeyboardSupport();
