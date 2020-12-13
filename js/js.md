# Javascript

### JS数据类型

- js 可以分为两种类型的值，一种是基本数据类型，一种是复杂数据类型。

- 基本数据类型： Number、String、Boolean、undefined、Null、Symbol、Bigint

- 复杂数据类型： Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类。

两种类型间的主要区别是它们的存储位置不同，**基本数据类型的值直接保存在栈中**，而**复杂数据类型的值保存在堆中**，通过使用在栈中保存对应的指针来获取堆中的值。

### typeof

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

### 区分对象类型

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看。例如：

```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"

Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"
```

### new做了什么？

1. 创建一个空对象 `var obj={};`
2. obj的原型指向构建函数的prototype，即f.\__proto__ = Fun.prototype
3. 执行Fun.call(obj,a,b)，即执行构造函数Fun，其中this指向obj
4. 返回obj

### undeclared、undefined、null区别

- 没有在作用域中声明过但直接使用的变量，是 undeclared 的。

- 已在作用域中声明但还没有赋值的变量，是 undefined 的。

- null的含义是空对象，一般用于初始化。

  使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

### 原型和原型链

#### 原型

![图片描述](https://segmentfault.com/img/bVbx4tR)

#### 原型链

- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。

- 原型链的尽头一般来说都是 Object.prototype 。

### 获取原型的方法

- obj.\__proto__
- Object.getPrototypeOf(obj)

### JS的继承

[http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E7%BB%A7%E6%89%BF.html](http://cavszhouyou.top/JavaScript深入理解之继承.html)

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


### let和var的区别

1. 块级作用域
2. 不存在声名提升
3. 存在暂时性死区，如果在变量声名前使用会报错
4. 不允许重复声名

### 同步和异步

- 同步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会一直等待下去，直到消息返回为止再继续向下执行。

- 异步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等待消息的返回，当消息返回时系统再通知进程进行处理。

### 数组的原生方法

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 
- 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。**影响原数组，返回新数组**。
- 数组连接的方法 concat() ，返回的是拼接好的数组，**不影响原数组**。
- 数组截取办法 slice()，用于截取数组中的一部分返回，**不影响原数组**。
- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法

### eventLoop

参考：https://juejin.cn/post/6844904050543034376

- 代码从开始执行调用一个全局执行栈，script标签作为宏任务执行

- 执行过程中同步代码立即执行，异步代码放到任务队列中，任务队列存放有两种类型的异步任务，宏任务队列，微任务队列。

- 同步代码执行完毕也就意味着第一个宏任务执行完毕(script)
  （1）先查看任务队列中的微任务队列是否存在宏任务执行过程中所产生的微任务
  1-1。 有的话就将微任务队列中的所有微任务清空

  1-2。 微任务执行过程中所产生的微任务放到微任务队列中，在此次执行中一并清空

  （2）如果没有再看看宏任务队列中有没有宏任务，有的话执行，没有的话事件轮询第一波结束

  2-1、执行过程中所产生的微任务放到微任务队列

  2-2、完成宏任务之后执行清空微任务队列的代码

### 深拷贝

JSON.parse(JSON.stringify( obj ))

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

   