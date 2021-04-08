let arr = [1, 2, 3, 4, 4, 3, 65, 16, 24, null, undefined, undefined];

// 通过 indexOf 第一次查到的值确定
console.log(arr.filter((item, index, array) => array.indexOf(item) === index));