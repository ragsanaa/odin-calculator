var result = document.querySelector(".result");
var clear = document.querySelector(".clear");
var sign = document.querySelector(".sign");
var percent = document.querySelector(".percent");
var operator = document.querySelectorAll(".operator");
var number = document.querySelectorAll(".number");
var equal = document.querySelector(".equal");
var decimal = document.querySelector(".decimal");

var currentResult = "";
var currentOperator = "";
var currentNumber = "";

function clearResult() {
  currentResult = "";
  currentOperator = "";
  currentNumber = "";
  updateResult("0");
}

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}

function updateResult(value) {
  if (value.toString().includes('.')) {
    result.innerHTML = parseFloat(value).toFixed(6).replace(/\.?0+$/, '');
  } else {
    result.innerHTML = value;
  }
}

clear.addEventListener("click", clearResult);

number.forEach(function (number) {
  number.addEventListener("click", function () {
    currentNumber += number.value;
    updateResult(currentNumber);
  });
});

operator.forEach(function (operator) {
  operator.addEventListener("click", function () {
    if (currentNumber) {
      if (currentResult) {
        currentResult = operate(currentResult, currentNumber, currentOperator);
        updateResult(currentResult);
        currentNumber = "";
      } else {
        currentResult = currentNumber;
        currentNumber = "";
      }
    }
    currentOperator = operator.value;
  });
});

equal.addEventListener("click", function () {
  if (currentNumber) {
    currentResult = operate(currentResult, currentNumber, currentOperator);
    updateResult(currentResult);
    currentNumber = "";
    currentOperator = "";
  }
});

sign.addEventListener("click", function () {
  if (currentNumber) {
    currentNumber = -currentNumber;
    updateResult(currentNumber);
  }
});

percent.addEventListener("click", function () {
  if (currentNumber) {
    currentNumber = currentNumber / 100;
    updateResult(currentNumber);
  }
});

decimal.addEventListener("click", function () {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    updateResult(currentNumber);
  }
});

window.addEventListener("keydown", function (e) {
  if (e.shiftKey && e.keyCode === 53) {
    percent.click();
  } else if (e.shiftKey && e.keyCode === 56) {
    const key = document.querySelector(`button[value='*']`);
    if (key) {
      key.click();
    }
  } else {
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    if (key) {
      key.click();
    }
  }
});

clearResult();
