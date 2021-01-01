Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== "function") throw new TypeError("Error");
    context = context || window; //不传就是window
    context.fn = this; //在传入的对象上绑定fn方法
    const result = context.fn(...args); //隐式绑定
    delete context.fn;
    return result;
};

Function.prototype.myApply = function (context, args) {
    if (typeof this !== "function") throw new TypeError("Error");
    context = context || window; //不传就是window
    context.fn = this; //在传入的对象上绑定fn方法
    const result = context.fn(...args); //隐式绑定
    delete context.fn;
    return result;
};

Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== "function") throw new Error();
    const that = this;
    context = context || window;
    return function Fn() {
        if (this instanceof Fn) return new that(...args);   //禁止改变指向
        else return that.call(context, ...args);
    };
};

let obj = { name: "Lee" };
function fn(arg) {
    console.log(this.name, arg);
}

fn.myCall(obj, 2);
fn.myApply(obj, [2]);

fn = fn.myBind(obj, 2);
fn = fn.myBind({ name: "oliver" }, 3);
fn();
