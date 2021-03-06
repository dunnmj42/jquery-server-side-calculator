const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

let history = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("server/public"));

app.post("/calculate", (req, res) => {
  let equation = req.body;

  console.log(equation);
  calculate(equation);
  console.log(history);
  res.sendStatus(201);
});

app.get("/calculate", (req, res) => {
  res.send(history);
});

app.delete("/history", (req, res) => {
  history = [];
  res.send(history);
});

// evaluation function: This could have probably been the switch statement that
// I always forget about, and it would have been a little more terse. Maybe.

function calculate(equation) {
  let operator = equation.operator;
  let firstNum = Number(equation.firstNum);
  let secondNum = Number(equation.secondNum);
  let result;

  if (operator === "+") {
    result = firstNum + secondNum;
  } else if (operator === "-") {
    result = firstNum - secondNum;
  } else if (operator === "*") {
    result = firstNum * secondNum;
  } else {
    result = firstNum / secondNum;
  }

  equation.result = result;
  history.push(equation);
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
