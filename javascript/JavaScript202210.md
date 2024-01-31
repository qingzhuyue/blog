---
sidebar_position: 12
title: JavaScript：文档加载事件和浏览器的重排、重绘
slug: JavaScript：加载文档事件和浏览器重排、重绘
tags: [JavaScript]
---
很多时候需要在页面初始化阶段执行一些特定的操作，页面初始化的操作就是文档加载完成后的执行的操作。在DOM中，文档加载完成有两个事件，一个load事件，另一个是jQuery提供的ready事件。

ready事件的触发表示文档结构已经加载完成，不包含图片、flash这些非文字媒体内容。

onload事件的触发表示页面图片、flash这些所有元素已经加载完成。

## load事件

load事件，在页面、脚本或者图片加载完成后触发的，支持onload事件的标签元素有body、frame、frameset、iframe、img、link和script。

这个load事件的使用，有两种方式：
1、在标签上使用onload属性，类似于onclick事件属性一样，比如：

```html
<body onload="bodyLoad()">
    <script>
       function bodyLoad(){
        console.log("文档加载完成，执行load事件")
       }
    </script>
</body>
```

2、设置window对象的onload属性，属性值为一个函数，比如：

```javascript
       window.onload = function(){
        console.log("文档加载完成，执行load事件2222")
       }
```

如果这两种方式同时设置的话，只有第二种方式生效，因为在JavaScript里面声明的事件优先级高于在标签元素内声明的属性事件。如下代码：

```html
<body onload="bodyLoad()">
    <script>
       function bodyLoad(){
        console.log("文档加载完成，执行load事件")
       }

       window.onload = function(){
        console.log("文档加载完成，执行load事件2222")
       }
    </script>
</body>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac13eede8224403e81da4bf006efe081.png)
load事件的使用，很多情况下是因为我们把JavaScript单独写在一个文件中，然后在head内引入或者是直接在head使用script标签便携JavaScript代码。

然而head标签是优先于body标签进行解析的，如果这时候JavaScript代码中含有对body内其他标签的处理，就会出现代码中操作的对象未被加载的情况，例如：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a80eb3db0c374f84918a540cc8442ddf.png)
源码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        document.querySelector("#div").innerText = "页面加载完成"
    </script>
</head>

<body>
   <div id="div">div</div>
</body>

</html>
```

想要解决这个问题就是使用load事件，会在页面所有元素加载完成后再去调用。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.onload = function () {
            document.querySelector("#div").innerText = "页面加载完成"
        }
    </script>
</head>

<body>
    <div id="div">div</div>
</body>

</html>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a33c97eb65c94015b29332501ac3786f.png)

## 浏览器的重排、重绘

浏览器渲染HTML的过程大致分为4步：
1、HTML文件被解析为对应的DOM树，css文件也被解析为对应的样式规则集合
2、DOM树和css样式附在一起形成一个渲染树
3、节点信息计算，根据渲染树计算每一个节点的几何信息
4、根据计算好的几何信息，绘制整个页面。

那么重绘和重排是发生在第三步和第四步。

#### 重排

在对某一个DOM节点信息进行修改的时候，需要对该DOM结构进行重新运算，会改动周边其他DOM的位置，重排就是一种明显修改页面布局的操作。常见引起重排的操作：

1. 页面首次渲染，html页面中的元素位置、大小这些信息都是位置，需要和css样式规则集才能确定元素的信息，这个过程会产生很多元素的几何运算过程，所以发生重排
2. 浏览器窗口大小发生变化的时候，渲染树会从根元素html标签开始的所有元素都会重新计算几何信息，产生重排；
3. 元素尺寸或者位置发生改变
4. 元素内容发生变化
5. 元素字体发生变化，3、4、5种情况会导致渲染树相关的节点失效，浏览器会根据DOM元素的变化，重新构建渲染树中失效的节点，从而产生重排；
6. 添加或者删除可见元素，因为浏览器采用的流式布局模型，是从上到下、左到右遍历元素的，如果我们删除或者添加一个元素，那么对之前的元素是没有影响，而后面的元素就会重新计算几何信息，渲染树也需要重新构建修改后的节点，这就产生了重排；
7. 获取一些特殊的属性时，会引起重排，比如：

```html
· padding：内边距。
· display：元素显示方式。
· border：边框。
· position：元素定位方式。
· overflow：元素溢出处理方式。
· clientWidth：元素可视区宽度。
· clientHeight：元素可视区高度。
· clientLeft：元素边框宽度。
· clientTop：元素边框高度。
· offsetWidth：元素水平方向占据的宽度。
· offsetHeight：元素水平方向占据的高度。
· offsetLeft：元素左外边框至父元素左内边框的距离。
· offsetTop：元素上外边框至父元素上内边框的距离。
· scrollWidth：元素内容占据的宽度。
· scrollHeight：元素内容占据的高度。
· scrollLeft：元素横向滚动的距离。
· scrollTop：元素纵向滚动的距离。
· scrollIntoView()：元素滚动至可视区的函数。
· scrollTo()：元素滚动至指定坐标的函数。
· getComputedStyle()：获取元素的CSS样式的函数。
· getBoundingClientRect()：获取元素相对于视窗的位置集合的函数。
```

#### 重绘

重绘就是改变元素在页面中的展现样式，不会引起元素在文档流中位置的变化。比如文字颜色，背景和透明度等等。
