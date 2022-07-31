const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('#inputDisplay');
const topDisplay = document.querySelector('#info');
const ac = document.querySelector('#AC');

let displayValue = "";
let infoDisplayValue = "";

// number buttons to fill display when clicked
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayValue += btn.id;
        updateTextContent(display, displayValue.substring(0,10)); //substring to limit max 10 characters in display
    });
});

// deletes displayValue
ac.addEventListener('click', () => {
    displayValue = "";
    updateTextContent(display, displayValue);
});

//function to shorten textupdate in functions
function updateTextContent(section, output) {
    section.textContent = (output);
};

//operator basic functions
function add(num1, num2) {
    return num1 + num2;
};

function substract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

//function that calls on above functions depending on operator
function operate(num1, operator, num2) {
    if (operator === "-") {
        operator = substract;
    } else if (operator === "+") {
        operator = add;
    } else if (operator === "/") {
        operator = divide;
    } else if (operator === "×") {
        operator = multiply;
    }  
    return operator(num1, num2);
};