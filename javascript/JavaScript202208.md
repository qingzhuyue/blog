---
sidebar_position: 11
slug: JavaScript：DOM操作的性能优化
title: JavaScript：DOM操作的性能优化
tags: [JavaScript]
---
浏览器的重排和重绘是比较消耗性能的操作，所以网页性能优化的手段就是减少重排和重绘的操作。比如：

## 多次更改样式的操作合并为一次操作

我们在JavaScript中修改样式，比如：

```javascript
const changeDiv = document.querySelect("#div");
changeDiv.style.width = '190px';
changeDiv.style.height = '190px';
changeDiv.style.background = 'red';
changeDiv.style.marginLeft = '20px';
```

这种方式修改样式，实际上是多次操作修改style属性，引起多次重绘或者是重排。其实这种操作，我们就可以合并为一次操作即可：

```css
.changDiv{
 width:'190px';
 height:'190px';
 background:'red';
 margin-left:'20px';
}
```

```js
const changDiv = document.querySelect('.div');
changeDiv.className = 'div';
```

这样就是在最后修改div的className的时候才发生重排或者重绘。

## 把多次发生重排的元素设置为绝对定位

一般情况下元素是处在正常的文档流中，如果这个元素发生重排就会影响到其他周边元素。要是这个元素脱离文档流，那么它的变化就不会影响到其他元素的变化，从而不会引起重排的操作。需要设置position属性为absolute或者是fixed。

比如有一个动画元素，它频繁改动位置、宽高这些属性，这样的元素可以考虑将它设置为绝对定位或者固定定位。

## 在内存中多次操作节点、完成后再添加到文档树中

比如我们通过异步请求拿到一个表格数据，然后渲染到页面上。现在在渲染的时候有两种方式：

1. 每次构造一行数据就添加一次，也就是append到表格中
2. 一次性构造数据，最后只需要添append一次 就好了。

方法一就是每添加一次就引起浏览器重排和重绘的操作，如果数据很大的话，渲染时可能发生卡顿。

方法二只会引起一次重排和重绘，在性能上有很大的提升。

## 在处理复杂交互的元素时候，将设置它的display属性值为none，出来完交互后在显示

因为display属性设置为none的时候，就不会出现在渲染树上，所以在对它进行处理时不会引起其他元素的重排，等待处理完成后在显示出来，这样前后只发生两次重排或者重绘的操作。

## 尽量使用table布局

因为table布局的中任何一个元素发生变化，都会导致整个table发生重排。尤其是在table内容比较庞大的时候。

## 使用事件委托

在对多个同一个层级元素做事件绑定的时候，使用事件委托机制来处理，这样可以减少事件处理程序的数量，从而提高性能

## 利用DocumentFragment操作DOM节点

DocumentFragment是一个没有父级节点的最小文档对象，它可以用于存储已经排好版或者尚未确定格式的HTML片段。DocumentFragment最核心的知识点在于它不是真实DOM树的一部分，它的变化不会引起DOM树重新渲染的操作，也就不会引起浏览器重排和重绘的操作，从而带来性能上的提升。

这就DOM操作的几点优化
