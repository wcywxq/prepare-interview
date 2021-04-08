console.log(Object.prototype.toString.call(1) === "[object Number]");
console.log(Object.prototype.toString.call("1") === "[object String]");
console.log(Object.prototype.toString.call(false) === "[object Boolean]");
console.log(Object.prototype.toString.call(undefined) === "[object Undefined]");
console.log(Object.prototype.toString.call(null) === "[object Null]");
console.log(Object.prototype.toString.call([1, 2, 3]) === "[object Array]");
console.log(Object.prototype.toString.call({}) === "[object Object]");
console.log(Object.prototype.toString.call(NaN) === "[object Number]");
