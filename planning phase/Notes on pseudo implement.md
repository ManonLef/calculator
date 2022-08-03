- *2208011145* added default values of `*` for operator and `1` for `num2` to test per my `Ideas` in [Pseudocode](./pseudoCode.md).
- *2208011147* I'm now considering giving each button a btn class so I can add an eventlistner for every single one clicked. However, I can't use the same ID for multiple... So some things to think over:
    - Keep the ID's as they are but add extra class
    - change the ID's to match the function names which also gets rid of some code interpreting ID's to attach to the operators.
Typing this out, that last option is best since I can instead use the textcontent of those buttons as input.
So things to do now:
- [x] add `btn` class to every num/operator button
- [x] update the queryselectors as needed
- [ ] edit the operate function. Consider a switch case.
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