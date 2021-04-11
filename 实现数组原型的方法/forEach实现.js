Array.prototype.forEach2 = function (callback) {
  console.log(this);
  for (var i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

var arr = [1, 2, 3, 4];
arr.forEach2((item, index) => {
  console.log(item, index);
});
