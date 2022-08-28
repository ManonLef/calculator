"use strict";

// button and display selectors
const numberButtons = document.querySelectorAll('.numberBtn');
const operatorButton = document.querySelectorAll('.operatorBtn');
const equalsButton = document.querySelector('.equalsBtn');
const acButton = document.querySelector('#AC');
const topWindow = document.querySelector('#topWindow');
const bottomWindow = document.querySelector('#bottomWindow');
const powerButton = document.querySelector('#power');
const del = document.querySelector('#DEL');
const buttons = document.getElementsByTagName('button');
const decimalButton = document.querySelector('.decimalBtn');
const plusMinusButton = document.querySelector('#plusMinus');

//Startup State
let num1 = "";
let operator = "";
let num2 = "";
let operatorSymbol = "";
let powerOn = false;

disableButtons();
powerButton.disabled = false;

powerButton.addEventListener('click', switchPower);

numberButtons.forEach((button) => {
    button.addEventListener('click', editNumber);
});

operatorButton.forEach((button) => {
    button.addEventListener('click', addOperator);
});

equalsButton.addEventListener('click', operateEquals);

del.addEventListener('click', deleteLastInput);

acButton.addEventListener('click', reset);

decimalButton.addEventListener('click', addDecimal);

plusMinusButton.addEventListener('click', toggleMinusSign);

function topDisplay(output) { //refactored
    let firstVar;
    
    if (typeof(num1) !== "number") { //num1 has not been operated on yet
        firstVar = num1;
    } else {
        firstVar = "ans"; //for working with the result of the previous operation which is now stored in num1
    };

    let defaultOutput = (firstVar + operatorSymbol + num2);
    
    if (output === "trackInput") {
        if ((defaultOutput).length <= 18) {
            topWindow.textContent = (defaultOutput);
        } else {
            topWindow.textContent = (defaultOutput).slice(0,17) + ">";
        };
    } else { // for animations and other "special effects"
        topWindow.textContent = output;
    };
};

function btmDisplay(output) {
    bottomWindow.textContent = output;
};

function switchPower() {
    if (!powerOn) {
        powerOn = true;
        btmDisplay("hello");
        setTimeout(() => { 
            btmDisplay(0);  
        }, 750);
        enableButtons();
    } else {
        powerOn = false;
        topDisplay("");
        btmDisplay("goodbye");
        reset(); // to clear variables
        disableButtons();
        powerButton.disabled = false;
    };
};

function editNumber() {
    if (num2 !== "") { 
        num2 += this.id; 
            topDisplay("trackInput");
    } else { 
        if (operator !== "") { 
            num2 += this.id; 
            topDisplay("trackInput");
        //if we don't have an operator then we are inputting num1 or starting with a new calculation after operating a previous one
        } else { 
            // if bottom window has a previous result, we reset the display to 0 first.
            if (bottomWindow.textContent !== "0") {
                btmDisplay("0")
                num1 = "";
            };
            num1 += this.textContent; 
            topDisplay("trackInput");
        };
    };    
};

function addOperator() { //refactored
    decimalButton.disabled = false;
    if (num2 !== "" || num1 !== "") {
        // since we only operate two numbers at a time, if we have num2 we operate before assigning this new operator to the result (which is now the new num1)
        if (num2 !== "") {
            num1 = operate(num1, operator, num2);
            btmDisplay(num1);
            num2 = ""; 
        };
        operator = this.id; 
        operatorSymbol = this.textContent;
        topDisplay("trackInput");
    } else {
        randomError();
    };
};

function addDecimal() {
    if (operator !== "") {
        num2 += "."; 
    } else {
        if (bottomWindow.textContent !== "0") {
            btmDisplay("0")
            num1 = "";
        };
        num1 += ".";
    };
    topDisplay("trackInput");
    decimalButton.disabled = true;
};

function operateEquals() {
    setTimeout(() => {
        btmDisplay("");
    }, 100);
    //operate if all variables filled.
    if (num2 !== "") {
        num1 = operate(num1, operator, num2);
        
        if (num1 !== undefined) { 
            setTimeout(() => {
                btmDisplay(num1);
            }, 200);
            num2 = "";
            operator = "";
        };
    // we have no num2, but do have a variable. This throws a syntax error
    } else if (operator !== "") {
        
        setTimeout(() => {
            randomError();
        }, 200);
        
    } else {
        //right after startup "=" is pressed
        if (num1 === "") {  
            setTimeout(() => {
                reset();
            }, 200);
        //
        } else {
            setTimeout(() => {
                num1 = +num1;
                topDisplay(""); btmDisplay(num1);
            }, 200);
        };
    }; 
};

