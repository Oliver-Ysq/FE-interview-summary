# Javascript



### 数据类型相关

#### 分类

- js 可以分为两种类型的值，一种是基本数据类型，一种是复杂数据类型。
- 基本数据类型： Number、String、Boolean、undefined、Null、Symbol、Bigint
- 复杂数据类型： 对象类型（Array，Object，Date）

#### 区分

- 简单类型存储在内存中栈中；

- 复杂类型：地址存储在内存栈中，详细内容存储在堆中。

#### typeof

| 类型                          | 结果          |
| :---------------------------- | :------------ |
| Undefined                     | `"undefined"` |
| Null                          | `"object"`    |
| Boolean                       | `"boolean"`   |
| Number                        | `"number"`    |
| BigInt                        | `"bigint"`    |
| String                        | `"string"`    |
| Symbol                        | `"symbol"`    |
| Functin                       | `"function"`  |
| 其他任何对象（Object，Array） | `"object"`    |

#### instanceof

一般用于判断复杂类型

判断简单类型时会出现如下错误：

```js
var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```



#### 区分对象类型 — Object.prototype.toString

```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"

Object.prototype.toString.call( { id:1 } );
// "[object Function]"
```



### new做了什么？

1. 创建一个空对象 `var obj={};`
2. obj的原型指向构建函数的prototype，即obj.\__proto__ = Fun.prototype
3. 执行Fun.call(obj,a,b)，即执行构造函数Fun，其中this指向obj
4. 返回obj

```js
function my_new(Super, ...args) {
    const obj = {}
    obj._proto_ = Super.prototype // 将新对象的原型绑定为构造函数的原型
    const result = Super.call(obj, ...args) // 执行 构造函数 并将 构造函数里面的this指向 新建对象obj
    return typeof result === 'object' ? result : obj // 如果 执行结构是一个对象，那么就返回执行结果，否则返回新建对象
}
```





### 原型和原型链

#### 原型

