// button and display selectors
const buttons = document.querySelectorAll('.btn');
const acButton = document.querySelector('#AC');
const topWindow = document.querySelector('#topWindow');
const bottomWindow = document.querySelector('#bottomWindow');
const powerButton = document.querySelector('#power');
const del = document.querySelector('#DEL');

//global variables needed in their default state
let num1 = "";
let operator = "";
let num2 = "";
let operatorSymbol = "";
let power = "off";

//powerbutton functionality
powerButton.addEventListener('click', () => {
    if (power === "off") {
        power = "on";
        btmDisplay("hello");
        setTimeout(() => { 
            btmDisplay(0);  
        }, 750);
    } else {
        power = "off"
        btmDisplay("goodbye");
        reset(); // to clear variables
    };
});

//btn listener
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        
        //first input check to fill num1 and operator. 
        if (operator === "" && num2 === "" && power === "on") { 
            if (button.className === "btn numberBtn") { //checks if number is pressed instead of operator
                if (bottomWindow.textContent !== "0") {
                    btmDisplay("0")
                    num1 = "";
                }
                num1 += button.textContent; 
                topDisplay(num1);
            
                //if num1 is filled, an operator is expected. 
            } else if (button.className === "btn operatorBtn" && num1 !== "") {
                operator = button.id; 
                operatorSymbol = button.textContent;
                topDisplay((num1 + operatorSymbol));
            
                //no operator yet but equal button clicked, stores just num1 and places it in bottom window
            } else {
                setTimeout(() => {
                    btmDisplay("");
                }, 100);
                setTimeout(() => {
                    topDisplay(""); btmDisplay(num1);
                }, 200);
            };
        
        // next inputs to get num2 value and operate.
        } else if (operator !== "" && num1 !== "" && power === "on") {

            //once a number gets pressed, it will now update num2 (it already has num1 and operator).
            if (button.className === "btn numberBtn") { 
                num2 += button.textContent; 
                topDisplay((num1 + operatorSymbol + num2));

            //updates the operator when pressing. Also when pressing multiple in a row.
            } else if (num2 === "" && button.className === "btn operatorBtn") {
                operator = button.id; 
                operatorSymbol = button.textContent;
                topDisplay((num1 + operatorSymbol));
            
            //execute the operate function when all variables are filled.
            // will execute operate() as soon as all variables are filled and an operator or the equals button is pressed.
            } else if (num2 !== "" && (button.className === "btn equalsBtn" || button.className === "btn operatorBtn")) {

                // divide by zero
                if (operator === "divide" && num2 === "0") {
                    selfDestruct();
                
                // all other calculations not being divide by zero
                } else {
                    num1 = operate(num1, operator, num2);
                    btmDisplay(num1);
                    num2 = "";
                    operator = ""; 
                    if (button.className === "btn operatorBtn") {
                        operator = button.id; 
                        operatorSymbol = button.textContent;
                        topDisplay(num1 + operatorSymbol);
                    };
                };
            };
        };
    });
});


//DEL button functionality
del.addEventListener('click', () => {
    if (num1 !== "" && operator !== "" && num2 !== "") {
        //remove last character from num2
        //update topwindow num1 + operatorsymbol + num2
        num2 = num2.slice(0, -1);
        topDisplay(num1 + operatorSymbol + num2);
    } else if (num1 !== "" && operator !== "" && num2 === "") {
        //remove operator 
        operator = "";
        topDisplay(num1);
    } else {
        num1= num1.toString(); //to avoid issues in case num1 is after operate/ans
        num1 = num1.slice(0,-1);
        topDisplay(num1);
    }
});


//functions to quickly update text content
function topDisplay(output) {
    topWindow.textContent = (output);
}
function btmDisplay(output) {
    bottomWindow.textContent = (output);
}

//listener to revert to default by pressing the AC button
acButton.addEventListener('click', reset);

//resetting variables for power off or ac click
function reset() {
    num1 = "";
    operator = "";
    num2 = "";
    if (power === "on") {
        btmDisplay(0); topDisplay("");
    } else {
        setTimeout(() => {
            btmDisplay(""); topDisplay("");
        }, 750);
    };
};

//compute depending on operator.id
function operate(num1, operator, num2) {
    if (operator === "subtract") {
        return num1 - num2;
    } else if (operator === "add") {
        return parseFloat(num1) + parseFloat(num2);
    } else if (operator === "divide") {
        return num1 / num2;
    } else if (operator === "multiply") {
        return num1 * num2;
    }  
};

//divide by zero destruction
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
