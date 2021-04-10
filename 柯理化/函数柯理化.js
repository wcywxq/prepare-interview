// 使函数从一次调用传入多个参数变成多次调用每次传一个参数
function curry(fn) {
  let judge = (...args) => {
    if (args.length === fn.length) return fn(...args);
    return (...arg) => judge(...args, ...arg);
  };
  return judge;
}

function add(a, b, c) {
  return a + b + c;
}

add(1, 2, 3);
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
