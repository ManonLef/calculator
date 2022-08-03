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
let power = "off";

//powerbutton functionality
powerButton.addEventListener('click', () => {
    if (power === "off") {
        power = "on"
        updateTextContent(bottomWindow,"hello");
        setTimeout(() => { 
            updateTextContent(bottomWindow,0);  // this code gets executed
        }, 750);                                // after this amount of ms
    } else {
        power = "off"
        updateTextContent(bottomWindow, "goodbye");
        setTimeout(() => {
            updateTextContent(bottomWindow,"");
            updateTextContent(topWindow,"");
        }, 750);
        reset(); // to clear variables
    };
});

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

            //once a number gets pressed, it will now update num2 (it already has num1 and operator).
            if (button.className === "btn numberBtn") { 
                num2 += button.textContent; 
                updateTextContent(topWindow, (num1 + operatorSymbol + num2));

            //updates the operator when pressing. Also when pressing multiple in a row.
            } else if (num2 === "" && button.className === "btn operatorBtn") {
                operator = button.id; 
                operatorSymbol = button.textContent;
                updateTextContent(topWindow, (num1 + operatorSymbol));
            
            //execute the operate function when all variables are filled.
            // will execute operate() as soon as all variables are filled and an operator or the equals button is pressed.
            } else if (num2 !== "" && (button.className === "btn equalsBtn" || button.className === "btn operatorBtn")) {
                
                // divide by zero
                if (operator === "divide" && num2 === "0") {
                    selfDestruct();

                // all other calculations not being divide by zero
                } else {
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
        };
    });
});

//function to quickly update text content
function updateTextContent(section, output) {
    section.textContent = (output);
};

//listener to revert to default by pressing the AC button
acButton.addEventListener('click', reset);

//resetting variables for power off or ac click
function reset() {
    num1 = "";
    operator = "";
    num2 = "";
    if (power === "on") {
        updateTextContent(bottomWindow,0);
        updateTextContent(topWindow, "");
    };
};

function selfDestruct() {
    updateTextContent(topWindow, "self destruct in")
    updateTextContent(bottomWindow,"");
    setTimeout(() => {
        updateTextContent(bottomWindow,"3");
    }, 800);
    setTimeout(() => {
        updateTextContent(bottomWindow,"2");
    }, 1600);
    setTimeout(() => {
        updateTextContent(bottomWindow,"1");
    }, 2400);
    setTimeout(() => {
        updateTextContent(bottomWindow,".");
    }, 3200);
    setTimeout(() => {
        updateTextContent(topWindow, "uh")
        updateTextContent(bottomWindow,"..");
    }, 4000);
    setTimeout(() => {
        updateTextContent(topWindow, "uh oh")
        updateTextContent(bottomWindow,"...");
    }, 4800);
    setTimeout(() => {
        updateTextContent(bottomWindow,"KABOOM");
    }, 5600);
    setTimeout(() => {
        power = "off";
        reset();
        updateTextContent(bottomWindow,"");
        updateTextContent(topWindow,"");
    }, 7000);
}

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
