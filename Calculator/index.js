let buffer = "0",
  runningTotal = 0,
  prevOperator = null;

let ans = document.querySelector("span");
let rows = document.querySelectorAll(".row");

rows.forEach((row, i) => {
  if (i != 0) {
    row.addEventListener("click", e => {
      buttonHandler(e.target.innerText);
    });
  }
});

const buttonHandler = ch => {
  const oprRegEx = new RegExp("[Cx/*\\-+=]");
  const opRegEx = new RegExp("[0-9]");
  if (oprRegEx.test(ch)) {
    operatorHandler(ch);
  } else {
    operandHandler(ch);
  }
};

const operatorHandler = opr => {
  switch (opr) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      prevOperator = null;
      break;
    case "x":
      if (buffer.length !== 1 && buffer !== "Infinity" && buffer !== "NaN")
        buffer = buffer.slice(0, -1);
      else buffer = "0";
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      prevOperator = null;
      buffer = `${runningTotal}`;
      runningTotal = 0;
      break;
    default:
      handleMath(opr);
  }
  render();
};

const operandHandler = op => {
  if (buffer === "0") {
    buffer = op;
  } else {
    buffer += op;
  }
  console.log(buffer);
  render();
};

const render = () => {
  ans.innerText = buffer;
};

const handleMath = opr => {
  const bufferInt = parseInt(buffer);
  if (runningTotal === 0) runningTotal = bufferInt;
  else flushOperation(bufferInt);
  prevOperator = opr;
  buffer = "0";
};

const flushOperation = num => {
  switch (prevOperator) {
    case "+":
      runningTotal += num;
      break;
    case "-":
      runningTotal -= num;
      break;
    case "*":
      runningTotal *= num;
      break;
    case "/":
      runningTotal /= num;
      break;
  }
};
