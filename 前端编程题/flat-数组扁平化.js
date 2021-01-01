/*
 *****数组扁平化*****
 */
function flat_1(arr) {
    let a = [];
    for (let i in arr) {
        if (arr[i] instanceof Array) a = a.concat(flat_1(arr[i]));
        else a.push(arr[i]);
    }
    return a;
}

const flat_2 = (arr) => {
    return arr
        .toString()
        .split(",")
        .map((v) => +v);
};

let arr = [1, 2, [3, 4]];
console.log(flat_2(arr));
