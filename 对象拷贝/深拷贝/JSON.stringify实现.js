// 无法对函数进行克隆
let obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
};

let obj2 = JSON.parse(JSON.stringify(obj1));
obj2.a = 3;
obj2.c.d = 4;
console.log(obj1.a); // 1
console.log(obj2.a); // 3
console.log(obj1.c.d); // 3
console.log(obj2.c.d); // 4
