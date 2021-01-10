# CSS

### 盒模型

- 盒模型都是由四个部分组成的，分别是margin、border、padding和content。
- 区别：
  - 标准盒模型的宽高范围只包含了content
  - IE盒模型的宽高范围包含了border、padding和content。

### CSS选择符

1. id选择器（#myid）

2. 类选择器（.classname）

3. 标签选择器（div,h1,p）

4. 后代选择器（h1 div）

5. 相邻后代选择器（子）选择器（ul > li）

6. 兄弟选择器（li~a）：同一父元素下，选中**在 li 标签后出现的 a 元素（无需紧跟）**

7. 相邻兄弟选择器（li+a）：同一父元素下，选中**紧接在 li 标签后出现的 a 元素**

8. 伪类选择器（ a:hover, li:nth-child(n) ）：选中兄弟元素中的第n个

   ```html
   <style>
       li:first-child{
           color: red;
       }
   </style>
   <body>
   	<ul>
           <li> 1 </li>
           <li> 2 </li>
           <li> 3 </li>
       </ul>
   </body>
   ```

   

9. 伪元素选择器（::before、::after）：

   ```css
    .clearfix:after{
        content: '';
        display: block; /*或者 table*/
        clear: both;
    }
   ```

   

10. 通配符选择器（*）

### 伪类和伪元素

- 在css3中使用**单冒号来表示伪类**，用**双冒号来表示伪元素**。

- 伪类一般匹配的是元素的一些特殊状态，如hover、link等。
- 伪元素一般匹配的特殊的位置，比如after、befor等。

### CSS优先级

- !import优先级最高
- 行内样式其次
- id > class > 元素/伪元素选择器

### 居中

1. 水平居中

   ```css
   div {
     width: 200px;
     margin: 0 auto;
   }
   ```

2. 单行文本

   ```css
   #wrapper{	//父元素
               width: 500px;
               height: 500px;
   }
    
   #wrapper div{	//子元素
               line-height: 500px; //行高=父级的height，垂直居中。
               text-align: center; //水平居中
   }
   ```

3. 绝对定位

   - 已知高度

     ```css
             #wrapper{
                 position: relative;//父级
                 width: 500px;
                 height: 500px;
             }
      
             #wrapper p{
                 position: absolute;//子级用绝对定位
                 top: 50%;		   //先定位到50%的位置
                 left: 50%;
                 height: 300px;	   //已知的高度
                 width: 400px;
                 margin-top: -150px;//往上提本身高度的一半
                 margin-left: -200px;
             }
     ```

   - 未知高度

     ```css
     #wrapper{
                 position: relative;//父级
                 width: 500px;
                 height: 500px;
             }
      
             #wrapper p{
                 position: absolute;//子级用绝对定位
                 height: 300px;	   //已知的高度
                 top: 50%;		   //先定位到50%的位置
                 left: 50%;
                 transform: translate(-50%,-50%);
             }
     ```

     

4. flex居中

   ```css
   .container {/*父元素*/
     display: flex;
     align-items: center; /*垂直居中*/
     justify-content: center; /*水平居中*/
   }
   .div {/*子元素*/
     width: 100px;
     height: 100px;
   }
   ```


- #### 总结

  一般常见的几种居中的方法有：

  ##### 对于宽高固定的元素

  1. 我们可以利用margin:0 auto来实现元素的水平居中。
  2. 利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。
  3. 利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。
  4. 使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对
     齐，然后它的子元素也可以实现垂直和水平的居中。

    ##### 对于宽高不定的元素

  上面的后面两种方法，可以实现元素的垂直和水平的居中。

### display有哪些值

- block	块级元素。默认**宽度为父元素宽度**，**可设置宽高**，**换行**显示。
- none	元素不显示，并从文档流中移除。
- inline	行内元素。默认**宽度为内容宽度**，**不可设置宽高**，**同行**显示。
- inline-block  行内块元素。等价于可以设置宽高的inline元素。
- table    表格。

### relative，positive，fixed的定位原点

- relative定位的元素，是相对于元素本身的正常位置来进行定位的（不脱离文档流）

- absolute定位的元素，是相对于举例该元素最近的，position值不为static的祖先元素来进行定位的。若不存在position不为static的元素则相对浏览器窗口定位。
- fixed：相对浏览器窗口进行定位。
- sticky：兼容很差，没了解过。

### CSS3特性

- 新增各种CSS选择器 el:nth-child(n) ；li~a

