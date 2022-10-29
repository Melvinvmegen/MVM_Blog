---
id: 3
title: "Destructuring"
description: "Add or conditionally override a property to an object."
category: "Javascript"
last_updated: "October 14th, 2022"
---

```js
const object = { ...(someCondition && { key: "value" }) };
```

## Contexte

I often face a situation where I have to create or modify an object with conditionally assigned properties.

Let's say we are looking for a user by email, last name and/or first name. In most cases a query with a property value of **null** or **undefined** will not return anything good.

## Utilisation

```js
// Add a property conditionally
const object = { ...(true && { key: "value" }) }; // { key: "value" }
// Override a property conditionally
const object = { key: 1, ...(true && { key: 2 }) }; // { key: 2 }
const object = { key: 1, ...(false && { key: 2 }) }; // { key: 1 }
```

## Explication

To add parameters to the user search based on their presence, the easiest way to do this is to :

```js
const query = {};

if (email) {
  query.email = email;
}
if (lastname) {
  query.lastname = lastname;
}
if (firstname) {
  query.firstname = firstname;
}
```

But why not take advantage of one of the most beautiful new features brought since ES6: [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). For those who don't know how it works, destructuring allows you to 'destroy' or rather extract the elements of an array or an object, so in our case :

```js
const email = "john@doe.com"
const firstname = null;
const lastname = undefined;

const query = {
  ...(email && { email: email }),
  ...(lastname && { lastname: lastname }),
  ...(firstname && { firstname: firstname }),
}; // query { email: "john@doe.com" } 
```

## Conclusion

The final snippet in a compact expression:

```js
const query = {
  ...(email && { email }),
  ...(lastname && { lastname }),
  ...(firstname && { firstname }),
};
```
