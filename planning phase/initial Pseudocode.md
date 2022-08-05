## Calculator

### Some Facts from the exercise

- this calculator does not take into account order of operations. It will only evaluate a pair of 2 numbers at a time.
- I will look at the functionality of my Casio fx-82MS to see if I can match the input behaviour somewhat.  

### Steps

1. Start with a basic calculator displaying 0 (which could maybe be the default value of the first variable)

2. user is expected to input a number first. Some things to keep in mind;
    - if user starts by inputting zeros, those should preferably not be stored. On my regular calculator they just show. Casio actually uses the top part of the screen for input, below it will be the result. consider removing the zeroes optional.
    - first input can also not contain operators (so not the `+ - * /`), dot is fine I expect since it will probably default to a regular number once stored.

3. we want this number to show in the top window.
    - current:
        - `top window` is updating number1

4. once an operator is clicked, save this first (displayed in top window) number in a variable (`number1`), and the clicked operator in another variable (`operator`). 

5. we now want the following displayed:
    - current:
        - `top window`: `num1` + `operator` + next step

6. now we expect another number. Same things to keep in mind as with point 2. 
    - this input can also not contain operators (so not the `+ - * /`)
        - `top window`: `num1` + `operator` + number currently being typed

7. now, once an operator or equal sign is clicked, we store the current input as our third variable(`number2`)

8. when we have all three variables, send them to the operate function to be parsed.
    - `operate(number1, operator, number2)`

9. the outcome of the operate function should now be stored as our `number1` variable again.

10. clear the `operator` and `number2` variable

11. display this new(operate result) `number1` variable in the `bottom window`
    - current:
        - `top window`: all 3 variables before they got parsed
        - `bottom window`: the result of the operate function which is now stored in `number1`.

12. if the user now inputs another operator: change `top window` to "ans" + `operator`.
    - `top window`: ans + operator (ready for more input back at step #6)

    or if the user now clicks the equal sign:

    - OPTIONAL: blink both windows like casio shortly
    - or display ERROR?

### Extra functionality

1. User can use the `AC` button to revert everything back to the start. This will mean: 
    - variables back to default
    - windows back to basic state
2. OPTIONAL feature: User should be able to use `DEL` to remove the last clicked number or operator
3. Something funny when operator = "/" and number2 = "0"
4. OPTIONAL idea I had: add on/off unctionality with "hello" and "goodbye"

### Ideas

1. Perhaps create a default value of multiply/`"*"` for `operator` and "1" for `number2`. This could be a solution to clicking `"="` before the `operator` or `number2` is stored. It will multiply the current `number1` variable by 1. Fancy if it blinks at each `"="` 
2. Check if sum will not concatenate. Probably need to change string to number depending on which html info we use (class, id or textContent). 
