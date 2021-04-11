Array.prototype.filter2 = function (callback) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};

var arr = [
  { name: "zhangsan", age: 20 },
  { name: "lisi", age: 19 },
  { name: "wangwu", age: 18 },
  { name: "liliu", age: 21 },
];
console.log(arr.filter2(item => item.age > 19));
console.log(arr.filter2(item => item.age > 17));
