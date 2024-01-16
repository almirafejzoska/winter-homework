const result = document.getElementById('result');

function appendCharacter(character) {
    result.value += character;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function appendOperator(operator) {
    const lastChar = result.value.charAt(result.value.length - 1);
    if (!isOperator(lastChar)) {
        appendCharacter(operator);
    }
}
function removeOne() {
    result.value = result.value.slice(0, -1);
}
function calculate() {
    const calculation = result.value;
    const sanitizedCalculation = calculation.replace(/[^-\d/*+.]/g, '');

    try {
        const evaluatedResult = new Function('return ' + sanitizedCalculation)();
        result.value = evaluatedResult.toLocaleString();
    } catch (error) {
        result.value = 'Error';
    }
}

function clearResult() {
    result.value = '';
}
