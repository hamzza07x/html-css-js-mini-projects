let currentInput = '0';
let shouldReset = false;

function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else if (currentInput !== '0') {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (!isNaN(currentInput.slice(-1))) {
        currentInput += operator;
        shouldReset = false;
        updateDisplay();
    }
}

function calculate() {
    try {
        currentInput = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*')).toString();
    } catch (e) {
        currentInput = 'Error';
    }
    updateDisplay();
    shouldReset = true;
}
