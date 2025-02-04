let currentInput = "";
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
  operands.length = 0;
  currentOperator = undefined;
}

function roundResult(value) {
  return Math.round(value * 100000) / 100000;
}

function storeOperand() {
  if (currentInput !== "") {
    operands.push(parseFloat(currentInput));
  }
}

function computeResult() {
  if (!currentOperator || operands.length < 2) return operands[0];

  const [a, b] = operands;
  const result = applyOperator(a, currentOperator, b);

  if (result === null) return;

  return roundResult(result);
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
      if (currentInput > 0) {
        if (operands.length === 1) {
          storeOperand();
          const result = computeResult();
          if (result !== undefined) {
            updateDisplay(result);
            operands = [result];
          }
        } else {
          storeOperand();
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
    if (!currentOperator || currentInput.length === 0) return;
    storeOperand();
    const result = computeResult();
    if (result !== undefined) {
      updateDisplay(result);
      operands = [result];
    }
    currentInput = "";
  });
}

setupDigitButtons();
setupClearButton();
setupOperatorButtons();
setupEqualsButton();
