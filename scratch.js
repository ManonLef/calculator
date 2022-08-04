buttons.forEach((button) => {
    button.addEventListener('click', () => {
        
        //first input check to fill num1 and operator. 
        if (operator === "" && num2 === "" && power === "on") { 
            if (button.className === "btn numberBtn") { // line 38 pseudo impl
                if (bottomWindow.textContent !== "0") {
                    btmDisplay("0")
                    num1 = "";
                }
                num1 += button.textContent; 
                topDisplay(num1);
            
                //if num1 is filled, an operator is expected. 
            } else if (button.className === "btn operatorBtn" && num1 !== "") { //line 44 pseudo
                operator = button.id; 
                operatorSymbol = button.textContent;
                topDisplay((num1 + operatorSymbol));
            
                //no operator yet but equal button clicked, stores just num1 and places it in bottom window
            } else { //line 54 pseudo
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
            if (button.className === "btn numberBtn") { //line 37 pseudo
                num2 += button.textContent; 
                topDisplay((num1 + operatorSymbol + num2));

            //updates the operator when pressing. Also when pressing multiple in a row.
            } else if (num2 === "" && button.className === "btn operatorBtn") { //line 44 pseudo
                operator = button.id; 
                operatorSymbol = button.textContent;
                topDisplay((num1 + operatorSymbol));
            
            //execute the operate function when all variables are filled.
            // will execute operate() as soon as all variables are filled and an operator or the equals button is pressed.
            } else if (num2 !== "" && (button.className === "btn equalsBtn" /*line 48*/ || button.className === "btn operatorBtn" /*line 41*/)) {

                
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
    });
});
