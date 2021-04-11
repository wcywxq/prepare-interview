Array.prototype.map2 = function (callback) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callback(this[i], i, this));
  }
  return arr;
};

var arr = [
  { name: "zhangsan", age: 20 },
  { name: "lisi", age: 19 }
];
console.log(arr.map2(item => item.name));