![图片描述](https://segmentfault.com/img/bVbx4tR)

#### 原型链

- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象（obj.\_\_proto\_\_）里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。
- 原型链的尽头一般来说都是 Object.prototype 。



#### 获取原型的方法

- obj.\__proto__
- Object.getPrototypeOf(obj)



### JS的继承

#### 寄生组合继承

```js
function Parent(name){
	this.name = name
}
Parent.prototype.sayName = function(){
    console.log(this.name)
}

function Child(name,age){
    Parent.call(this,name)
	this.age = age
}

/*	
	等价于 
	Child.prototype.__proto__ = Parent.prototype;	
	Child.prototype.constructor = Child;
*/
Child.prototype = Object.create(Parent.prototype,{ constructor: Child })	
```

#### class方法

```js
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}

/*	
	extends 等价于 
	Child.prototype.__proto__ = Parent.prototype;	
	Child.prototype.constructor = Child;
*/
class Child extends Parent {
  constructor(value) {
    super(value)	//等价于 Parent.call(this,value);
  }
}
```



### this的用法

https://segmentfault.com/a/1190000020529912

![image.png](https://segmentfault.com/img/bVcKciA)

- 箭头函数

  ```js
  let obj = {
      num: 1,
      prin: function(){
          //父级作用域 此处保存着父级的this
          setTimeout(()=>{
              console.log(this.num);
          },1000)
      }
  }
  
  obj.prin()	// 1
  //实际上就是闭包的应用。
  ```

- 绑定丢失：隐式绑定作为回调函数时，会出现绑定丢失的情况。

  ```js
  let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  setTimeout(user.sayHi, 1000); // Hello, undefined!
  ```

  



### 执行上下文和执行栈

- 执行上下文 = 词法作用域 + this指向
  - 每当js执行一段代码，就由执行上下文来跟踪这段代码的执行情况。执行开始时将执行上下文压入栈，执行结束后将执行上下文踢出栈。
- 执行上下文的大小有限，深层次递归可能爆栈。解决方法：利用setTimeout将任务转化为异步，放进宏任务队列逐条执行。



### 作用域链

执行上下文，词法环境：https://segmentfault.com/a/1190000021949575（我的博客）；

https://blog.csdn.net/lyt_angularjs/article/details/105583936（参考）

https://juejin.cn/post/6844903921161338893（参考）

- 作用域：

  当前执行上下文创建的一个词法作用域，其中包含了：①执行环境中所有变量和函数记录；②上层词法环境的引用`outer`。

- **作用域链：本质上是一个指向词法作用域的指针列表**。

- 作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问**，通过作用域链可以访问到外层环境的变量和函数。



### 闭包

- 定义：一个函数和声明该函数的词法作用域的组合就是**闭包**（**closure**）。
- 用途：
  1. 闭包的第一个用途是：使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来**创建私有变量**。
  2. 闭包的另一个用途是：使已经运行结束的函数上下文中的函数对象继续留在内存中，因为函数对象的[scope]属性保留了对词法环境的引用，所以这个词法环境不会被回收。
  3. setTimeout 等回调函数
- 本质：作用域链的特殊应用。




### 事件冒泡、捕获

事件捕获：先父后子，先外后里。

事件冒泡：先子后父，先里后外。

- 阻止冒泡：event.stopPropagation()
- addEventListener("click", fn , false)：第三个参数为是否在捕获阶段执行。默认false，即在冒泡阶段执行。



### 事件委托

事件委托本质上是利用了浏览器事件冒泡的机制。

因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。

- 优点：性能优化。

- 实现：

  ```js
   ul.addEventListener('click', function(e){
       if(e.target.tagName.toLowerCase() === 'li'){
           fn() // 执行某个函数
       }
   })
  ```





### 判断一个对象是否属于某个类

1. `Object.prototype.toString( obj )`
2. `a isntanceof A`



### AJAX请求

- 异步的JavaScript和XML：通过js的异步通讯获得服务器上的xml进而更新页面

1. ##### 背代码，完整版

   ```js
    var request = new XMLHttpRequest()
    request.open('GET', '/a/b/c?name=ff', true);	//创建HTTP请求
    request.onreadystatechange = function () {		//设置状态监听函数
      if(request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
      }};
    request.send();	//发送HTTP请求
   ```

2. ##### 背代码，简化版

   ```js
    var request = new XMLHttpRequest()
    request.open('GET', '/a/b/c?name=ff', true)
    request.onload = ()=> console.log(request.responseText)
    request.send()
   ```

3. ##### promise版

   ```js
   function request(url) {
     return new Promise((resolve, reject) => {
       xhr = new XMLHttpRequest();
       xhr.open("GET", url);
       xhr.onload = function () {
         resolve(request.responseText);
       };
       xhr.onerror = function () {
         reject(request.responseText);
       };
       xhr.send();
     });
   }
   
   new request('www.baidu.com')
     .then((res) => {	console.log(res);	})
     .catch(() => {  console.log("error")  });
   ```



### 同步和异步

- 同步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会一直等待下去，直到消息返回为止再继续向下执行。

- 异步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等待消息的返回，当消息返回时系统再通知进程进行处理。



### 并发和并行的区别

并发的关键是你有处理多个任务的能力，不一定要同时。
并行的关键是你有同时处理多个任务的能力。



### 进程和线程

- **进程**：资源分配的最小单位

- 线程：CPU调度的最小单位，运行在进程之内，共享进程的资源。

- **形象解释**：打开一个 Tab 页时其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。
- **JS的单线程**：得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。



### 数组的原生方法

- 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。**影响原数组，返回新数组**。

- 数组连接的方法 concat() ，返回的是拼接好的数组，**不影响原数组**。

- 数组截取办法 slice()，用于截取数组中的一部分返回，**不影响原数组**。

- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法

- reduce方法：将数组中的值整合为一个值。

  ```js
  let arr = [1,2,3]
  arr.reduce((sum,v,idx,a) => sum+v*v, 0)	//14
  ```



### EventLoop

参考：https://juejin.cn/post/6844904050543034376

![img](https://user-gold-cdn.xitu.io/2018/11/23/16740fa4cd9c6937?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

<img src="https://user-gold-cdn.xitu.io/2020/1/18/16fb7adf5afc036d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom: 50%;" />

#### 执行顺序：

1. 首先执行宏任务（同步代码都属于宏任务）
2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
3. 执行所有微任务
4. 当执行完所有微任务后，如有必要会渲染页面
5. 然后开始下一轮 Event Loop，回到 1



### 深浅拷贝

#### 浅拷贝

```js
//method 1
let a = { id:1 }
let new_A = Object.assign( {}, a )

//method 2
let a = { id:1 }
let b = {...a}
```

#### 深拷贝

1. JSON.parse(JSON.stringify( obj ))

2. ```js
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
   }
   ```



### 数组去重

1. 利用indexOf

   ```js
   function fn(arr){
       let newArr = []
       for(let i in arr){
           if(newArr.indexOf(arr[i])==-1)
               newArr.push(arr[i])
       }
       return newArr
   }
   ```

2. 利用Set

   ```js
   let fn = arr => [...new Set(arr)]
   ```

3. 利用Map

   ```js
   const fn = arr => {
     let map = new Map()
     arr.forEach(v => map.set(v, 1))
     return [...map.keys()]
   };
   ```

4. 利用filter

   ```js
   const deduplication4 = arr => {
       arr.filter((val, index) => arr.indexOf(val) === index) 
   }
   console.log(deduplication4(arr))
   ```




## ES6



### let和var的区别

1. let块级作用域
2. let不存在变量提升（function和var都存在变量提升，function优先）
3. 存在暂时性死区，如果在变量声名前使用会报错
4. let不允许重复声名
5. 在全局上下文中声明的var变量会成为window的属性；let不会



### promise

我的博客：https://segmentfault.com/a/1190000021678943



### 解构赋值

- 交换变量 `[a,b] = [b,a]`

- 参数处理

  ```js
  function (args){
  	const {num,sum} = {args}
  }
  ```

  

### String

- 模板字符串

  ```js
  `名字：${name}`
  ```

- includes，startsWith，endsWith



### Array

- Array.from

- arr.fill

- arr.includes

- arr.flat

  ```js
  arr.flat(n)	//n为想拉平的层数
  [1, [2, [3]]].flat(Infinity)	//拉平无限层，则拉平为一维数组
  ```

  

### Object

- Object.assign( target, obj1, obj2 )	浅复制
- Object.getPrototypeof( obj )