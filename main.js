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

function setupDigitButtons() {
  const digitButtons = document.querySelectorAll(".digit, .zero");
  digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const digit = button.textContent;

      if (currentInput === "0") {
        if (digit === "0") return;
        currentInput = "";
      }
      currentInput += digit;
      updateDisplay(currentInput || "0");
    })
  );
}

function setupOperatorButtons() {
  const operatorBtns = document.querySelectorAll(".operator");
  operatorBtns.forEach((button) =>
    button.addEventListener("click", () => {
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
      currentOperator = button.textContent;
      currentInput = "";
    })
  );
}

function setupClearButton() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    resetCalculator();
    currentInput = "";
    clearDisplay();
  });
}

function setupEqualsButton() {
  const equalsBtn = document.querySelector(".equals");
  equalsBtn.addEventListener("click", () => {
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
  });
}

setupDigitButtons();
setupClearButton();
setupOperatorButtons();
setupEqualsButton();
