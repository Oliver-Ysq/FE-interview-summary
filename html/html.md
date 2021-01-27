# HTML



### DOCTYPE作用

- 告知浏览器的解析器用什么**文档标准**解析这个文档。（一般使用<!DOCTYPE html>）
- DOCTYPE**不存在或格式不正确**会导致文档以**兼容模式**呈现。



### Meta标签

#### 1. 字符集

```html
<meta charset="UTF-8">
```

#### 2. name属性

```html
<meta name="keywords" content="前端">	//	关键字
<meta name="description" content="这是我的博客">	//	描述
<meta name="viewport" content="width=device-width, initial-scale=1">	//	移动端窗口
<meta name="author" content="xxx">	//	作者
<meta name="copyright" content="xxx">	//	版权声明
```

#### 3. http-equiv — http头部信息

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT">
```





### 行内元素与块级元素

- 常见的行内元素有：a span img button input label

- 常见的块级元素有：div p h1-6 ul ol header footer nav section 

- 区别：

  （1） 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
  （2） 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
  （3） 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。



### 空元素

- 标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。
- 常见的空元素有：br hr img input link meta



### 为什么DOM操作慢

 一些 DOM 的操作或者属性访问可能会引起页面的回流和重绘，从而引起性能上的消耗。



### H5的新功能

- `<canvas>`：画布
- `<video>`，`<audio>`：媒体标签
- localStorage：本地离线存储 
- sessionStorage ：数据暂存，在浏览器关闭后自动删除。
- article、footer、header、nav、section：语义化标签
- calendar、date、time、email、url、search：表单input的type
- webworker, websocket：新的技术



### H5语义化的理解

我认为 html 语义化主要指的是我们应该使用**适合的标签**来划分网页内容的结构。

- 用正确的标签使html结构更清晰可读性更强，导航栏用nav，页首用head，页尾用footer
- 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO



### head标签中必不可少的是

```
<head> 标签用于定义文档的头部，它是所有头部元素的容器。<head> 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：<base>, <link>, <meta>, <script>, <style>,  <title>。

<title> 定义文档的标题，它是 head 部分中唯一必需的元素。
```
