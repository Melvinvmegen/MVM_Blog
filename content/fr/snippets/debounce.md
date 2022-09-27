---
title: "Debounce"
description: "Une fonction de debounce classique, écrite en JS moderne."
category: "Javascript"
last_updated: "September 7th, 2022"
---

```js{1,3-5}[server.js]
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
```

## Context

There are many events in JS that trigger super quickly.

When you scroll the page, or resize the window, or move your mouse, the browser captures dozens and dozens of events per second.

In many cases, you don't need to capture every single intermediate step; you're only interested in capturing the end state (when the user finishes scrolling, or finishes resizing the window).

Debouncing is a strategy that lets us improve performance by waiting until a certain amount of time has passed before triggering an event. When the user stops triggering the event, our code will run.

In some cases, this isn't necessary. But, if any network requests are involved, or if the DOM changes (eg. re-rendering a component), this technique can drastically improve the smoothness of your application.


```js
const handleMouseMove = debounce((ev) => {
  // Do stuff with the event!
}, 250);
window.addEventListener('mousemove', handleMouseMove);
```

## Explanation
This function isn't super easy to digest, especially if you're not used to functional programming! It's 100% OK to use this function without understanding it, but if you're curious, let's pop the hood and see if we can sort it out.

Here's the code again:

```js
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
```

Our debounce function takes two arguments: a callback function and a duration in milliseconds.

We want the debounce function to itself return a function. Functions returning functions always hurts my brain, but it helps when we think about the practical aspects of how it's used:


```js
const debouncedFunction = debounce(function() { ... }, 250)
console.log(typeof debouncedFunction); // `function`
```

Here's how I like to think about it:

- Your initial function, the stuff you're actually trying to do, is a piece of hard candy.
- The debounce function is a piece of factory machinery that wraps that candy in a shiny plastic wrapper
- The function that gets returned is your wrapped piece of candy. We've augmented that piece of candy with a wrapper.
Notice that the first line in that function initializes a variable, timeoutId. This line is only executed once. We plan to call our wrapped function many times, but we only call debounce() at the beginning.

Whenever the wrapped function is triggered, two things happen:

1. We cancel any pre-existing timeout
2. We schedule a new timeout, based on the amount of time indicated by the wait argument. When the timeout expires, we call our callback function with apply, and feed it whatever arguments we have.

The very first time the user moves the mouse, that first step has no effect; nothing has been scheduled yet! Happily, window.clearTimeout is a very forgiving function; even if there is no timeout, it doesn't complain. It's a “no-op”—it does nothing.

setTimeout returns a number, a reference to the specific timeout in question. We store that in our timeoutId variable. Because this variable is held outside our wrapped function's scope, it persists.

Let's say the user hasn't finished moving the mouse. A few milliseconds pass, and our wrapper is called again.

This time around, timeoutId points to a currently-scheduled timeout, so the first line cancels it. And then we schedule a new one.

If the user moves the mouse for 1 second, this cycle will repeat dozens of times. Lots of scheduled-and-immediately-cancelled timeouts. But once they stop moving, the cycle stops. The moment 250ms elapses, our timeout fires back, and the code is ultimately run.

This is a complex sequence! But it works like a charm. Scheduling and cleaning up timeouts is a very quick, low-memory operation, so we don't have to worry much about its cost.