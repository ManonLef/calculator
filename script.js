// button and display selectors
const buttons = document.querySelectorAll('.btn');
const acButton = document.querySelector('#AC');
//const delButton = document.querySelector('#DEL');
const topWindow = document.querySelector('#topWindow');
const bottomWindow = document.querySelector('#bottomWindow');
const powerButton = document.querySelector('#power');

//global variables needed in their default state
let num1 = "";
let operator = "";
let num2 = "";
let operatorSymbol = "";
let power = "off"
;
//powerbutton functionality
powerButton.addEventListener('click', () => {
    if (power === "off") {
        power = "on"
        updateTextContent(bottomWindow,0);
    } else {
        power = "off"
        updateTextContent(bottomWindow,"")
        updateTextContent(topWindow,"");
    }
});

//listen for first input
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //first input check to fill num1 and operator. 
        if (operator === "" && num2 === "" && power === "on") { 
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
        // next inputs to get num2 value and operate.
        } else if (operator !== "" && num1 !== "" && power === "on") {
            //checks if number is pressed instead of operator
            if (button.className === "btn numberBtn") { 
                num2 += button.textContent; 
                updateTextContent(topWindow, (num1 + operatorSymbol + num2));
            } else if (num2 === "" && button.className === "btn operatorBtn") {
                operator = button.id; 
                operatorSymbol = button.textContent;
                updateTextContent(topWindow, (num1 + operatorSymbol));
            } else if (num2 !== "" && (button.className === "btn equalsBtn" || button.className === "btn operatorBtn")) {
                num1 = operate(num1, operator, num2);
                updateTextContent(bottomWindow, num1);
                num2 = "";
                if (button.className === "btn operatorBtn") {
                    operator = button.id; 
                    operatorSymbol = button.textContent;
                    updateTextContent(topWindow, (num1 + operatorSymbol));
                };
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