- 圆角 border-radius

- 阴影 box-shadow

- 弹性盒子 flex

- 变换（transform）： 缩放，定位，倾斜

  例如：transform: translate(-10px,-10px)  /  scaleX(2)  /  rotateZ(45deg)

- 过渡  transition：属性名 时长 过渡方式 延迟

  例：transition: left 1s linear 1s, top1s linear 2s

  ​	**注意：display: none => display:block 无法过渡**，一般该用visibility:hidden => visibility:visible

- 动画 animation

### 对BFC的理解？

饥人谷前端讲解：https://www.yuque.com/hvvsva/gifilq/lfcu0n

- BFC指的是块级格式化上下文，BFC 中的元素如何排列不会影响到 BFC 之外的元素。
- 创建BFC的方法
  1. float
  2. position：absolute
  3. display：inline-block
  4. display：flex
  5. overflow：hidden

### margin合并、塌陷

margin重叠指的是【在同一个bfc中】垂直方向上，两个相邻元素的margin发生重叠的情况。

- **margin合并**：相邻兄弟元素的marin-bottom和margin-top的值发生重叠。

  1. 分别设置相邻兄弟为BFC（float：left）
  2. 为下方的兄弟设置BFC

- **margin塌陷**：父元素的margin-top和子元素的margin-top发生重叠。我们可以：

  1. 为父元素设置border-top、padding-top值来分隔它们（不推荐）。
  2. 将父元素设置为BFC。

  

### 清除浮动

清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

```css
 .clearfix:after{
     content: '';
     display: block; /*或者 table*/
     clear: both;	/*clear CSS 属性指定一个元素是否必须移动到在它之前的浮动元素下面。*/
 }
 .clearfix{
     zoom: 1; /* IE 兼容*/
 }
```

<img src="C:\Users\25319\AppData\Roaming\Typora\typora-user-images\image-20210107105240963.png" alt="image-20210107105240963" style="zoom:33%;" />   =========================》<img src="C:\Users\25319\AppData\Roaming\Typora\typora-user-images\image-20210107105253686.png" alt="image-20210107105253686" style="zoom:33%; float: right" />

### 元素竖向的百分比设定是相对于容器的高度吗？

- 如果是height的话，是相对于容器的高度。

- 如果是**padding或者margin**竖直方向的属性则是相对于**容器的宽度**。

### transition 和 animation 的区别

transition关注的是CSS属性的变化。

animation作用于元素本身而不是样式属性，可以使用关键帧的概念，可以实现更自由的动画效果。

### CSS和JS做动画

- CSS 做动画：触发 GPU 加速，调用 GPU 能力，帧率高（60）。难动态设置。

- JS 做动画：占用 JavaScript 引擎，使用 CPU 计算，帧率低（30-50）。易动态设置。

### flex布局

参考：https://www.cnblogs.com/echolun/p/11299460.html

---

```css
flex-direction	// 主轴方向

flex-wrap	// 是否自动换行：nowrap则会强行压缩item宽度；wrap会自动换行

flex-flow（flex-direction与flex-wrap结合）

justify-content	//item在主轴上的对齐方式

align-item	//item在副轴上的对齐方式

align-content	//多行item的副轴对齐方式
```



---

```css
order：// 顺序

flex-grow： 1 // 有剩余空间时进行缩放的比例

flex-shrink：0 // 当页面缩放至过小时，对应元素压缩的比例（flex-shrink越大，被压得越窄）

flex：默认0 1 auto	//（分别为flex-grow flex-shrink flex-basis）
```



### 多栏布局

- flex统一解决：定长栏 固定长度，不定长栏 flex-grow:1

- 定位解决：定长栏 固定长度，不定长栏 设置top bottom left right

  ```css
  body {
    padding: 0;
    margin: 0;
  }
  
  .header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    background: red;
  }
  
  .container {
    position: absolute;
    top: 100px;
    bottom: 100px;
    width: 100%;
    background: green;
  }
  
  .footer {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: red;
  }
  ```

  

### 实现图形

- 三角形

  ```css
  .triangle {
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: tomato transparent transparent transparent;
  }
  ```

- 一个自适应矩形，水平垂直居中，且宽高比为 2:1

  ```css
  /*实现原理参考自适应正方形和水平居中方式*/
  .box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  
    width: 10%;	//父元素宽度的10%
    height: 0;
    padding-top: 20%;	//padding以父元素的宽度为基准，父元素的10%
    background: tomato;
  }
  ```
