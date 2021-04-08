
// console.log([1, [2, [3]]].flat(2));

function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] && arr[i].length) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(flatten([1, [2, [3]]]))