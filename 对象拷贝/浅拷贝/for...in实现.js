// 只考虑对象类型(只复制一层)
function shallowCopy(obj) {
  if (typeof obj !== "object") return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
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

let obj2 = shallowCopy(obj1);
obj2.a = 3;
obj2.c.d = 4;
console.log(obj1.a); // 1
console.log(obj2.a); // 3
console.log(obj1.c.d); // 4
console.log(obj2.c.d); // 4


