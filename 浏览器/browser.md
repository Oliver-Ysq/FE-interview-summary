## 浏览器篇


### 浏览器的渲染原理

更多：[https://juejin.cn/post/6844903824721707022](https://juejin.cn/post/6844903824721707022)



### 浏览器端的存储技术

浏览器常见的存储技术有 cookie、localStorage 和 sessionStorage。

#### cookies，sessionStorage 和 localStorage 的区别

- 知识点


  SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于:
  - 前两者属于H5 webStorage，创建它们的目的便于客户端存储数据。
  - cookie 数据在同源（协议、主机、端口相同）http请求中强制携带，会在浏览器和服务器间双向传递。cookie是 为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）


- 回答：

  - **cookie** 由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。

  - **sessionStorage** 是 h5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 session 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。

  - **localStorage** 也是 h5 提供的一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage 不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。



### 事件机制

#### 事件触发有三个阶段：

- `window` 往事件触发处传播，遇到注册的捕获事件会触发
- 传播到事件触发处时触发注册的事件
- 从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

#### 阻止冒泡：

`event.stopPropagation()`



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


### 浏览器缓存机制

更多：[https://github.com/xiangxingchen/blog/issues/9](https://github.com/xiangxingchen/blog/issues/9)

#### 强缓存

- cache-control：绝对时间（2000s），优先级>expires
- expires：日期（2020.7.1），可能被客户端修改

#### 弱缓存

- if-none-match：Etag（请求资源的本地Etag）

  策略：查看请求资源的本地 Etag 与服务端 Etag 是否一致

  - 若一致，则说明期间文件未更改，返回304；

  - 若不一致，则说明期间文件有更改，返回200和新文件；

- last-modified / if-modified-since：日期（2008.1.1）

  策略：初次请求文件后，服务器返回 `last-modified` 代表文件上次的更改时间。下次客户端发送请求时，在 `if-modified-since` 字段填入 `last-modified` 的值，查看从指定日期之后是否有过更新：

  - 若有更新，则说明期间文件有更改，返回200和新文件；

  - 若未更新，则说明期间文件未更改，返回304；

#### 完整缓存机制

查强缓存 => 查若缓存 => 请求新文件


## 经典面试题
### 从输入URL到展示页面，发生了什么？
[https://juejin.cn/post/6917095790221459469](https://juejin.cn/post/6917095790221459469)  
