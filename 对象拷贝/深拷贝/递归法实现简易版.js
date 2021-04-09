// 只考虑普通对象属性，不考虑内置对象和函数。
function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        newObj[key] = deepClone(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

let obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
};

let obj2 = deepClone(obj1);
obj2.a = 3;
obj2.c.d = 4;
console.log(obj1.a); // 1
console.log(obj2.a); // 3
console.log(obj1.c.d); // 3
console.log(obj2.c.d); // 4
