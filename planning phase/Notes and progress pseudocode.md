### 2208011145 
- added default values of `*` for operator and `1` for `num2` to test per my `Ideas` in [Pseudocode](./pseudoCode.md).

### 2208011147
- I'm now considering giving each button a btn class so I can add an eventlistner for every single one clicked.However, I can't use the same ID for multiple... So some things to think over:
    - Keep the ID's as they are but add extra class
    - change the ID's to match the function names which also gets rid of some code interpreting ID's to attach to the operators.
Typing this out, that last option is best since I can instead use the textcontent of those buttons as input.
So things to do now:
- [x] add `btn` class to every num/operator button
- [x] update the queryselectors as needed
- [x] edit the operate function. Consider a switch case.
- [x] write a listener function and continue with the pseudo

### 2208032350
- The Selfdestruct function does not prevent other code to run. 
- [x] consider adding a state during the timeout function that prevents the btn eventlisteners from functioning.
    - note: changed divs to buttons. See [here](#2208060830-bug) 

### 2208032358 DEL functionality pseudo.
- If I press the DEL button, I want the last inputted symbol to be removed. So I'll have to figure out what that symbol was.
- In case I'm in the last phase, I'll have num1, num2 and an operator
    - I'd have to edit num2 here
- If I am typing in the operator, I'll have num1 and operator.
    - I'd have to remove the operator.
- If I only have num1
    - I'd have to edit num1
- (fixed) BUG after operate function is invoked, and you enter another number, topwindow will update num1 adding that number.
- [x] look into long int rounding

### 2208040956
- [x] clean up operate function

### 2208040957 
- edit display update to shorten code needed
- [x] look into blink on every equals click
- [x] consider rewriting functions to evaluate depending on number button clicked, operator button clicked or equals button clicked:
- Pseudo for above (check with current code):
    - Power has to be on for all buttons to function (perhaps put const btn value queryselectors in power on)
    - number is clicked
        - check if num2 available.
            - y? add to it
            - n? do we have operator?
                y? add to num2
                n? add to num1 unless text in bottomwindow
    - operator is clicked
        - do we have num2?
            - y? operate
            - n? see below
        - do we have num1?
            - y? store operator and display with num1
            - n? makes no sense. throw syntax error may update topdisplay anyway like casio until equals is clicked
    - equals is clicked
        - check if we have num2
            - y? operate
            - n? 
                - do we have operator? 
                    - y? not enough arguments syntax error
                    - n?
                        - num1? 
                            - y? blink and put in bottom display
                            - n?  blink and keep bottom display at 0
- [x] after implementing above, test with 9-9 and then continuing on that. If that behaves strange, consider changing default screen to an actual number zero or empty.

### 2208041545 BUG
- [x] Check why equalsBtn right after startup without num1 messes up the reset(). (fixed, it did a reset faster than the inital timeout on equals button for the blink effect)

### 2208051515
- [x] consider making a separate function for timeout to shorten the code for all the animations.
    - note on above. You could use `setTimeout(command, timeout)` but it's not advised due to the same potential security risks as `eval()` apparently has since it uses some sort of an implied `eval`. Note to self to 
    - [ ] research the security risks of `eval()`.
    - The advised way to do this is how I did it. Another way would be to use `promises` maybe but I haven't learned about them yet so will not dive into that rabbit hole for an unneeded easter-egg at this point.
- [x] check changing all top windows to `(num1 + operatorSymbol + num2)`. Expecting the same result since the other strings are empty if absent

### 2208051819 
- random thought: why not just concatenate every input to later convert and calculate. 
    - [ ] test the above somewhere after finishing calculator. 

- [x] rewrite the operate function to use `Number` or `+` instead of `parseFloat`
- [x] test the above task

### 2208051825 Official TODO's left
- [x] implement decimal funtionality after a pseudo session
- [x] round decimals to avoid overflowing the screen *changed on [9 august](#2208091346) to round to 3 decimals
- [ ] OPTIONAL add keyboard support

### 2208052032
- [x] ~~OPTIONAL Look into `setTimeout` ID. How to find it. If I can find it, I can then use `clearTimeout(id)`.~~
    - Possible usecase: after dividing by zero, a selfDestruct timeout sequence is started. When turning off the calculator while that's running, there's another timeout triggered that runs in sequence with the selfDestruct one. (note on crossout: it became obsolete with implementation of disable buttons)
- [x] turn calculator "off" and the remove the eventlistener for the on off button temporarily? add it back after the sequence. No clue if this would work
    - not needed if I convert all divs to buttons. Then you can use `button.disabled: true;` and false ofcourse
- [x] convert all `divs` to `buttons`
- [x] edit css after above task to remove button styling

- [x] turn buttons off during text animation

### 2208060830 BUG
- SelfDestruct stopped working... (fixed)
- After a futile debugging attempt, the operator kept being assigned `buttonide` when it should be assigned the `button.id`. I thought that was something fancy caused by me having changed every div to a button. Not sure what I was thinking but no matter what I changed in my script, 9/0 would not invoke `selfDestruct()`. I never checked with other divisions... 
Then I looked at my html and found out the divide button's `id` was literally `buttonide` now. Facepalm. xy problem.
    
- [ ] remove styling when buttons are disabled
- [x] use the buttons state functions for on and off, and remove the `if (power === "on") from the button listener functions.

### 2208061107 Pseudocode Decimal button
- We want the button to disable once num1 or num2 contains a decimal
- So if it's pressed, we want to find out if there's a num2 yet (which means num1 has already been assigned) if it's not, we assign it to num1 and disable the button. if it is, we assign it to num2 and disable the button. We can then re-enable it once an operator is pressed or equal sign is pressed.
- Flow:
    - num2 available? 
        - y? concatenate with num2 and disable button
        - n? concatenate with num1 and disable button
    - equals pressed? enable decimal button
    - operator pressed? enable decimal button

### 2208061124 Notes on decimal
- when num2 isn't assigned but operator is clicked, it adds to num1 so that's undesirable. Instead rewrite to (if operator !== "")
    - [x] try above rewrite in decimalButton
- Instead of re-enabling the decimalButton when either `equals` or `operator` are clicked, I added it to the operate function. 
- ISSUE the decimal now also concatenates with the previous `ans`. numbers used to do that too. 
- [x] Add current line 51 conditional to decimal button as well. 
- Update: [last point here](#-2208051515) will only work if all other strings are empty. This means once we have operated, we want to default `num2` and `operatorsymbol` to `""`.
- [x] Test the following:
    - add `operatorSymbol = ""` to the operate function since it doesn't use it
    - check to see if that would allow most functions to use `topDisplay(num1 + operatorSymbol + num2)`
        - Note after test: seems to work
- [x] Test changing all clicks in numberButtons function`topDisplay(num1 + operatorSymbol + num2)`
    - Seems to work fine
- [x] Add above to other functions and simplify code to pass a default value to the topDisplay function
### DEL1
- [x] FIX ISSUE # DEL1: after operating, then hitting DEL will start editing the num1 ans.
- [x] FIX ISSUE: when DELing a decimal, the decimal button will still be in disabled state and can't be reused until an operation occurs
    - fixed by checking string including decimal or not

- [x] Consider a state for power. Something like `let powerOn = false;`

### Pseudocode on decimalButton remaining disabled when using DEL key.
- Each time the DEL key is pressed, I want to check if the `num1` or `num2`, whichever we are editing contains a decimal.

- [x] go through code and adjust everything for `powerOn` state
- Issue [with DEL button](#del1) seems gone all of a sudden. Test and if so, check why

### 2208091346 rounding and prep for keyboard support
- I want to start preparing for keyboard implementation and I believe that should be done by removing the functions from the event listeners and making them stand alone. This way I can invoke the function with multiple event listeners. 
The number and decimal buttons are obvious for the keyboard. I'll have to think about the other buttons.
- [ ] remove functions from eventListeners and place them in the global scope.
- [ ] decide which button to use for DEL, AC, Power

- For rounding current max:
    - Top Display: 18 characters
    - Bottom Display: 14 characters maybe 13.
- Implementation possibilities; 
    - `Math.round(num * 100)/100` or for correct rounding `Math.round(x)(num + Number.EPSILON * 100)/100`
    - `number = +number.toFixed(decimals)` the plus sign is needed to get rid of unnecessary zeroes

### 2208091411 rounding implemented 
- for keeping num1 unadjusted, could use a burner number to round off in the display, keep the num1 for further calculations. 
- [x] FIX ISSUE selfDestruct displays nan or infinity.
- [ ] Consider equalsbutton (and possible operatorbutton) `if ((num2 !== "") && (num2 !== 0 && operator !== "divide"))` else selfdestruct. Redundant code. We can then remove selfdestruct from operate function.
- *2208091519* BUG(fixed) pressing equals button on division. 
- [ ] add check when pressing num/dec buttons to see if it reaches end of display length.

### 2208111409 
- [x] (fixed) BUG -> AC pressed keeps decimal button disabled.
- working on displaying a max set of numbers instead of rounding to 3 decimals.
- [x] add a ± sign to input negative numbers.

### 2208191145
- been out of it for a while. I will add a branch today to try and add the negative numbers functionality.
- for this button I need to add another button
- [x] add plusminus button to html
- [x] pseudocode use of this button
- [x] add eventlistener for button 
#### plusminus pseudocode
- regular calculator on apple doesn't add the minus sign unless a number is already there. 
- turns num1 or num2 positive or negative. 
- adds the minus sign in front of the number or removes it. 
- case 1: if we're working on num1 (so we don't have num 2 yet)
    - check already a minus sign?
        yes: remove it
        no: add one in front of the number
### 2208252300 
- the functionality is there but the code could probably use some simplifciation. 
- [ ] Refactor plusMinusButton

### 2208261600
- I'm thinking about first rounding the input numbers and showing a message when the end is reached below the calculator
- [x] ad div below calculator for textcontent
- I was a bit out of my code at this point. The topDisplay is the input portion which is already behaving pretty nicely with the arrow showing.
It could be nice to then bind the arrow functions on the keyboard to move left an right with something like changing slice indices. Or add some buttons below the text box
to slide left and right
- I'll remove the rounding on bottom window because rounding to 3 decimals makes little sense to be honest
- BUG (fixed): After operating through hitting an operator, num2 doesn't accept the plusminus button
- Fixed the above bug which was caused by num1 being a number, not a string after operating

### 2208261745 What if I were to change the operation result num1 to 'ans' like on CASIO
- Pseudocode:
    - after operate is done (either through equalsBtn or operatorBtn), topDisplay will show ans instead of num1. num1 still has to be the result of the operation so the topwindowcontent probably has to be checked to not contain ans. Which may be troublesome for num2 since we still want to be able to make that negative if possible. What's nice about this, is that rounding will probably become easier on the topWindow as well. 
- [ ] Go through applicable functions to check if the above could work.
    - operatorbutton eventlistener function has to be changed to not display `trackInput` but "ans" + operator.
    - looks like the `topDisplay()` would still work as expected but I'd really like to see the rounding/slice to behave differently.
- [x] Make a new branch to implement this

- [ ] Consider adding the numbers to the right on `topDisplay` when going above 18 characters and let the left ones disappear. 

### 2208261800 new branch for ans
- made the new branch for the ans functionality. It's a bit annoying because initially it nicely displays `ans` but after that it just tracks input ofcourse when starting on the second number. One way to overcome this is probably by adding a conditional in case the bottomdisplay is not zero. The thing is, you can just have had an operation that came with a result of zero.
Another possibility is checking if bottomdisplay isn't a string perhaps. Need to check that.
- [x] Check type of num1 before and after operation (is a number indeed)
- [ ] ISSUE, when inputting 00000 followed by an operator or equals, it will use that input as num1 and display `00000` in the topDisplay as well. That's a bit funny. 
- I'll remove the branch and work on other issues for a bit before I can think up a way to simplify some code

### 2208262230
- I will start pulling functions out of their eventlisteners
    - going smoothly so far, except I had to use `this.id` now instead of `button.id` since the event directed to an outside function now. 
- [ ] Change plusminus to not change num1 after oparating (so when num1 is answer of previous operation)
- [x] BUG: Found out the decimal button doesn't get reenabled after deleting decimal from num1

