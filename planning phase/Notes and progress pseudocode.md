- *2208011145* added default values of `*` for operator and `1` for `num2` to test per my `Ideas` in [Pseudocode](./pseudoCode.md).
- *2208011147* I'm now considering giving each button a btn class so I can add an eventlistner for every single one clicked. However, I can't use the same ID for multiple... So some things to think over:
    - Keep the ID's as they are but add extra class
    - change the ID's to match the function names which also gets rid of some code interpreting ID's to attach to the operators.
Typing this out, that last option is best since I can instead use the textcontent of those buttons as input.
So things to do now:
- [x] add `btn` class to every num/operator button
- [x] update the queryselectors as needed
- [x] edit the operate function. Consider a switch case.
- [x] write a listener function and continue with the pseudo

- *2208032350* The Selfdestruct function does not prevent other code to run. 
- [ ] consider adding a state during the timeout function that prevents the btn eventlisteners from functioning.

- *2208032358* DEL functionality pseudo.
If I press the DEL button, I want the last inputted symbol to be removed. So I'll have to figure out what that symbol was.
In case I'm in the last phase, I'll have num1, num2 and an operator
    I'd have to edit num2 here
If I am typing in the operator, I'll have num1 and operator.
    I'd have to remove the operator.
If I only have num1
    I'd have to edit num1

- (fixed) BUG after operate function is invoked, and you enter another number, topwindow will update num1 adding that number.
- [ ] look into long int rounding
- [x] clean up operate function *2208040956*

- *2208040957* edit display update to shorten code needed
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

- *2208041545* BUG
- [x] Check why equalsBtn right after startup without num1 messes up the reset(). (fixed, it did a reset faster than the inital timeout on equals button for the blink effect)

- *2208051515* 
    - [x] consider making a separate function for timeout to shorten the code for all the animations.

        - note on above. You could use `setTimeout(command, timeout)` but it's not advised due to the same potential security risks as `eval()` apparently has since it uses some sort of an implied `eval`. Note to self to 

        - [ ] research the security risks of `eval()`.
        - The advised way to do this is how I did it. Another way would be to use `promises` maybe but I haven't learned about them yet so will not dive into that rabbit hole for an unneeded easter-egg at this point.
    - [ ] check changing all top windows to (num1 + operatorSymbol + num2). Expecting the same result since the other strings are empty if absent

- *2208051819* random thought: why not just concatenate every input to later convert and calculate. 
    - [ ] test the above somewhere after finishing calculator. 

- [x] rewrite the operate function to use `Number` or `+` instead of `parseFloat`
- [x] test the above task

- *2208051825* Official TODO's left
    - [ ] implement decimal funtionality after a pseudo session
    - [ ] round decimals to avoid overflowing the screen
    - [ ] OPTIONAL add keyboard support

- *2208052032*
    - [ ] OPTIONAL Look into `setTimeout` ID. How to find it. If I can find it, I can then use `clearTimeout(id)`.
        - Possible usecase: after dividing by zero, a selfDestruct timeout sequence is started. When turning off the calculator while that's running, there's another timeout triggered that runs in sequence with the selfDestruct one.
    - [x] turn calculator "off" and the remove the eventlistener for the on off button temporarily? add it back after the sequence. No clue if this would work
        - not needed if I convert all divs to buttons. Then you can use `button.disabled: true;` and false ofcourse
    - [x] convert all `divs` to `buttons`
    - [x] edit css after above task to remove button styling, including disabled styling

- [ ] turn buttons off during text animation

- *2208060830* BUG SelfDestruct stopped working... (fixed)
- After a futile debugging attempt, the operator kept being assigned `buttonide` when it should be assigned the `button.id`. I thought that was something fancy caused by me having changed every div to a button. Not sure what I was thinking but no matter what I changed in my script, 9/0 would not invoke `selfDestruct()`. I never checked with other divisions... 
Then I looked at my html and found out the divide button's `id` was literally `buttonide` now. Facepalm. xy problem.
    
