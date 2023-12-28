const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/calculations', (req, res) => {
  console.log('Sending calculations:');
  console.table(calculations);
  res.send(calculations);
});

// POST /calculations

app.post('/calculations', (req , res) => {
  console.log('In /calculations POST (received):');
  console.table(req.body);
  let result;
  const numOne = req.body.numOne;
  const numTwo = req.body.numTwo;
  const operator = req.body.operator;

  // data validation
  if (!numOne || !numTwo) {
    console.error('Error. Missing operand.');
    res.sendStatus(403);
    return;
  }
  
  if (isNaN(+numOne) || isNaN(+numTwo)) {
    console.error('Error. Both operands must be numbers.');
    console.error('numOne type:', numOne, (typeof +numOne), 
      '\nnumTwo type:', numTwo, (typeof +numTwo));
    res.sendStatus(403);
    return;
  } 

  // Evaluate expression
  switch (operator) {
    case '+':
      result = +numOne + +numTwo;
      break;
    case '-':
      result = +numOne - +numTwo;
      break;
    case '/':
      result = +numOne / +numTwo;
      break;
    case '*':
      result = +numOne * +numTwo;
      break;
    default:
      // operand data validation
      console.error('No Valid Operator. Must be +, -, *, or /.');
      res.sendStatus(403);
      return;
  }
  // console.log('Result:', result);

  calculations.push({numOne: numOne, numTwo: numTwo, operator: operator, result: result});
  // console.table(calculations);

  res.sendStatus(201);
});

// DELETE /calculations
app.delete('/calculations', (req, res) => {
  console.log('In /calculations DELETE.');

  calculations = [];
  console.log('calculations deleted. New calculations array:', calculations);

  res.sendStatus(200);
  return;
});


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
