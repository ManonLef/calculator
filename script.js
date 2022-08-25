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

powerButton.addEventListener('click', () => {
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
});

//assigns to num variable num1 or num2 when a number button is clicked. 
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // if we have num2 we have num1 and operator and are working on adding num2
        if (num2 !== "") { 
            num2 += button.id; 
                topDisplay("trackInput");
        // in case we have no num2 yet        
        } else { 
            // if we do have an operator 
            if (operator !== "") { 
                num2 += button.id; 
                topDisplay("trackInput");
            //if we don't have an operator then we are inputting num1    
            } else { 
                // if bottom window has a previous result, we wipe it.
                if (bottomWindow.textContent !== "0") {
                    btmDisplay("0")
                    num1 = "";
                };
                num1 += button.textContent; 
                topDisplay("trackInput");
            };
        };    
    });
});

//aassigns to operator or operates before doing so
operatorButton.forEach((button) => {
    button.addEventListener('click', () => {
        decimalButton.disabled = false;
        // since we only operate two numbers at a time, 
        // if we have num2 we operate the previous num1 
        // and previous operator before assigning this operator
        if (num2 !== "") {
            num1 = operate(num1, operator, num2);
            btmDisplay(Math.round(num1 * 1000)/1000);
            num2 = "";
            operator = button.id; 
            operatorSymbol = button.textContent;
            topDisplay("trackInput");
        } else if (num1 !== "") {
            operator = button.id; 
            operatorSymbol = button.textContent;
            topDisplay("trackInput");
        // in case an operator is clicked without anything preceding it.
        } else {
            randomError();
            setTimeout(() => {
                reset();
            }, 500);
        };
    });
});

//operate 
equalsButton.addEventListener('click', () => { //NOTE same as first if in operatorbutton function
    //general "blink effect" every time the equal button is clicked.
    setTimeout(() => {
        btmDisplay("");
    }, 100);
    //operate if all variables filled.
    if (num2 !== "") {
        num1 = operate(num1, operator, num2);
        
        if (num1 !== undefined) { 
            setTimeout(() => {
                btmDisplay(Math.round(num1 * 1000)/1000);
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
                topDisplay(""); btmDisplay(Math.round(num1 * 1000)/1000);
            }, 200);
        }; 
    };
});

del.addEventListener('click', () => {
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
    } else {
        let decimalCheck = num1.includes(".");
        //surprise ternary (edit on final run for consistency)
        (decimalCheck) ? decimalButton.disabled = true : decimalButton.disabled = false;
        //
        num1 = num1.toString(); 
        num1 = num1.slice(0,-1);
        topDisplay("trackInput");
    };
});

acButton.addEventListener('click', reset);

decimalButton.addEventListener('click', () => {
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
});

plusMinusButton.addEventListener('click', () => {
    let num2NegativeCheck = num2.includes("-");
    let num1NegativeCheck = num1.includes("-");

    if (num2 !== "" && num2 !== "0" && !num2NegativeCheck) {
        num2 = "-" + num2;
        topDisplay("trackInput");
    } else if (num2 !== "" && num2 !== "0" && num2NegativeCheck) {
        num2 = num2.substring(1)
        topDisplay("trackInput");
    };
});

//functions to quickly update text content
function topDisplay(output) {
    if (output === "trackInput") {
        if ((num1 + operatorSymbol + num2).length <= 18) {
            topWindow.textContent = (num1 + operatorSymbol + num2);
        } else {
            topWindow.textContent = (num1 + operatorSymbol + num2).slice(0,17) + ">";
        };
    } else {
        if (output.length <= 18) {
            topWindow.textContent = output;
        } else {
            topWindow.textContent = output.slice(0,17) + ">";
        }
    }; 
};

function btmDisplay(output) {
    bottomWindow.textContent = output;
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
    let message = ["nope", "doesn't work", "error", "boooo", "retry", "seriously?", "nuhuh", "doh!", "meh", "don't!"];
    let randomMsg = Math.floor(Math.random() * message.length);
    btmDisplay(message[randomMsg]);
};
