

console.log('client.js is sourced!');

// global variables
let currentOperation;

// global DOM Elements

const plusBtnEle = document.getElementById('plusBtn');
const minusBtnEle = document.getElementById('minusBtn');
const timesBtnEle = document.getElementById('timesBtn');
const divideBtnEle = document.getElementById('divideBtn');
const numOneEle = document.getElementById('numOne');
const numTwoEle = document.getElementById('numTwo');
console.log(plusBtnEle, minusBtnEle,timesBtnEle, divideBtnEle);
console.log(numOneEle, numTwoEle);

renderHistoryResults();

function renderHistoryResults () {
  console.log('Render Results to DOM');
  const historyWindowEle = document.getElementById('historyWindow');
  const currentResultWindowEle = document.getElementById('currentResultWindow');
  
  // clear history  and curret results window
  historyWindowEle.innerHTML = null;
  currentResultWindowEle.innerHTML = null;
  
  axios({
    method: 'GET',
    url: '/calculations'
  })
  .then((response) => {
    console.log('In GET route:');
    console.table(response.data);

    // render current result to DOM
    if (response.data.length > 0) {
    currentResultWindowEle.innerHTML = response.data[response.data.length - 1].result;
    }

    // render history to DOM
    for (let item of response.data) {
      historyWindowEle.innerHTML += `
        <li>
          ${item.numOne} ${item.operator} ${item.numTwo} = ${item.result}
        </li>`;
    }

    return;

  })
  .catch((error) => {
    console.error('Error in GET Route:', error);
  });
}

function equalsBtnClk(event) {
  event.preventDefault();
  console.log('Equals Button Clicked');

  //assemble data
  let numOne = numOneEle.value;
  let numTwo = numTwoEle.value;
  let resultExp = {numOne: numOne, numTwo: numTwo, operator: currentOperation};
  
  //data validation
  if (currentOperation !== '+' && currentOperation !== '-' 
      && currentOperation !== '/' && currentOperation !== '*') {
        alert('Invalid operator.  Please select +, -, /, or * button!');
        console.error('Invalid operator.  Current operator:', currentOperation);
        return;
      }
  if ((isNaN(numOne) || isNaN(numTwo)) || (!numOne || !numTwo)){
    alert('Operand inputs must be numbers!');
    console.error('Invalid operands (not numbers).  numOne:', numOne, 'numTwo:', numTwo);
    return;
  }

  // POST results to server
  axios({
    method: 'POST',
    url: '/calculations',
    data: resultExp
  })
  .then((response) => {
    // Render Results
    renderHistoryResults();

    //clear form
    clearForm(event);


    return;
  })
  .catch((error) => {
    console.log('Error in POST Route:', error);
  });

}

// operator button selection
function opBtnClk (op, event) {
  event.preventDefault();
  
  // clear and set operator buttonand buttons
  clearBtns();
  switch (op) {
    case '+':
      plusBtnEle.classList.add('clicked');
      break;
    case '-':
      minusBtnEle.classList.add('clicked');
      break;
    case '*':
      timesBtnEle.classList.add('clicked');
      break;
    case '/':
      divideBtnEle.classList.add('clicked');
      break;
    default:
      console.error('No operation button selected');
  }
  // set operator
  currentOperation = op;
  return;
}

function clearBtns () {
  plusBtnEle.classList.remove('clicked');
  minusBtnEle.classList.remove('clicked');
  timesBtnEle.classList.remove('clicked');
  divideBtnEle.classList.remove('clicked');
  return;
}

function clearForm (event) {
  event.preventDefault();
  console.log(event);
  //clear form
  numOneEle.value = null;
  numTwoEle.value = null;
  clearBtns();
}

function clrHistory(event) {
  event.preventDefault();

  axios({
    method: 'DELETE',
    url: '/calculations'
  })
  .then((response) => {
    console.log('Calculation History Deleted');
    renderHistoryResults();
    return;
  })
  .catch((error) => {
    console.error('Error in /calculation DELETE route');
  });
}

