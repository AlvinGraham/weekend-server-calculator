

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
    currentResultWindowEle.innerHTML = response.data[response.data.length - 1].result;
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

