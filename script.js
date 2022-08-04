// button and display selectors
const numberButtons = document.querySelectorAll('.numberBtn');
const operatorButton = document.querySelectorAll('.operatorBtn');
const equalsButton = document.querySelector('.equalsBtn');
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

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (num2 !== "") { // if we have num2 we have num1 and operator and are working on adding num2
            num2 += button.id; 
                topDisplay((num1 + operatorSymbol + num2));
        } else { // we have no num2 yet
            if (operator !== "") { // if we do have an operator
                num2 += button.id; 
                topDisplay((num1 + operatorSymbol + num2));
            } else { //if we don't have an operator and are working on num1
                if (bottomWindow.textContent !== "0") {
                    btmDisplay("0")
                    num1 = "";
                }
                num1 += button.textContent; 
                topDisplay(num1);
            };
        };
    });
});
//btn listener
// buttons.forEach((button) => {
//     button.addEventListener('click', () => {
        
//         //first input check to fill num1 and operator. 
//         if (operator === "" && num2 === "" && power === "on") { 
//             if (button.className === "btn numberBtn") { // line 38 pseudo impl
//                 if (bottomWindow.textContent !== "0") {
//                     btmDisplay("0")
//                     num1 = "";
//                 }
//                 num1 += button.textContent; 
//                 topDisplay(num1);
            
//                 //if num1 is filled, an operator is expected. 
//             } else if (button.className === "btn operatorBtn" && num1 !== "") { //line 44 pseudo
//                 operator = button.id; 
//                 operatorSymbol = button.textContent;
//                 topDisplay((num1 + operatorSymbol));
            
//                 //no operator yet but equal button clicked, stores just num1 and places it in bottom window
//             } else { //line 54 pseudo
//                 setTimeout(() => {
//                     btmDisplay("");
//                 }, 100);
//                 setTimeout(() => {
//                     topDisplay(""); btmDisplay(num1);
//                 }, 200);
//             };
        
//         // next inputs to get num2 value and operate.
//         } else if (operator !== "" && num1 !== "" && power === "on") {

//             //once a number gets pressed, it will now update num2 (it already has num1 and operator).
//             if (button.className === "btn numberBtn") { //line 37 pseudo
//                 num2 += button.textContent; 
//                 topDisplay((num1 + operatorSymbol + num2));

//             //updates the operator when pressing. Also when pressing multiple in a row.
//             } else if (num2 === "" && button.className === "btn operatorBtn") { //line 44 pseudo
//                 operator = button.id; 
//                 operatorSymbol = button.textContent;
//                 topDisplay((num1 + operatorSymbol));
            
//             //execute the operate function when all variables are filled.
//             // will execute operate() as soon as all variables are filled and an operator or the equals button is pressed.
//             } else if (num2 !== "" && (button.className === "btn equalsBtn" /*line 48*/ || button.className === "btn operatorBtn" /*line 41*/)) {

                
//                     num1 = operate(num1, operator, num2);
//                     btmDisplay(num1);
//                     num2 = "";
//                     operator = ""; 
//                     if (button.className === "btn operatorBtn") {
//                         operator = button.id; 
//                         operatorSymbol = button.textContent;
//                         topDisplay(num1 + operatorSymbol);
                    
//                 };
//             };
//         };
//     });
// });



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

//listener to revert to default by pressing the AC button
acButton.addEventListener('click', reset);

//functions to quickly update text content
function topDisplay(output) {
    topWindow.textContent = (output);
}
function btmDisplay(output) {
    bottomWindow.textContent = (output);
}

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
        if (num2 === "0") {
            return selfDestruct();
        };
        return num1 / num2;
    } else if (operator === "multiply") {
        return num1 * num2;
    }  
};

//divide by zero destruction
function selfDestruct() {
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
        power = "off";
        reset();
        btmDisplay(""); topDisplay("");
    }, 7000);
}
