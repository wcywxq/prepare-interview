Array.prototype.reduce2 = function (callback, initValue) {
  if (!Array.isArray(this) || !this.length || typeof callback !== "function") {
    return [];
  }
  var hasInitValue = initValue !== undefined;
  var val = hasInitValue ? initValue : this[0];
  for (var i = hasInitValue ? 0 : 1; i < this.length; i++) {
    val = callback(val, this[i], i, this);
  }
  return val;
};

var arr = [
  { name: "zhangsan", age: 20 },
  { name: "lisi", age: 19 },
  { name: "wangwu", age: 18 },
  { name: "liliu", age: 21 }
];
console.log(arr.reduce2((prev, cur) => prev + cur.age, 0));
console.log(arr.reduce2((prev, cur) => [...prev, cur.name], []));
