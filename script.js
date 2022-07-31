/* add several functions for calculator:
- add
- substract
- multiply
- divide 
*/

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

/* Create a new function operate that takes an operator and 
2 numbers and then calls one of the above functions on the numbers. 
*/

function operate(num1, operator, num2) {
    return operator(num1, num2);
};

/* Create the functions that populate the display when you click 
the number buttons. You should be storing the ‘display value’ in a 
variable somewhere for use in the next step.
*/

let displayValue = "";

const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayValue += ("," + btn.id);
        console.log(displayValue);
    });
});
