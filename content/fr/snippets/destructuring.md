---
title: "Destructuring"
description: "Ajouter ou overrider conditionnellement une propriété à un object."
category: "Javascript"
last_updated: "14 Octobre 2022"
---

```js
const object = { ...(someCondition && { key: "value" }) };
```

## Contexte

Il m'arrive souvent d'être confronté à une situation où je dois créer ou modifier un objet avec des propriétés conditionnellement assigné.

Imaginons que nous cherchions un utilisateur par email, nom et/ou prénom. Dans la plupart des cas une requête composée d'une propriété avec pour value **null** ou **undefined** ne retourne rien de bon.

## Utilisation

```js
// Ajouter une propriété conditionnellement
const object = { ...(true && { key: "value" }) }; // { key: "value" }
// Overrider une propriété conditionnellement
const object = { key: 1, ...(true && { key: 2 }) }; // { key: 2 }
const object = { key: 1, ...(false && { key: 2 }) }; // { key: 1 }
```

## Explication

Pour ajouter les paramètres à la recherche utilisateur en fonction de leur présence, la manière la plus simple de le faire est de :

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

Mais pourquoi ne pas profiter de l'une des plus belles nouveautés apportés depuis ES6 : [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Pour ceux qui ne connaissent pas son fonctionnement, destructuring permet comme son nom l'indique de 'destructurer' ou plutôt extraire les éléments d'un array ou d'un objet, ainsi dans notre cas :

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

Le snippet final en une expression compacte :

```js
const query = {
  ...(email && { email }),
  ...(lastname && { lastname }),
  ...(firstname && { firstname }),
};
```
