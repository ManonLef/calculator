// const buttons = document.querySelectorAll('.btn,.operatorBtn');
// const display = document.querySelector('#bottomWindow');
// const topDisplay = document.querySelector('#topDisplay');
// const ac = document.querySelector('#AC');

// let displayValue = "";
// let infoDisplayValue = "";
// let operator = "";
// // number buttons to fill display when clicked
// buttons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         if (btn.className === 'btn') {
//             displayValue += btn.id;
//             updateTextContent(display, displayValue.substring(0,10)); //substring to limit max 10 characters in display
//         } else if (btn.className === 'btn operatorBtn' && btn.id !== "=") {
//             operator = btn.id;
//             infoDisplayValue = displayValue;
//             displayValue = "";
//             updateTextContent(topDisplay, infoDisplayValue.substring(0,17));
//             updateTextContent(display, "");
//             console.log("operator:" + operator);
//             console.log("infodisplay:" + infoDisplayValue);
//             console.log("displayvalue:" + displayValue);
//             console.log(btn.className);
//         } else {
//             updateTextContent(display,(operate(infoDisplayValue, operator, displayValue)));
//             console.log(infoDisplayValue, operator, displayValue);
//             displayValue = display.textContent;
//             operator="";
//             console.log(infoDisplayValue, operator, displayValue);
//         };;
//     });
// });

// // deletes displayValue
// ac.addEventListener('click', () => {
//     displayValue = "";
//     infoDisplayValue = "";
//     updateTextContent(display, 0);
//     updateTextContent(topDisplay, "");
// });

// button and display selectors
const buttons = document.querySelectorAll('.btn')
//const numberButtons = document.querySelectorAll('.numberBtn');
//const operatorButtons = document.querySelectorAll('.operatorBtn');
//const equalButton = document.querySelector('.equalsBtn');
const acButton = document.querySelector('#AC');
const delButton = document.querySelector('#DEL');
const topWindow = document.querySelector('#topWindow');
const bottomWindow = document.querySelector('#bottomWindow');

//variables needed in their default state
let num1 = "";
let operator = "";
let num2 = "";
let operatorSymbol = "";

//default display state
updateTextContent(bottomWindow,0);

//listen for first input
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //first input check to fill num1 and operator. 
        if (operator === "" && num2 === "") { 
            if (button.className === "btn numberBtn") { //checks if number is pressed instead of operator
                num1 += button.textContent; 
                updateTextContent(topWindow, num1);
            //if num1 is filled, an operator is expected. 
            } else if (button.className === "btn operatorBtn" && num1 !== "") {
                operator = button.id; 
                operatorSymbol = button.textContent;
                updateTextContent(topWindow, (num1 + operatorSymbol));
                
            //no operator yet but equal button clicked, stores just num1 and places it in bottom window
            } else {
                updateTextContent(topWindow, "meh");
                num1 = "";
            };
        // next input to get num2 value
        } else if (operator !== "" && num1 !== "") {
            if (button.className === "btn numberBtn") { //checks if number is pressed instead of operator
                num2 += button.textContent; 
                updateTextContent(topWindow, (num1 + operatorSymbol + num2));
            
            } else if (num2 !== "" && (button.className === "btn equalsBtn" || button.className === "btn operatorBtn")){
                num1 = operate(num1, operator, num2);
                operator = button.id; 
                operatorSymbol = button.textContent;
                updateTextContent(topWindow, (num1 + operatorSymbol));
                updateTextContent(bottomWindow, num1);
                num2 = "";
            };
        };
    });
});

//function to quickly update text content
function updateTextContent(section, output) {
    section.textContent = (output);
};

//function to revert to default by pressing the AC button
acButton.addEventListener('click', () => {
    num1 = "";
    operator = "";
    num2 = "";
    updateTextContent(bottomWindow,0);
    updateTextContent(topWindow, "");
});

//operator basic functions
//add with parseFloat to avoid concatenating strings
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2); 
};
//subtract function
function subtract(num1, num2) {
    return num1 - num2;
};
//multiply function
function multiply(num1, num2) {
    return num1 * num2;
};
//division function
function divide(num1, num2) {
    return num1 / num2;
};

//function that calls on above functions depending on operator
function operate(num1, operator, num2) {
    if (operator === "-" || operator === "subtract") {
        operator = subtract;
    } else if (operator === "+" || operator === "add") {
        operator = add;
    } else if (operator === "/" || operator === "divide") {
        operator = divide;
    } else if (operator === "×" || operator === "multiply") {
        operator = multiply;
    }  
    return operator(num1, num2);
};
