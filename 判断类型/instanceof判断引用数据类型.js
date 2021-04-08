console.log([1, 2, 3] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function() {} instanceof Function) // true
console.log(class A {} instanceof Function) // true

console.log('1' instanceof String); // false
console.log(1 instanceof Number); // false
console.log(false instanceof Boolean); // false