---
title: "Range"
description: "Generate an array of numbers, for happy iteration."
category: "Javascript"
last_updated: "September 4th, 2022"
---

```js
const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
```

## Context
Sometimes, you want to render a sequence of numbers. For example, the pagination widget at the bottom of Google search results:

Perhaps even more commonly, you want to render something a handful of times. Maybe you want to generate 5 particles, or a bunch of background lines for a graph.

In React, this matter is complicated a bit, because we need an array we can map over. Essentially, I want to be able to do something like this:

```js
const PaginationWidget = () => {
  return (
    <div>
      {range(1, 11).map((num) => (
        <PageNum key={num}>{num}</PageNum>
      ))}
    </div>
  );
};
```

I'm not able to use a for loop, since we need to render expressions within JSX.

This range utility gives me a concise, functional way to solve for these kinds of problems.

## Usage

This utility can be used in several ways.

You can pass a single number, to generate a range from 0 through that number:
```js
range(5); // [0, 1, 2, 3, 4]
```

You can pass two numbers, to generate a range from start to finish:

```js
range(5, 10); // [5, 6, 7, 8, 9]
```

Finally, you can pass a third "step" argument, if you want to change the gap between numbers:

```js
range(0, 6, 2); // [0, 2, 4]
range(10, 12, 0.5); // [10, 10.5, 11, 11.5]
```

You'll notice that the array produced is inclusive of the starting number, but exclusive of the ending number. range(10, 20) includes 10, but does not include 20. This is done intentionally, to match the behaviour of JavaScript methods like slice.

```js
range(5); // [0, 1, 2, 3, 4]
```

## Explanation

Iterating from a start value to an end value, with a given step, is exactly the problem that for loops were designed to solve. Our range function is really just a thin wrapper around this common "vanilla" pattern!

One possibly surprising bit is this:

This check exists so that we can call range with a single value, like range(4). Instead of being used as the start value, we're copying this value to end, and setting start to 0. This is a quality-of-life thing, to make it a small bit easier to use.

> Why so retro?
  When you search on StackOverflow, you'll find plenty of modern solutions that use Array.from or generators to solve this problem.

  It turns out that the solutions using these methods are actually quite a bit more complex. Here's one example from that thread, which implements start/finish/step:

  ```js
  const range = (start, end, step) => {
    return (
      Array.from(
        Array.from(
          Array(Math.ceil(
            (end - start) / step
          )).keys()
        ),
        x => start + x * step
      )
    );
  }
  ```

  There are simpler versions of this code, but the outcome is the same: harder-to-follow code.

  As JS developers have embraced functional principles, we've moved away from imperative APIs like for loops. In general, this is a good thing! But we shouldn't lose sight of the goal, which is to create easier-to-understand code.

  In this case, the for loop is much more declarative than the Array.from alternative. The idea with declarative code is that it describes what you want, not how to do it. In our case, we want an array from start to end, skipping based on a step. It just so happens that a for describes that exactly! Whereas the Array.from approaches are much more focused on how to do something.

  As a bonus, our "retro" solution works on IE 10/11 without a polyfill, which can't be said for the modern alternatives.