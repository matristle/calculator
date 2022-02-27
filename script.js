
const display      = document.querySelector('#result-display');
const calcuButtons = document.querySelectorAll('.non-clear-buttons button');
const clearButton  = document.getElementById('clear-button');
const acButton     = document.getElementById('ac-button');

display.textContent = '0';

let expr = 
{
    leftNumber   : '',
    rightNumber  : '',
    operatorSign : '',
    total        : '',
    start        : true,
    operate()
    {   
        switch(this.operatorSign)
        {
            case '+':
                return add(this.leftNumber, this.rightNumber);
                break;
            
            case '-':
                return subtract(this.leftNumber, this.rightNumber);
                break;
                
            case 'x' || '*':
                return multiply(this.leftNumber, this.rightNumber);
                break;
            
            case '/':
                return divide(this.leftNumber, this.rightNumber);
                break;



            default:
                return `ERROR: INVALID OPERATOR`;
        }   
    }
};

calcuButtons.forEach( (button) =>
{
    button.addEventListener('click', () => 
    {
        if (   button.textContent === '=' 
            || button.textContent === '+' 
            || button.textContent === '-' 
            || button.textContent === 'x' 
            || button.textContent === '/')
        {
            if (expr.leftNumber === '0' && expr.operatorSign === '/' && expr.rightNumber === '0')
            {
                display.textContent = `Please don't do that one...`;
                return;
            }
            else if (expr.leftNumber !== '' && expr.rightNumber !== '')
            {
                    expr.leftNumber = expr.operate();
    
                    display.textContent = expr.leftNumber;
                    expr.total = expr.leftNumber;
                    expr.rightNumber = '';
                    expr.operatorSign = '';
               
                if (button.textContent === '=')
                {
                    display.textContent = expr.total;
                    expr.start = true;
                    return;
                }
            }

            if (expr.operatorSign !== '')
            {
                if (button.textContent === '=')
                {
                    display.textContent = expr.leftNumber;
                    expr.operatorSign = '';
                }
                else 
                {
                    display.textContent = display.textContent.replace(/[\+\-\x\/]/, button.textContent);
                }

            }
            else
            {
                display.textContent += ` ${button.textContent}`;
            }

            if (button.textContent !== '=')
            {
                expr.operatorSign = button.textContent;
            }

        }
        else if (button.textContent !== '0' && display.textContent === '0')
        {
            if (countDots(display.textContent) === 0)
            {
                display.textContent = button.textContent;
                expr.leftNumber = button.textContent;
            }
        }
        else if (button.textContent === '⌫')
        {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);


            if (expr.operatorSign === '' && expr.rightNumber === '')
            {
                expr.leftNumber = expr.leftNumber.slice(0, expr.leftNumber.length - 1);
            }
            else if (expr.operatorSign !== '' && expr.rightNumber === '')
            {
                expr.operatorSign = '';
            }
            else if (expr.operatorSign !== '' && expr.rightNumber !== '')
            {
                expr.rightNumber = expr.rightNumber.slice(0, expr.rightNumber.length - 1);
            }           
        }
        else if (expr.start)
        {
            display.textContent = button.textContent;
            expr.leftNumber = button.textContent;
            expr.start = false;
            return;
        }
        else if (button.textContent === '.')         
        {
           if (countDots(expr.leftNumber) === 1 && expr.rightNumber === '')
           {
                return;
           } 
           else if (expr.leftNumber !== '' && countDots(expr.leftNumber) === 0)
           {
               display.textContent += button.textContent;
               expr.leftNumber += button.textContent;
           }
           else if ( countDots(display.textContent) === 2 || potentialConsecutiveDot(display.textContent) )
           {
                
                return;
           }
           else if ( countDots(display.textContent) === 1)
           {
                display.textContent += button.textContent;
                expr.rightNumber += button.textContent;
           }
   
        }
        else if (expr.operatorSign === ''  &&  expr.rightNumber === '')
        {
            if (display.textContent === '-' || display.textContent === '+')
            {
                display.textContent += button.textContent;
                expr.leftNumber = display.textContent;
            }
            else 
            {
                display.textContent += button.textContent;
                expr.leftNumber += button.textContent;
            }

           
            if (expr.leftNumber === '')                 
            {
                expr.leftNumber = button.textContent;
            }
            
        } 
        else if (expr.leftNumber !== ''  &&  expr.operatorSign !== ''  &&  expr.rightNumber === '')
        {
            display.textContent += ` ${button.textContent}`;
            
            expr.rightNumber = button.textContent; 
        } 
        else if (expr.leftNumber !== ''  &&  expr.operatorSign !== ''  &&  expr.rightNumber !== '')
        {
            display.textContent += button.textContent;
            expr.rightNumber += button.textContent;
        }
        
    });
});

clearButton.addEventListener('click', () =>
{
    display.textContent = '0';
    expr.start = true;

});

acButton.addEventListener('click', () =>
{
    display.textContent = '0';

    for (let x in expr)
    {
        if( expr[x] === expr['operate'] ) continue;
        else expr[x] = '';
    }

    expr.start = true;
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

function potentialConsecutiveDot(string)
{
    let splitString = string.split('');

    let dotPushTestString = splitString.concat('.');
    
    for (let i = 0; i < dotPushTestString.length; i++)
    {
        if (dotPushTestString[i] === dotPushTestString[i-1]) return true;
    }

    return false;
}

function countDots(string)
{
    let dotCount = 0;
    
    string.split('').forEach( (substring) =>
    {

        if (substring === '.') dotCount++;
    });

    return dotCount;
}
