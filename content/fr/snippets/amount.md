---
title: "Amount"
description: "Convertir un nombre en montant et sa devise."
category: "Javascript"
last_updated: "17 Octobre 2022"
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

## Contexte

En développement il nous est fréquent de manipuler des nombres qui doivent parfois être représenter comme des montants aux utilisateurs. Malheureusement, en javascript il n'existe pas de fonction built-in permettant de réaliser cette opération.

*En fait, il existe depuis peu une [fonction built in] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) qui vient d'être supportée par Node 19 via la dernière version du V8, mais comme nous ne pourrons pas l'utiliser dans des projets réels avant un certain temps (Node 19 n'étant pas une version LTS), considérez ceci comme toujours pertinent :)*

Ce snippet nous permet de le faire !

> **A noter :**
> Cette fonction contient des paramètres par défaut qui convienne à mon utilisation personnel mais peuvent être ajusté voir supprimer au besoin. A noter que les paramètres par defaut permette de simplifier la lisibilité du code mais attention à garder votre utilisation consistente à travers votre app.

## Utilisation

```js
amount(200); // 200 €
amount(200, "$"); // 200 $
amount(200, "GBP"); // 200 £
amount(200, "GBP", true); // 200,00 £
```

## Explication

Cette fonction prend en paramètre un nombre, une devise avec pour valeur par défaut **EUR**, à noter que n'importe quelle valeur peut-être passée mais pour une utilisation optimal elle devrait être ajouté au valeur supporté ici **({EUR: "€", USD: "$", GBP: "£"})**. Enfin un boolean conditionnant le résultat en montant dit à 2 décimales ou rond.

La valeur donnée est ainsi parsée ou convertie en type Number grâce à la fonction Number() qui est équivalente au [unary plus (+x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) mais permet à mon sens une meilleur compréhénsion. 
Attention au [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) qui convertie par exemple les strings vides en NaN. Pour une référence du [tableau de conversion](https://i.stack.imgur.com/LLrgj.png)
La valeur est ensuite formattée à l'aide d'une regex puis sufixée par la devise fournie en paramètre.

```js
let value;
value = Number(false) || 0; // 0
value = Number("test") || 0; // 0
value = Number("-1000") || 0; // 100

let stringified_value;
stringified_value = (Number(1000) || 0).toFixed(0); // '-1000'
stringified_value = (Number(1000) || 0).toFixed(2); // '-1000.00'

// Dans le cas d'un nombre négatif, le replace d'espacer le nombre à partir du moins.
const spaced_out_neg_value = stringified_value.replace(/-/g, "-\u00a0"); // '- 1000.00'

// Espace tous les trois entiers
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

Que se passerait-il si nous passons une devise non référencée ? Ou si nous passons null par accident ? Essayons d'isoler ce comportement dans une fonction indépendante.

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

Le snippet final en une expression compacte :

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
