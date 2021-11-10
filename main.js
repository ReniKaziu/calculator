"use strict";

var input = document.getElementById('input'), // input/output button
    number = document.querySelectorAll('.numbers div'), // number buttons
    operator = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'), // clear button
    resultDisplayed = false; // flag to keep an eye on what output is displayet

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function(e) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result isnt displayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep adding to the string for the next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need to clear the input string and add the new input to start the new operation
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
};

// click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function(e) {
    // storing current input string and its last character in variables
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if the last character entered is an operator, replace with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an operator, don't do anything
      console.log("enter a number first")
    } else {
      // else just add the operator pressed to input
      input.innerHTML += e.target.innerHTML;
    }

  });
}


// click on equal button
result.addEventListener('click', function () {
  // string eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers eg. for above string numbers will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\x|\÷/g);

  // forming an array of operators for above strings it will be : operators = ["+", "+", "-", "*", "/"]
  //first we replace all the numbers and dots with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // Now we loop through the array and we are doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("x");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf('x');
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // Using parseFloat is necessary, otherwise it will result in string concatenation
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; 

});

// clearing the input while clicking clear
clear.addEventListener('click', function () {
  input.innerHTML = "";
})