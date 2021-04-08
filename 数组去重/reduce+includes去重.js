let arr = [1, 2, 3, 4, 4, 3, 65, 16, 24, null, undefined, undefined];

console.log(
    arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
)