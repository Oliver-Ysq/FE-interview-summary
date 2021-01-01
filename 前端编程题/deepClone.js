/*
 *****深拷贝*****
 */
const deepClone = (obj) => {
    if (typeof obj !== "object" && typeof obj !== "function") throw new Error();
    else {
        let newObj;
        if (Array.isArray(obj)) newObj = [...obj];
        else newObj = Object.assign({}, obj);
        for (let i in newObj) {
            if (typeof newObj[i] !== "object") continue;
            else {
                newObj[i] = deepClone(newObj[i]);
            }
        }
        return newObj;
    }
};

let a = {
    name: "oliver",
    arr: [1, 2, 3],
    fn: function () {
        console.log("fn");
    },
};

let b = deepClone(a);
console.log(b);
