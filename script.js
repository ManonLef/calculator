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