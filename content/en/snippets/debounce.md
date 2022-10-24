---
title: "Debounce"
description: "A classic debounce function, written in modern JS."
category: "Javascript"
last_updated: "September 7th, 2022"
---

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

## Context

There are many events in JS that are triggered in the blink of an eye.

When you scroll the page, resize the window or move your mouse, the browser captures dozens and dozens of events per second.

In many cases, it is not necessary to capture all the intermediate steps; you are only interested in capturing the final state (when the user has finished scrolling or resizing the window).

Debouncing' is a strategy that allows us to improve performance by waiting for a given amount of time to elapse before triggering an event. So when the user stops triggering the event, our code runs.

In most cases, this is not necessary. But, if network requests are involved, or if the DOM changes (e.g. rendering a component), this technique can greatly improve the fluidity of your application.


```js
const handleMouseMove = debounce((ev) => {
  // Do stuff with the event!
}, 250);
window.addEventListener('mousemove', handleMouseMove);
```

## Explanation
This function is not very easy to wrap your head around, especially if you are not used to functional programming! You can use this function without understanding it, but if you're curious, let's open the bonnet and see if we can make sense of it.

Here is the snippet:

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

This is how I like to think of it:

- Your initial function, the one you are actually trying to execute, is a chocolate bar.

- The debounce function is a factory part that wraps the bar in an attractive package.

- The function that is returned is your wrapped bar.
Notice that the first line of this function initializes a variable, timeoutId. This line is executed only once. We plan to call our wrapper function several times, but we only call debounce() at the beginning.

Each time the wrapper function is called, two things happen:

1. We cancel any existing setTimeOut
2. We schedule a setTimeOut for a timeout determined by the wait argument. When the timeout expires, we call our callback function with apply, and give it the arguments we have.

The very first time the user moves the mouse, this first step has no effect; nothing has been programmed yet! Fortunately, window.clearTimeout is a very forgiving function; even if there is no setTimeout in progress, it does not complain. It's a no-op - it does nothing.

setTimeout returns a number, a reference to the timeout in question. We store this in our timeoutId variable. Since this variable is instantiated outside the scope of our wrapper function, it persists.

Let's say the user hasn't finished moving the mouse. A few milliseconds (corresponding to the given delay) pass, and our wrapper is called again.

This time, timeoutId points to a scheduled timeOut, so the first line cancels it. Then we schedule a new one.

If the user moves the mouse for 1 second, this cycle will repeat itself dozens of times. A lot of timeOuts are scheduled and immediately cancelled. Scheduling and cleaning up timeouts is a very fast and low memory cost operation, so we don't have to worry about the cost. But as soon as it stops moving, the cycle stops. The moment 250ms (the given time) elapses, our timeout is triggered again, and the code is finally executed.

It's a complex sequence! But it works perfectly. 