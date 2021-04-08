function flatten(arr) {
  return arr
    .join(",")
    .split(",")
    .map(item => Number(item));
}

console.log(flatten([1, [2, [3]]]));
