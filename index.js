let result = '0';
let pendingOperation = '';
let givenNumber = '';
let freshCalculation = true;
let buttons = document.querySelectorAll('button');
let output = document.getElementById('output');
output.textContent = result;

function displayNumber(num) {
  (num.length > 9) ? output.textContent = Number(num).toExponential(2)
                   : output.textContent = num;
}

function onClickedNumber(num) {
  if (givenNumber.length === 9) return;
  (givenNumber == '0') ? givenNumber = num : givenNumber += num; 
  displayNumber(givenNumber);
  freshCalculation = false;
}

function onClickedOperator(op) {
  if (freshCalculation) {
    if (op != '-') return;
    if (givenNumber.length == 0) {
      givenNumber = '-';
      return;
    }
    return;
  } 
  result = operate(result, givenNumber, pendingOperation);
  console.log(result);
  pendingOperation = op;
  givenNumber = '';
  displayNumber(result);
}

add = (num1, num2) => String(Number(num1) + Number(num2));
subtract = (num1, num2) => String(Number(num1) - Number(num2));
multiply = (num1, num2) => String(Number(num1) * Number(num2));
divide = (num1, num2) => String(Number(num1) / Number(num2)); 

function operate(num1, num2, op) {
  if(op === '+') return add(num1,num2);    
  else if(op === '-') return subtract(num1, num2);
  else if(op === 'x') return multiply(num1, num2);
  else if(op === '/') return divide(num1, num2);
  else if (op === '' || op === '=' || op === 'Enter') {
    if (num2.length != 0) return num2;
    return num1;
  } 
}

function onClickedDot(dot) {
  if (givenNumber.includes(dot)) return;
  if (givenNumber === '') givenNumber = '0';
  givenNumber += dot;
  displayNumber(givenNumber);
}

function onClickedPercent() {
  if (givenNumber.length != 0) {
    givenNumber = (Number(givenNumber)/100).toString();
    displayNumber(givenNumber)
    return;
  }
  if (result.length != 0) {
    result = (Number(result)/100).toString();
    displayNumber(result)
    return;
  }  
}

function onClickedToggler(num) {
  if (givenNumber.length != 0) {
    givenNumber = (Number(givenNumber) * -1).toString();
    displayNumber(givenNumber)
    return;
  }
  result = (Number(result) * -1).toString();
  displayNumber(result)
}

function onClickedClear() {
  result = '0';
  pendingOperation = '';
  givenNumber = '';
  freshCalculation = true;
  output.textContent = result;
  displayNumber();
}

function onClickedBackspace() {
  if (givenNumber == '') return;
  (givenNumber.length == 1) ? givenNumber = '0' : givenNumber = givenNumber.slice(0,-1);
  displayNumber(givenNumber);
}

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" 
  ) {
    onClickedNumber(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key == "Enter" || e.key === "=") {
    onClickedOperator(e.key);
  } else if (e.key === "*") {
    onClickedOperator("x");
  } else if (e.key === 'Backspace') {
    onClickedBackspace();
  } else if (e.key === ".") {
    onClickedDot(e.key);
  } else if (e.key === "%") {
    onClickedPercent(e.key);
  } 
});

function onClickedButtons() {
  buttons.forEach(button => {
    button.addEventListener('click',(e)=>{
      if (button.classList.contains('clear')) {
        onClickedClear();
      } else if (button.classList.contains('backspace')) {
        onClickedBackspace();
      } else if (button.classList.contains('toggler')) {
        onClickedToggler(givenNumber);
      } else if (button.classList.contains('num')) {
        onClickedNumber(e.target.value);
      } else if (button.classList.contains('operator')) {
        onClickedOperator(e.target.value); 
      } else if (button.classList.contains('percent')) {
        onClickedPercent();
      } else if (button.classList.contains('decimal')) {
        onClickedDot(e.target.value);
      }
    })
    }  
  );
  }

  onClickedButtons();
