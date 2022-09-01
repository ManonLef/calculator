# My Calculator from The Odin Project course curriculum

## About this project

This project is the final project in the foundations course of [The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator). 
The main goal of this project is to implement the things you've learned along the way regarding html, css, JavaScript and DOM Manipulation and tie them all together in a functional calculator. 

### The basic requirements to call this project complete were:
- [x] The calculator should not evaluate more than 2 numbers at a time. Example: 2 + 2 * 3 = 12 since it will first calculate 2 + 2. 
- [x] The calculator should have all the basic math operations like add, subtract, multiply and divide.
- [x] The UI should work; the buttons need to respond to user input and the display should track the numbers you input.
- [x] The UI calculator display should not overflow.
- [x] The calculator should not crash when dividing by zero or pressing the equals button before all numbers are assigned.

### Bonus features I implemented for the extra credits
- [x] The calculator should have a UI that preferably looks nice and shows some of the CSS skills you have gained.
- [x] Add a decimal button for floating point numbers.
- [x] Add a backspace button.

### Extra feautures I added on top of the above for practice and fun
- [x] A power button.
- [x] A plusminus sign to toggle negative numbers.
- [x] Short animations when updating the display.
- [x] Random error messages.
- [x] Double displays for tracking input and `ans` to show you're operating with a previous result.

## Difficulties I encountered during this project
For a more detailed log, I have kept some notes [here](./planning%20phase/Notes%20and%20progress%20pseudocode.md)
### Rounding
I definitely struggled with figuring out the best way to ensure different results stayed within the limits of the display. I started with turning my results into an Array of strings and splitting it at the decimal to decided the available space on numbers in front of the decimal. Then rounding and placing it all back together. This does work for some numbers, but then I ran into issues with exponentials/scientific notations and very small numbers.
I then decided to go another route of figuring out the different sort of numbers I needed to shorten and researched the best way for each.
### Floating point errors
This is one I couldn't easily overcome and haven't fully yet. The solution for this is actually offered in the exercise; round numbers with decimals to avoid overflowing. But I wanted to take it a few steps further simply to avoid getting results like 1.7 for 1 divided by 6 with a lot of display length left for more accuracy than simply rounding. I started researching and found out a big percentage of calculations will be causing these errors in JavaScript. There also wasn't an easy fix catching all of them either besides rounding by default which I wanted to avoid. Since it started getting way out of the scope for this project already I eventually went with the largest number of rounding I could find that took out roughly 90% of the common errors. Now if you try really hard by continuing to operate on top of the original result, there will still be undesired results.

Since I have spent most of my time in this project on researching and working with rounding and its errors, I'm sure once I ever come across a new way to approach these, I will get back to this project and try it out.
### xy problems
- accidentally changing an operator ID to `buttonide` and at first not being able to figure out why my operator got assigned a string value of `buttonide` instead of its ID, nor finding any info on `buttonide` online. That was a bit of a facepalm moment when finding out to be honest. Lesson learned: Trace the process, all the way from the html if needed.
- Removing a bit of code that I thought was obsolete. I should have taken some time to figure out why I put it there in the first place. After the errors started popping up, I tried explaining them or connecting them to completely unrelated changes I made to the code a little before that. Eventually I took a break, checked my previous commits and figured out I removed a bit of essential code. Lesson Learned: If something doesn't seem to be related to your issue, retrace your step further back for a bit. A good descriptive commit history is a goldmine. Sadly mine had a typo but I instantly found the problem looking at the history. 

## Other Notes on this project

I decided to not implement keyboard functionality in the end. I may get back to it but at this point it felt like I had spent enough time on this project, checking off all basic requirements and learning and adding a lot more as I went along. Keyboard support didn't feel like a new topic since we already practiced that before, but it did involve having to change a lot of code. I thought that time would be best spent moving forward and learning new things after this project. 

It was a great project to do. It really boosted my confidence with trying to implement new methods (especially the multiple methods for handling displayed rounding) and I feel like I have learned a lot about JS on the topic of how integers and floating points are handled. 

## Preview

The name is derived from one of the first tools that was used as a calculator; [Pascal's Calculator, also known as Pascaline](https://en.wikipedia.org/wiki/Pascal%27s_calculator).
![preview of my calculator](https://github.com/ManonLef/calculator/blob/main/resources/calculator-preview.png?raw=true)

[Live Version](https://manonlef.github.io/calculator/)
