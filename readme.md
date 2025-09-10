Q1 :  What is the difference between var, let, and const?

A1 : var - var is global scope focused, can be redeclared, can be reassigned and it can be called outside the fuction.
     let - let is block scope focused , can be redeclared, can be reassigned and it can't be called outside the fuction. 
     const - block scope focused , can't be redeclared, can't  be reassigned and it can't be called outside the fuction.




Q2 :  What is the difference between map(), forEach(), and filter()?

A2 :  map() - changes every element in fuction and return the result with new array.
      forEach()- Executes function for each element and returns undefined.
      filter() - fiilters elements based on condition return the result with new array.




Q3 :  What are arrow functions in ES6?

A3: Arrow functions are a fast way to write functions.Provide a shorter syntax and fast callback then traditional fuction.
    it is used when you need object methods and when you need dynamic 'this()'




Q4 : How does destructuring assignment work in ES6?

A4 : Destructuring return values from arrays [a, b] = [1, 2] or properties from objects {name, age} = user into each variables.
     Supports default values {name = 'Unknown'} = user, rest operators [first, ...rest] = array, and variable renaming {name: fullName} = user.
     Mostly used in function parameters, module imports, and API response handling to write cleaner and more readable code.


     

Q5: Explain template literals in ES6. How are they different from string concatenation?

A5: Template literals are string defined literals covered by backticks "(``)" .
    that allows embedded expressions and multi-line strings also, gives a more powerful
    alternative of traditional string concatenation. and also use for dynamic innerHTML editing.

    Difference:
       Template Literals - Backticks with ${expression}, Clean, readable interpolation,
                           Natural line breaks, 

       String Concatenation - Plus operator with quotes, not clean as template literals, 
                              Requires \n or multiple concatenations


