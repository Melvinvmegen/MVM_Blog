---
id: 2
title: "Debounce"
description: "Une fonction de debounce classique, écrite en JS moderne."
category: "Javascript"
last_updated: "7 Septembre 2022"
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

## Contexte

Il y a beaucoup d'événements en JS qui se déclenchent en un clin d'oeil.

Lorsque vous faites scrollez la page, redimensionnez la fenêtre ou déplacez votre souris, le navigateur capture des dizaines et des dizaines d'événements par seconde.

Dans de nombreux cas, il n'est pas nécessaire de capturer toutes les étapes intermédiaires ; seule la capture de l'état final (lorsque l'utilisateur a fini de faire défiler les pages ou de redimensionner la fenêtre) vous intéresse.

Le 'debouncing' est une stratégie qui nous permet d'améliorer les performances en attendant qu'un temps donné se soit écoulé avant de déclencher un événement. Ainsi, lorsque l'utilisateur cesse de déclencher l'événement, notre code s'exécute.

Dans la plupart des cas, ce n'est pas nécessaire. Mais, si des requêtes réseau sont impliquées, ou si le DOM change (par exemple, le rendu d'un composant), cette technique peut améliorer considérablement la fluidité de votre application.

```js  
const handleMouseMove = debounce((ev) => {
  // Faites des choses avec l'événement !
}, 250);
window.addEventListener('mousemove', handleMouseMove);
```

## Explication
Cette fonction n'est pas très facile à digérer, surtout si vous n'êtes pas habitué à la programmation fonctionnelle ! Vous pouvez tout à fait utiliser cette fonction sans la comprendre, mais si vous êtes curieux, ouvrons le capot et voyons si nous pouvons y voir plus clair.

Voici le snippet :

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

Notre fonction de debounce prend deux arguments : une fonction de rappel et une durée en millisecondes.

Nous voulons que la fonction de debounce renvoie elle-même une fonction. Les fonctions qui renvoient des fonctions me font toujours mal au cerveau, mais cela aide lorsque l'on pense aux aspects pratiques de leur utilisation :

```js
const debouncedFunction = debounce(function() { ... }, 250)
console.log(typeof debouncedFunction); // `function`
```

Voici comment j'aime me représenter son fonctionnement :

- Votre fonction initiale, celle que vous essayez réellement d'executer, est une tablette de chocolat.

- La fonction de debounce elle est une pièce d'usine qui emballe la tablette dans un emballage seduisant.

- La fonction qui est retournée est votre tablette emballée.
Remarquez que la première ligne de cette fonction initialise une variable, timeoutId. Cette ligne n'est exécutée qu'une seule fois. Nous prévoyons d'appeler notre fonction wrapper plusieurs fois, mais nous n'appelons debounce() qu'au début.

Chaque fois que la fonction wrapper est déclenchée, deux choses se produisent :

1. Nous annulons tout setTimeOut existant
2. Nous programmons un setTimeOut pour un délai déterminé par l'argument wait. Lorsque le délai d'attente expire, nous appelons notre fonction de rappel avec apply, et lui fournissons les arguments dont nous disposons.

La toute première fois que l'utilisateur déplace la souris, cette première étape n'a aucun effet ; rien n'a encore été programmé ! Heureusement, window.clearTimeout est une fonction très indulgente ; même s'il n'y a pas de setTimeout en cours, elle ne se plaint pas. C'est un "no-op" - elle ne fait rien.

setTimeout renvoie un nombre, une référence au délai d'attente en question. Nous le stockons dans notre variable timeoutId. Comme cette variable est instanciée en dehors du scope de notre fonction wrapper, elle persiste.

Disons que l'utilisateur n'a pas fini de bouger la souris. Quelques millisecondes (correspond au délai donné) passent, et notre wrapper est à nouveau appelé.

Cette fois-ci, timeoutId pointe vers un timeOut planifié, donc la première ligne l'annule. Puis nous en programmons un nouveau .

Si l'utilisateur déplace la souris pendant 1 seconde, ce cycle se répétera des dizaines de fois. Beaucoup de timeOut programmés et immédiatement annulés. La planification et le nettoyage des timeOut sont des opérations très rapides et peu coûteuse en mémoire, nous n'avons donc pas à nous soucier de leur coût. Mais dès qu'il cesse de bouger, le cycle s'arrête. Au moment où 250ms (le temps donné) s'écoulent, notre timeout se déclenche à nouveau, et le code est finalement exécuté.

C'est une séquence complexe ! Mais elle fonctionne parfaitement. 