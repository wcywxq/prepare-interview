Array.prototype.some2 = function (callback) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callback(this[i], i, this));
  }
  return arr.indexOf(true) > -1;
};

var arr = [
  { name: "zhangsan", age: 20 },
  { name: "lisi", age: 19 },
  { name: "wangwu", age: 18 },
  { name: "liliu", age: 21 }
];
console.log(arr.some2(item => item.age === 22));
console.log(arr.some2(item => item.age === 21));
console.log(arr.some2(item => item.age >= 19));
