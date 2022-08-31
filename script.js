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

let num1 = "";
let operator = "";
let num2 = "";
let operatorSymbol = "";
let powerOn = false;
disableButtons();
powerButton.disabled = false;

numberButtons.forEach((button) => {
    button.addEventListener('click', editNumber);
});

operatorButton.forEach((button) => {
    button.addEventListener('click', addOperator);
});

equalsButton.addEventListener('click', operateEquals);

acButton.addEventListener('click', reset);

function editNumber() { 
    if (operator !== "") { 
        num2 += this.id; 
    } else { 
        // if bottom window has a previous result, we reset and start a new calculation.
        if (bottomWindow.textContent !== "0") {
            reset();
        };
        num1 += this.textContent; 
    };
    topDisplay("trackInput");
};

function addOperator() {
    decimalButton.disabled = false;
    if (num2 !== "" || num1 !== "") {
        if (num2 !== "") {
            btmDisplay(""); //for blink animation
            num1 = operate();
            setTimeout(() => {
                btmDisplay(roundResult(num1));
            }, 200);
            num2 = "";
        };
        operator = this.id; 
        operatorSymbol = this.textContent;
        topDisplay("trackInput");
    } else {
        randomError();
    };
};

function operateEquals() { 
    btmDisplay(""); //for blink animation
    if (num2 !== "") {
        num1 = operate();
        setTimeout(() => {
            btmDisplay(roundResult(num1));
        }, 200);
        num2 = "";
        operator = "";
    } else if (operator !== "") {
        setTimeout(() => {
            randomError();
        }, 200);
    } else {
        if (num1 === "") {  //if right after startup "=" is pressed
            setTimeout(() => {
                reset();
            }, 200);
        } else {
            num1 = +num1;
            setTimeout(() => {
                topDisplay(""); btmDisplay(roundResult(num1));
            }, 200);
            if (num1 === 0) {
                setTimeout(() => {
                    reset();
                }, 200);
            };
        };
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

function operate() {
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
    };  
};

function disableButtons() {
    for (const button of buttons) {
        button.disabled = true;
        button.style.color = null;
        button.style.textShadow = null; 
    };
};

function enableButtons() {
    for (const button of buttons) {
        button.disabled = false;
        button.style.color = "#fec4ed";
        button.style.textShadow = "0px 0px 4px rgba(255, 255, 255, 0.5)"; 
    };
};

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
            topWindow.textContent = ("<" + defaultOutput.slice((defaultOutput).length - 17,(defaultOutput).length));
        };
    } else { //for animations and other "special effects"
        topWindow.textContent = output;
    };
};

function btmDisplay(output) {
    bottomWindow.textContent = output;
};

function roundResult(nm) { //to make every result fit in the screen while also rounding correctly, including scientific notation 
    nm = +nm
    if (nm.toString().length <= 14) {
        return nm;
    } else {
        if (nm.toString().includes(".")) { 
            if (nm < 1) { // numbers below zero and numbers between 0 and 1 for using the `toPrecision` method which disregards zeroes
                if (nm > -1 && nm < 0) { //0 to -1
                    return parseFloat(nm.toFixed(11)); 
                } else if (nm <= -1) { //-1 and below
                    if (nm < -9999999999999) { //negatives overflowing screen 
                        return parseFloat(nm.toExponential(7));
                    } else {
                        return parseFloat(nm.toPrecision(12));
                    };
                } else {
                    return parseFloat(nm.toFixed(12)); //for everything between 0 and 1
                }
            } else {
                if (nm > 99999999999999) {
                    return parseFloat(nm).toExponential(8);
                } else {
                    return (nm.toPrecision(13));
                }
            };
        } else {
            return parseFloat(nm).toExponential(7); // exp(7) to account for scientific notations up to e100+ and for the minus sign scientific notations as well.
        };
    };
};

// extra/bonus functionality
powerButton.addEventListener('click', switchPower);

decimalButton.addEventListener('click', addDecimal);

del.addEventListener('click', deleteLastInput);

plusMinusButton.addEventListener('click', toggleMinusSign);

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
        reset();
        disableButtons();
        powerButton.disabled = false;
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

function deleteLastInput() {
    if (num2 !== "") {
        num2 = num2.slice(0, -1);
        if (num2 === "-") {
            num2 = "";
        };
    } else if (operator !== "") { 
        operator = "";
        operatorSymbol = "";
    } else if (typeof(num1) !== "number") {
        num1 = num1.slice(0,-1);
        if (num1 === "-") {
            num1 = "";
        };
    };
    topDisplay("trackInput");
    
    let decimalCheck; 
    if (operator !== "") {
        if (num2 !== "") { //may be obsolete to have if statement here
            decimalCheck = num2.includes(".");
        };
    } else if (typeof(num1) !== "number") { //to avoid typeError. If type is "number" we are working on `ans` which is the previous result and we want to leave that alone.
        decimalCheck = num1.includes(".");
    };
    (decimalCheck) ? decimalButton.disabled = true : decimalButton.disabled = false; //ternary. Rewrite perhaps?
};

function toggleMinusSign() { 
    let numNegativeCheck; 
    if (num2 !== "" && +num2 !== 0) {
        numNegativeCheck = num2.includes("-");
        if (!numNegativeCheck) {
            num2 = "-" + num2;
        } else {
            num2 = num2.substring(1);
        };
    } else if (typeof(num1) !== "number" && +num1 !== 0 && num1 !== "" && operator === "") {
         numNegativeCheck = num1.includes("-");
         if (!numNegativeCheck) {
            num1 = "-" + num1;
        } else {
            num1 = num1.substring(1);
        };
    };
    topDisplay("trackInput");
};

//fun extras

function selfDestruct() {
    disableButtons();
    playDramaticChipmunk();
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
        btmDisplay("kaboooooooom");
    }, 5600);
    setTimeout(() => {
        powerOn = false;
        reset();
    }, 7000);
    
};

function randomError() {
    let message = ["nope", "doesn't work", "error :(", "boooo", "retry", "seriously?", "nuhuh", "doh!", "meh", "don't!", "welp!", "that tickles!", "oh no!", "let's not", "'puter says no", "meatballs", "no way!", "pleaso no!", "please don't"];
    let randomMsg = Math.floor(Math.random() * message.length);
    topDisplay("");
    disableButtons();
    btmDisplay(message[randomMsg]);
    setTimeout(() => {
        reset();
    }, 750);
};

function playDramaticChipmunk() {
    var audio = new Audio("../sounds/DramaChip.mp3");
    audio.loop = false;
    audio.play();
};