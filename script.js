let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandText = document.getElementById('current-operand');
const previousOperandText = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandText.innerText = currentOperand;
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteDigit() {
    if (currentOperand.length === 1 || currentOperand === 'Error') {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}
