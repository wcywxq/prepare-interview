Array.prototype.every2 = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

var arr = [
  { name: "zhangsan", age: 20 },
  { name: "lisi", age: 19 },
  { name: "wangwu", age: 18 },
  { name: "liliu", age: 21 }
];
console.log(arr.every2(item => item.age > 17));
console.log(arr.every2(item => item.age >= 18));
