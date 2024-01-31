<!--
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-06-08 01:05:51
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-10-14 15:10:25
 * @FilePath: /blog/blog/javascript/JavaScript202302.md
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
-->
---
sidebar_position: 0
title: 理解虚拟DOM、innerHTML和JavaScript操作DOM
slug: 虚拟DOM、innerHTML和JavaScript操作事件
tags: [JavaScript]
---
UI就是用户界面，需要处理两件事情：

1. 呈现内容、反馈
2. 用户交互

先了解一下声明式UI和命令式UI，这两个概念。

声明式，倾向的是现实表达，比如react或者vue；
命令式，倾向的是执行过程，比如JQuery，就是典型的命令式UI框架；

比如现在有一个div标签，id为app，文本内容为text。需要点击div修改文本内容为“hello world”。

jQuery：

```javascript
$("#app").text("hello world");
```

原生JavaScript：

```javascript
        let app = document.querySelector('#app')
        app.addEventListener("click", function () {
            app.innerText = "hello world";
        })
```
React：

```javascript
import React from "react";
function WordClassification() {
  const [text,setText] = React.useState('text');

  return <div onClick={()=>{
    setText("hello world")
  }}>{text}</div>;
}

export default WordClassification;
```
通过代码的比较，可以看出，命令式UI代码指出了每一个步骤是做什么；而声明式UI代码呢，只是给出：“我要点击div，修改内容”，这样的结果。

在设计UI框架的时候，我们需要从性能和可维护性的角度来权衡。对于命令式代码来说，已经是做到极致的性能优化了，因为我们明确知道哪些发生了变化，只需要做出修改就行。

而声明式代码就不一定了，因为它所描述的是一个结果。对于声明式UI框架来说，在更新的时候，性能达到最优，就需要找到前后的差异并且只更新变化的部分，查找前后差异也是消耗性能的。和命令式UI框架相比较，声明式UI框架就多出了查找差异这部分的性能。但是，声明式代码更利于维护。在声明式代码中，将性能调到最优，更接近接近命令式代码的性能，就是将查找差异这部分的性能降到最低，就可以了。

那么虚拟DOM，就是为了将查找差异部分的性能最小化。
## 虚拟DOM
虚拟DOM在转化为真实DOM的过程中分为两部分：

1. 先创建JavaScript对象，也就是虚拟DOM【因为虚拟DOM就是描述真实DOM】；
2. 遍历虚拟DOM来创建真实DOM。

需要更新的时候，重新创建一个JavaScript对象，然后比较前后虚拟DOM，找到变化的元素并且更新它。

除此之外，我们更新页面还有两种方式：innerHTML和原生js【比如createElement之类的DOM操作方法】

## innerHTML模板
innerHTML是用来或者或者设置HTML语法表示的元素的后代。在创建一个页面的时候，需要构造一段HTML字符串、再将这段HTML字符串赋值给DOM元素的innerHTML属性。

为了将这段html字符串渲染成页面，首先需要把字符串解析为DOM树，这个过程涉及到DOM的计算，性能远远比JavaScript计算的性能差。

使用innerHTML更新页面，其实就是重新构建HTML字符串，再重新设置DOM元素的innerHTML属性，也就是需要销毁所有旧的DOM元素，然后再全量创建新的DOM元素。

对于虚拟DOM来说，不管页面有多大，都只会更新变化的内容；对于innerHTML来说，页面越大，更新时性能消耗就越大。

## 原生JavaScript操作DOM
性能高，但是可维护性极差。因为需要手动创建、删除、修改大量的DOM元素。

如下图所示，三种方式的比较
![在这里插入图片描述](https://img-blog.csdnimg.cn/5e98e945be1a4b3cb979222de7f82b8e.png)
