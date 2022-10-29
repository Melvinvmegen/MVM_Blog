---
id: 4
title: "Amount"
description: "Convert a number into an amount and its currency."
category: "Javascript"
last_updated: "October 17th, 2022"
---

```js
const amount = (value, currency = "EUR", long = false) => {
  return (
    (Number(value) || 0)
      .toFixed(long ? 2 : 0)
      .replace(/-/g, "-\u00a0")
      .replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1\u00a0")
      .replace(".", ",") +
    (currency
      ? "\u00a0" +
        ({
          EUR: "€",
          USD: "$",
          GBP: "£",
        }[currency] || currency)
      : "")
  );
};
```

## Context

In development we often have to manipulate numbers that sometimes need to be represented as amounts to users. Unfortunately, in javascript there is no built-in function to do this.

*Well actually there is a [built-in function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) which as just been supported in Node 19 thanks to a bump to the latest version of the V8 engine but as we wont be able to use it in real projects (Node 19 is a odd numbered release meaning it's not an LTS version), for a while consider this as still relevant :)*

This snippet allows us to do it!

> **Note that:**
> This function contains default settings that are suitable for my personal use but can be adjusted or removed if necessary. Note that the default parameters allow to simplify the readability of the code but be careful to keep your use consistent throughout your app.

## Utilisation

```js
amount(200); // 200 €
amount(200, "$"); // 200 $
amount(200, "GBP"); // 200 £
amount(200, "GBP", true); // 200,00 £
```

## Explication

This function takes as parameter a number, a currency with a default value of **EUR**, note that any value can be passed but for optimal use it should be added to the value supported here **({EUR:"€", USD:"$", GBP:"£"})**. Finally a boolean conditioning the result in an amount said to 2 decimal places or round.

The given value is thus parsed or converted into a Number type thanks to the Number() function which is equivalent to [unary plus (+x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) but allows in my opinion a better understanding. 
Beware of [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) which converts empty strings to NaN. For a [conversion table](https://i.stack.imgur.com/LLrgj.png).
The value is then formatted using a regex and then suffixed with the currency supplied as a parameter.

```js
let value;
value = Number(false) || 0; // 0
value = Number("test") || 0; // 0
value = Number("-1000") || 0; // 100

let stringified_value;
stringified_value = (Number(1000) || 0).toFixed(0); // '-1000'
stringified_value = (Number(1000) || 0).toFixed(2); // '-1000.00'

// In the case of a negative number, replace spaces out the number from the minus.
const spaced_out_neg_value = stringified_value.replace(/-/g, "-\u00a0"); // '- 1000.00'

// Space out every third integer
const formatted_neg_value = spaced_out_neg_value.replace(
  /(\d)(?=(\d{3})+(\.|$))/g,
  "$1\u00a0"
); // '- 1 000.00'

const comma_formatted_neg_value = formatted_neg_value.replace(".", ","); // '- 1 000,00'

const currency = "EUR";
const amount =
  comma_formatted_neg_value +
  ("\u00a0" +
    ({
      EUR: "€",
      USD: "$",
      GBP: "£",
    }[currency] || currency)); // '- 1 000,00 €'
```

What if we pass an unreferenced currency? Or if we pass null by accident? Let's try to isolate this behaviour in an independent function.

```js
const add_currency = (value, currency) => {
return value + (currency
  ? "\u00a0" +
    ({
      EUR: "€",
      USD: "$",
      GBP: "£",
    }[currency] || currency)
  : "");
}

add_currency("1 000,00", "USD") // '1 000,00 $'
add_currency("1 000,00", "¥") // '1 000,00 ¥'
add_currency("1 000,00", "curry") // '1 000,00 curry'
add_currency("1 000,00", null) // '1 000,00'
```

## Conclusion

The final snippet in a compact expression:

```js
const amount = (value, currency = "€", long = false) => {
  return (
    (Number(value) || 0)
      .toFixed(long ? 2 : 0)
      .replace(/-/g, "-\u00a0")
      .replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1\u00a0")
      .replace(".", ",") +
    (currency
      ? "\u00a0" +
        ({
          EUR: "€",
          USD: "$",
          GBP: "£",
        }[currency] || currency)
      : "")
  );
};
```
