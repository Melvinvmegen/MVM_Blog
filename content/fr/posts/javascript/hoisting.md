---
title: "Hoisting"
subtitle: "L'action de soulever ou de hisser en programmation."
description: "En JavaScript le 'hissage' désigne le processus par lequel le compilateur déplace la déclaration des fonctions, des variables ou des classes vers le haut de leur scope, avant l'exécution du code..."
category: "Javascript"
last_updated: "22 Octobre 2022"
---

## Qu'est-ce qu'un scope ?

Mais avant tout, qu'est-ce qu'un **scope** ? En JavaScript, un **scope** fait référence au contexte actuel d'exécution dans lequel les expressions sont *visibles* ou peuvent être *référencées*. J'aime penser aux **scope** comme des couches où chaque couche à son propre contexte qui détermine l'accessibilité des variables, des fonctions et des classes.

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

## Le scope global, l'accessible 

Lorsque vous commencez à écrire du code sur un fichier donné, vous vous trouvez dans le scope global, là, si vous définissez une variable, celle-ci sera accessible partout. Comme nous venons de le voir avec la variable **root** qui est également accessible à l'intérieur du bloc ou un bloc est représenté par des accolades **{}**.

## Le scope bloc, la retenue

Si vous assignez une variable à l'intérieur d'une fonction, la variable se trouve dans le scope local de cette fonction, donc uniquement accessible à l'intérieur de celle-ci.

```js
function scoped() {
  const scope = 'local';
}
console.log(scope) // ❌ Uncaught ReferenceError: scope is not defined 
```

Il en va de même pour les blocs, si vous assignez une variable à l'intérieur d'une déclaration conditionnelle par exemple, elle sera dans le **scope** du bloc.

```js
if (true) {
  const scope = 'block';
}
console.log(scope) // ❌ Uncaught ReferenceError: scope is not defined
```
**Notez que :** avec **var**, le scope de la variable est son contexte d'exécution actuel et ses **closusure** (concept détaillé plus bas) qui est soit :
- Dans le cas d'une fonction, la fonction englobante et les fonctions déclarées dans celle-ci
- Dans le cas d'un bloc, les variables déclarées à l'intérieur sont accessibles depuis le scope global.

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

## Quelle langue parle-t-il ?

Le scope lexical est la zone de définition d'une expression. Aussi appelé **static scope**, pensez-y comme l'origine de l'expression, l'endroit où elle a été définie. 
Mais il est important de mentionner que le scope lexical est différent de l'endroit où l'expression est invoquée (ou appelée).

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

Comme vous pouvez le voir, dans la **childFunction**, nous appelons *cat* et *dog* qui ne sont pas définis à l'intérieur du bloc, mais plutôt dans la **parentFunction**. Alors, comment se fait-il que la bonne valeur soit logger ?

C'est ce qu'on appelle le **closure** qui donne accès au scope d'une fonction externe depuis une fonction interne peu importe le niveau d'imbrication. 
Cela nous donne la flexibilité du scope lexicale en JavaScript qui nous permet d'appeler la fonction parent depuis la fonction enfant ou encore d'utiliser les variables initialiser dans la fonction parent scope dans la fonction enfant.

## Mais comment ça fonctionne ?

Nous connaissons maintenant le **closure** mais que se passe-t-il réellement dans le compilateur pour la résolution de la valeur de la variable ?

Contextuellement, à chaque fois que **parentFunction** est appelée, la variable *dog* est déjà définie, *cat* est ensuite initialisée et enfin **childFunction** est invoquée en imprimant les deux variables, mais comment le compilateur sait-il où chercher la valeur des deux variables ?
- Premièrement, le compilateur va vérifier si *cat* et *dog* sont appelés dans le scope local de **childFunction**, sinon il remontera la chaîne jusqu'au scope de la fonction parent.
- Deuxièmement, le compilateur va chercher *cat* et *dog* à l'intérieur du scope local de **parentFunction**, le premier est trouvé, parfait, nous pouvons imprimer *Jerry*, mais notre ami *dog* reste introuvable il faut donc remonter la chaîne à nouveau.
- Enfin, nous sommes à l'extérieur de la **parentFunction**, donc dans le scope globale et là, voilà *Tom* qui est finalement imprimé.

Ce concept est nommé **chaîne de scope**, allant d'un scope à l'autre afin de trouver ce qui est appelé initialement.

## Conclusion
Maintenant vous savez que le **hoisting** permet aux fonctions, variables et classes d'être utilisées en toute sécurité dans le code (limité à leur scope lexicale) avant d'être déclarées.

Notez qu'il n'est généralement pas recommandé de tout définir explicitement en haut du fichier, car cela peut conduire à des erreurs inattendues.