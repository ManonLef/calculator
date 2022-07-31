const display = document.querySelector('#inputDisplay');
const buttons = document.querySelectorAll('.btn');
let displayValue = "";

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
    return operator(num1, num2);
};

// number buttons to fill display when clicked
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayValue += btn.id;
        updateTextContent(display, displayValue)
    });
});



//function to shorten textupdate in functions
function updateTextContent(section, output) {
    section.textContent = (output);
}