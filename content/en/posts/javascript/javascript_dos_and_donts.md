---
title: "Javascript do’s and don’ts."
subtitle: ""
category: Javascript
---

# Javascript do’s and don’ts

Today we will provide you the list of the do’s and don’ts in JavaScript as per the Google JavaScript Style Guide. When we are working with the real project at that time we have to follow the standard programming guidelines which will help us to write the error free codes.

## Forget about var

Declare all local variables with either **const** or **let**. Use **const** by default, especially for array and objects to prevent type changes otherwise if a variable needs to be reassigned use **let**. The var keyword should not be used.
Bonus: it’s best practice to initialize your variables at the time of creation so you and your team can ensure none are left

```js
// ❌ forget about this.
var old = ""

// This value is immutable
const immutable = "John";

// I plan to reasign this
let counter = 1;
counter++ // counter === 2;

// Declare objects as const to prevent change type
const user = {firstname: "John", lastname: "Doe"}
```

## Be strict about equality

The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator, the strict equality operator always considers operands of different types to be different.
Bonus : 0 being falsy will be wrongly equal to false in case of non strict equality

```js
1 === 1 // true
1 == "1" // true
1 === "1" // false

0 == false // true
0 === false // false
```

## Avoid constructors for primitive values

Primitive objects are strictly different than their primitive counterparts making
them harder to check for strict equality as they're wrapped in a object. They're are basically equivalent but no equal.

```js
new String("") === "" // false 
new Number(1) === 1 // false
new Boolean(true) === true // false
```

## Make use of shorthand notation (Object Literals)

```js
// ❌ avoid this
const user = new Object(); // {}
user.firstname = "John"; // { firstname: "John" }
user.lastname = "Doe"; // { firstname: "John", lastname: "Doe" }

// ✅ Do this
const user = { 
  firstname: "John", 
  lastname: "Doe" 
}

// ❌ avoid this
const fruits = new Array(); // []
fruits.push("banana") = "John"; // ["banana"]
fruits.push("mango") = "Doe"; // ["banana", "mango"]

// ✅ Do this
const fruits = ["banana", "mango"]
```

## Use template literals to combine strings

Putting strings together is a pain, especially when combining strings and variables. To make this process simpler, you can use template literals (marked by backticks), which take both a string and variable.

```js
function greet(name) {
    return `Hello, ${name}`; //template literal
}
console.log(greet('Melvin')); // Hello, Melvin
```

Notice here that by using the template literal, we can log a greeting to any user based on the name passed to us, combining the string Hello, and the value of the passed variable name.

## Solve existence testing with includes

Testing the existence of a value within an array is a common problem. Thankfully, JavaScript comes with a special array method, includes(), which will return a Boolean if the array contains the searched value. Rather than searching the array, this method provides an efficient, easy-to-read solution.

```js
const categories = ['javascript', 'vue', 'node'];

categories.includes('javascript') // true
```

## Shorten conditionals with falsy values
In JavaScript, there are many values that are equivalent to false across multiple types of variables. This includes:

- the Boolean false
- null
- 0
- NaN (not a number)
- ''
- ""

```js
const user = {
  firstname: "John", 
  lastname: "Doe", 
  admin: false
}

if (!user.admin) {
  console.log('User not authorized')
} // 'User not authorized'

// Longhand
if (value = true) { … }

// Shorthand
if (value) { … }
```

Sometimes, however, shorthands might return surprising results. So, always be sure of what you’re doing, check the documentation, find relevant JavaScript code examples, and test the outcome.

## Use for...of instead of for loops
Loops can get costly performance-wise because you repeat the same operation over and over again. However, if you optimize them, you can make them run faster.

There are many JavaScript best practices to write more performant loops, such as avoiding nesting, keeping DOM manipulation outside of loops, and declaring a separate variable for the length of the loop (e.g. let cityCount = cities.length).

Using the for...of statement instead of for is such a JavaScript coding practice, too. This syntax has been introduced by ECMAScript 6, and it includes a built-in iterator so that you don’t have to define the i variable and the length value:

```js
// with for loop
let cities = ["New York", "Paris", "Beijing", "Sao Paulo", "Auckland"];
let cityCount = cities.length;

for(let i = 0; i < cityCount; i++) {
	console.log( cities[i] );
}

// with for...of loop
let cities = ["New York", "Paris", "Beijing", "Sao Paulo", "Auckland"];

for(city of cities) {
	console.log(city);
}
```

You can use the for...of loop to iterate over any iterable object, such as arrays, strings, nodelists, maps, and more.

## Create helper functions for common tasks
The topic of modularization comes up frequently in discussions of JavaScript best practices. Modularization means the splitting of larger files into smaller parts — a.k.a. reusable modules. ECMAScript modules and module bundlers such as Webpack help with setting up such architecture, but creating modular and reusable functions is just as important.

As the first SOLID design principle (single responsibility principle) states, every function, interface, class, and other code structure should perform only one task. Creating helper functions for common tasks is one way to follow this principle. Helper functions should be context-independent so that they can be called from any module.

```js
function pick (obj, props) {

	// Create new object
	var picked = {};

	// Loop through props and push to new object
	for (let prop of props) {
		picked[prop] = obj[prop];
	}

	// Return new object
	return picked;
```

## Use Semicolons for line termination

The use of semi-colons for line termination is a good practice. You won’t be warned if you forget it, because in most cases it will be inserted by the JavaScript parser. 
Otherwise how would you knew when an expression ends ?

Callback
In JavaScript, you can also pass a function as an argument to a function. This function that is passed as an argument inside of another function is called a callback function. For example: you have user firstname and lastname and you need to get full data of user using full name

let getUserFullName = (firstName, lastName, callback) => {
    let fullName = `${firstName} ${lastName}`);
    callback(fullName);
}
getUserFullName(“Jhon”, “Don”, getUserDetailByName);
getUserDetailByName = (userName) =>{
 // Write your code here
}


## Write shorter loops with array methods
For our final tip, we’ll dive into the complexity of array optimization. Loops are a common way to create and populate arrays. However, they cause a lot of clutter and can be hard to read due to the number of lines required.

Instead, you can use array methods to accomplish similar effects as for loops with only a fraction of the lines. Take this for loop for example.

const prices = ['1.0', 'negotiable', '2.15'];
 
const formattedPrices = [];
for (let i = 0; i < prices.length; i++) {
    const price = parseFloat(prices[i]);
    if (price) {
        formattedPrices.push(price);
    }
}
console.log(formattedPrices);
Instead of the above code, we can get the same effect from three lines below by making use of the map method. This method creates an equivalently sized array with only the prices property. We then get float values of that price using the parseFloat.

const prices = ['1.0', '2.15'];
const formattedPrices = prices.map(price => parseFloat(price));
console.log(formattedPrices)