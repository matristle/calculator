let firstNumber, operatorSign, secondNumber;

const display = document.querySelector('#result-display');

const numberButtons = document.getElementById('number-buttons').childNodes;

for (let i = 0; i < numberButtons.length; i++)
{
    numberButtons[i].addEventListener('click', () => 
    {
        display.textContent = numberButtons[i].textContent;
        secondNumber = display.textContent; 
    });
}

const operatorButtons = document.getElementById('operator-buttons').childNodes;

for (let i = 0; i < operatorButtons.length; i++)
{
    operatorButtons[i].addEventListener('click', () => 
    {
        firstNumber = display.textContent; // stores the first single-digit number entered and displayed, not the operator
        display.textContent = operatorButtons[i].textContent;
        operatorSign = display.textContent;
    });
}

const equalButton = document.getElementById('equal-button');

equalButton.addEventListener('click', () => 
{
    display.textContent = operate(firstNumber, operatorSign, secondNumber);
});

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => 
{
    display.textContent = '';
});




function add(a, b)
{
    return Number(a) + Number(b);
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}


function operate(a, operator, b)
{
    switch(operator)
    {
        case '+':
            return add(a, b);
            break;
         
        case '-':
            return subtract(a, b);
            break;
            
        case 'x' || '*':
            return multiply(a, b);
            break;
        
        case '/':
            return divide(a, b);
            break;
        default:
            return `ERROR`;
    }   
}

