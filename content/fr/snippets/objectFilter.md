---
id: 5
title: "Object filter"
description: "Filtrer un objet comme si c'était un array."
category: "Javascript"
last_updated: "26 Octobre 2022"

---

```js
function objectFilter(obj, func = ([, val]) => val) {
  return Object.fromEntries(Object.entries(obj).filter(func));
}
```

## Contexte

En JavaScript il nous est fréquent de manipuler des objets surtout qu'en réalité tout est objet. Il nous est parfois utile de [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) un objet avec juste les clés et valeurs qui nous intéressent. Malheureusement, à l'inverse des _arrays_ il n'existe pas de fonction built-in permettant de réaliser cette opération. 

Mais cela ne signifie pas que vous ne pouvez pas utiliser [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) pour filtrer des objets, il suffit simplement d'être en mesure d'itérer sur l'objet en le convertissant d'abord en _array_.

Ce snippet nous permet de le faire !

## Utilisation

```js
objectFilter(
  {
    first_name: "John",
    last_name: "Doe",
    age: 26,
  },
  ([, val]) => typeof val === "number"
);
// { age: 26 }
```

## Explication

Cette fonction prend en paramètre un objet à [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) et un callback faisant office de filtre qui se doit de retourner un boolean.

Cette fonction prend en paramètre un objet à filtrer et une callback fonction qui sera passer à [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) fonction qui se doit de retourner un boolean.

**A note:** Par défaut, notre fonction filtrera tous les values qui sont **falsy** et leurs clé associé, mais nous pouvons bien évidemment overrider ce comportement en fonction de nos besoins.

```js
const obj = {
  first_name: "John",
  Last_name: "Doe",
  age: 26,
};

// Converti **obj** en array d'arrays de [clé, valeur]
const as_array = Object.entries(obj);
// `[['first_name', 'John'], ['last_name', 'Doe'], ['age', 26]]`

const filtered = as_array.filter(([key, value]) => typeof value === 'number');
// `[['age', 26]]`

// Converti l'array d'arrays à nouveau en objet:
const object_numbers_only = Object.fromEntries(filtered);
// `{ age: 26 }`
```

L'objet est d'abord convertie en _array_, ici **as_array** grâce à la fonction [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) qui retourne un _array_ d'_Arrays_ composé de la _clé_ suivi de sa _valeur_ pour chacune de ces paires clé-valeur, ce qui nous donne :

```js
[
  ["first_name", "John"],
  ["last_name", "Doe"],
  ["age", 26],
];
```

Ce nouvel _array_ est ensuite filtré avec le callback passé en paramètre qui dans notre cas exclus toutes les valeurs qui ne sont pas des nombres.

VOus aviez remarqué que nous utilisions le [destructuring assignement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) ? Il nous permet de prendre le premier element de chacun des *arrays* et de le stocket dans une variable appelée **key**, pareil pour le deuxième élément **value**.

L'array filtré est ensuite reconverti en objet via la fonction [fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) ce qui nous donne **object_numbers_only** filtrer selon nos conditions soit un object avec les clés dont les valeurs sont des nombres.

## Conclus  ion

Le snippet final en une expression compacte :

```js
function objectFilter(obj, func = ([, val]) => val) {
  return Object.fromEntries(Object.entries(obj).filter(func));
}
```