function deleteLastInput() {
    if (num2 !== "") {
        num2 = num2.slice(0, -1);
        topDisplay("trackInput");
        let decimalCheck = num2.includes(".");
        if (!decimalCheck) {
            decimalButton.disabled = false;
        };
    } else if (num1 !== "" && operator !== "") { 
        operator = "";
        operatorSymbol = "";
        topDisplay("trackInput");
        let decimalCheck = num1.includes(".");
        (decimalCheck) ? decimalButton.disabled = true : decimalButton.disabled = false;
    } else {
        num1 = num1.slice(0,-1);
        topDisplay("trackInput");
        //surprise ternary (edit on final run for consistency)
        let decimalCheck = num1.includes(".");
        (decimalCheck) ? decimalButton.disabled = true : decimalButton.disabled = false;
        //
    };
};

function toggleMinusSign() {
    num1 = num1.toString(); // needed after an operation has been done since then it will have been turned into a number

    let num2NegativeCheck = num2.includes("-");
    let num1NegativeCheck = num1.includes("-");

    if (num2 !== "" && +num2 !== 0 && !num2NegativeCheck) {
        num2 = "-" + num2;
        topDisplay("trackInput");
    } else if (num2 !== "" && +num2 !== 0 && num2NegativeCheck) {
        num2 = num2.substring(1)
        topDisplay("trackInput");
    };

    if (num1 !== "" && +num1 !== 0 && num2 === "" && !num1NegativeCheck && bottomWindow.textContent === "0") {
        num1 = "-" + num1;
        topDisplay("trackInput");
    } else if (num1 !== "" && +num1 !== 0  && num2 === "" && num1NegativeCheck && bottomWindow.textContent === "0") {
        num1 = num1.substring(1)
        topDisplay("trackInput");
    };
};

function reset() {
    num1 = "";
    operator = "";
    num2 = "";
    operatorSymbol = "";
    if (powerOn) {
        btmDisplay(0); topDisplay("");
        enableButtons();
    } else {
        setTimeout(() => {
            btmDisplay(""); topDisplay("");
        }, 750);
        powerButton.disabled = false;
    };
};

function operate(num1, operator, num2) {
    decimalButton.disabled = false;
    operatorSymbol = "";
    num1 = +num1;
    num2 = +num2;
    if (operator === "subtract") {
        return num1 - num2;
    } else if (operator === "add") {
        return num1 + num2;
    } else if (operator === "divide") {
        if (num2 === 0) {
            return selfDestruct();
        };
        return num1 / num2;
    } else if (operator === "multiply") {
        return num1 * num2;
    }  
};

function selfDestruct() {
    disableButtons();
    topDisplay("self destruct in"); btmDisplay("");
    setTimeout(() => {
        btmDisplay("3");
    }, 800);
    setTimeout(() => {
        btmDisplay("2");
    }, 1600);
    setTimeout(() => {
        btmDisplay("1");
    }, 2400);
    setTimeout(() => {
        btmDisplay(".");
    }, 3200);
    setTimeout(() => {
        topDisplay("uh"); btmDisplay("..");
    }, 4000);
    setTimeout(() => {
        topDisplay("uh oh"); btmDisplay("...");
    }, 4800);
    setTimeout(() => {
        btmDisplay("KABOOM");
    }, 5600);
    setTimeout(() => {
        powerOn = false;
        reset();
    }, 7000);
    
};

function disableButtons() {
    for (const button of buttons) {
        button.disabled = true;
    }
};

function enableButtons() {
    for (const button of buttons) {
        button.disabled = false;
    }
};

function randomError() {
    let message = ["nope", "doesn't work", "error :(", "boooo", "retry", "seriously?", "nuhuh", "doh!", "meh", "don't!", "welp!", "that tickles!", "oh no!", "let's not"];
    let randomMsg = Math.floor(Math.random() * message.length);
    btmDisplay(message[randomMsg]);
    setTimeout(() => {
        reset();
    }, 750);
};
