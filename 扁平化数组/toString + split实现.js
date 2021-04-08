function flatten(arr) {
  return arr
    .toString()
    .split(",")
    .map(item => Number(item));
}

console.log(flatten([1, [2, [3]]]));
