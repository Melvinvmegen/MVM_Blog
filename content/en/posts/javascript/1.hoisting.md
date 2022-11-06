---
id: 1
title: "Hoisting"
subtitle: "The action of hoisting in programming."
description: "In JavaScript 'hoisting' refers to the process by which the compiler moves the declaration of functions, variables or classes up their scope, before the code is executed..."
category: "Javascript"
last_updated: "October 22th, 2022"
---

## What is a scope?

But first, what is a **scope**? In JavaScript, a **scope** refers to the current execution context in which expressions are *visible* or can be *referenced*. I like to think of **scope** as layers where each layer has its own context that determines the accessibility of variables, functions and classes.

```js
const root = 0;
{
  const layer = 1;
  console.log(root) // 0
  console.log(layer) // 1
}

console.log(root) // 0
console.log(layer) // ❌ Uncaught ReferenceError: layer is not defined
```

## The global scope, the accessible one

When you start writing code on a given file, you are in the global scope, where, if you define a variable, it will be accessible everywhere. As we have just seen with the **root** variable which is also accessible inside the block, represented by braces **{}**.

## The block scope, the hold

If you assign a variable inside a function, the variable is in the local scope of that function, so it is only accessible inside it.

```js
function scoped() {
  const scope = 'local';
}
console.log(scope) // ❌ Uncaught ReferenceError: scope is not defined 
```

The same goes for blocks, if you assign a variable inside a conditional statement for example, it will be in the **scope** of the block.

```js
if (true) {
  const scope = 'block';
}
console.log(scope) // ❌ Uncaught ReferenceError: scope is not defined
```
::note
**Note that:** with **var**, the scope of the variable is its current execution context and its **closusure** (a concept detailed below) which is either :
- In the case of a function, the enclosing function and the functions declared in it
- In the case of a block, the variables declared within it are accessible from the global scope.
::

```js
function scoped() {
  var test = "local" 
}
console.log(test) // ❌ Uncaught ReferenceError: testing is not defined

if (true) {
  var scope = 'block';
}
console.log(scope) // block
```

## What language does it speak?

The lexical scope is the definition area of an expression. Also called **static scope**, think of it as the origin of the expression, the place where it was defined. 
But it's important to mention that the lexical scope is different from the place where the expression is invoked (or called).

```js
const dog = "Tom";
const parentFunction = () => {
  // Couche 1
  const cat = "Jerry";

  const childFunction = () => {
    // Couche 2
    console.log(cat) // "Jerry"
    console.log(dog) // "Tom"
  }
}
```

As you can see, in the **childFunction**, we call *cat* and *dog* which are not defined inside the block, but rather in the **parentFunction**. So, how come the right value is printed?

This is called **closure** which gives access to the scope of an external function from an internal function regardless of the nesting level. 
This gives us the flexibility of lexical scope in JavaScript which allows us to call the parent function from the child function or to use the variables initialized in the parent function scope from the child function.

## But how does it work?

We now know about **closure** but what actually happens in the compiler to resolve the variable value?

Contextually, whenever **parentFunction** is called, the variable *dog* is already set, *cat* is then initialized and finally **childFunction** is invoked by printing both variables, but how does the compiler know where to look for the value of both variables?
- First, the compiler will check if *cat* and *dog* are called in the local scope of **childFunction**, otherwise it will trace the chain back to the parent function's scope.
- Secondly, the compiler will look for *cat* and *dog* inside the local scope of **parentFunction**, the first one is found, perfect, we can print *Jerry*, but our friend *dog* can't be found so we have to go back up the chain again.
- Finally, we are outside the **parentFunction**, in the global scope, and here, *Tom* is finally printed.

This concept is called **scope chain**, going from one scope to another in order to find what is initially called.

## Conclusion
Now you know that **hoisting** allows functions, variables and classes to be used safely in the code (limited to their lexical scope) before being declared.

::note
Note that it is generally not recommended to define everything explicitly at the top of the file, as this can lead to unexpected errors.
::