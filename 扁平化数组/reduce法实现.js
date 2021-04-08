function flatten(arr) {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
}

console.log(flatten([1, [2, [3]]]));
