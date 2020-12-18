const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;


app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

app.post('/calculate', (req, res) => {

    let equation = req.body;
  
    console.log(equation);

    calculate(equation);

    console.log(history);
  
    res.sendStatus(201);
  
});

let history = [];

function calculate(equation) {
    let opperator = equation.opperator
    let firstNum = equation.firstNum;
    let secondNum = equation.secondNum;
    let result;

    if (opperator === '+') {
        result = firstNum + secondNum
    } else if (opperator === '-'){
        result = firstNum - secondNum
    } else if (opperator === '*'){
        result = firstNum * secondNum
    } else {
        result = firstNum / secondNum
    }

    equation.result = result;
    history.push(equation)
    
}

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
});