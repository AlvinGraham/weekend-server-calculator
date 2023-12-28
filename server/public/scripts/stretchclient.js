

console.log('stretchClient.js is sourced!');


// global DOM Elements

const plusBtnEle = document.getElementById('plusBtn');
const minusBtnEle = document.getElementById('minusBtn');
const timesBtnEle = document.getElementById('timesBtn');
const divideBtnEle = document.getElementById('divideBtn');
const expInputEle = document.getElementById('expInput');


console.log(plusBtnEle, minusBtnEle,timesBtnEle, divideBtnEle);
console.log(expInputEle, expInputEle.value);

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
          <a onclick="recallExp(event)">
          ${item.numOne} ${item.operator} ${item.numTwo} = ${item.result}
          </a>
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
  let currentOperation;
  let numOne, numTwo; 
  let resultExp;
  let inputExp = expInputEle.value;
  let opPos;

  // Parse inputExp
    // find operator
  if (inputExp.indexOf('+') !== -1) {
    opPos = inputExp.indexOf('+');
  } else if (inputExp.indexOf('-') !== -1) {
    opPos = inputExp.indexOf('-');
  } else if (inputExp.indexOf('*') !== -1) {
    opPos = inputExp.indexOf('*');
  } else if (inputExp.indexOf('/') !== -1) {
    opPos = inputExp.indexOf('/');
  } else {
    console.error('Error: No valid operator found:', inputExp);
  }

  //assemble payload
  currentOperation = inputExp.slice(opPos, opPos+1);
  numOne = (inputExp.slice(0, opPos)).trim();
  numTwo = (inputExp.slice(opPos+1)).trim();
  resultExp = {numOne: numOne, numTwo: numTwo, operator: currentOperation};
  console.log(numOne, currentOperation, numTwo);
  
  //data validation

  if (currentOperation !== '+' && currentOperation !== '-' 
      && currentOperation !== '/' && currentOperation !== '*') {
        alert('Invalid operator.  Please include +, -, /, or * operator!');
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

// key button selection
function keyBtnClk (op, event) {
  event.preventDefault();
  console.log('In keyBtnClk function');
  expInputEle.value += op;
  // console.log('op:', op, '\nvalue:');
  return;
}


function clearForm (event) {
  event.preventDefault();

  //clear form
  expInputEle.value = null;
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

function recallExp(event) {
  event.preventDefault();
  console.log('In recall function');
  let resultStr = null;
  // get expression string
  let expStr = event.target.innerHTML.trim();
  console.log("'" + expStr + "'", expStr.length);
    //isolate numbers and operator
  let expArr = expStr.split(' ');
  console.log(expArr);

  // populate data entry area
  expInputEle.value = expArr[0] + expArr[1] + expArr[2];
  currentResultWindowEle = document.getElementById('currentResultWindow');
  currentResultWindowEle.innerHTML = null;
  return;
}

