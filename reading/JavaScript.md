---
sidebar_position: 0
slug: 《JavaScript百炼成仙》
title: 《JavaScript百炼成仙》
authors: duxinyues
tags: ["悦读"]
---
<!--
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-02-19 21:36:57
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-02-19 21:38:52
 * @FilePath: \blog\reading\JavaScript.md
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
-->
**编程之修，重在积累，而非资质。资质虽然重要，可是后天的努力更不可少**。

《JavaScript百炼成仙》是一本以玄幻小说的形式，来讲述JavaScript的知识。

此篇仅仅是我快速阅读《JavaScript百炼成仙》这本书的笔记，流水账笔记，望君一阅！

小说的主角为叶小凡【叶小凡，这个名字有点熟悉，也就是玄幻小说中常见主角的名字】，叶小凡是乐阳村中唯一一个具备修行JavaScript的甲等资质的孩子，于是就被送到千鹤派修炼JavaScript。

## 《JavaScript基础修炼要诀》

JavaScript是一种神奇的功法，修炼成以后，可以翻山倒海，足以称霸一方天地。

叶小凡来到千鹤派的青山院，得到一卷功法《JavaScript基础修炼要诀》

### 变量和字面量

《JavaScript基础修炼要诀》第一章：直接量，也就是我们常说的字面量，比如数字
字符串、布尔值等等。

字面量，只是一个值而已，在编程中，无法直接使用字面量。例如：数字5，在编程中是不能单独存在的。

而是通过定义一个变量来存储字面量。

变量，则是通过var来定义的，再将字面量赋值给该变量，通过变量来使用字面量。比如：

```javascript
var num = 100;
if(num>10){
   console.log(num)
}
```

### 数据类型

在编程中，字面量是一种数据。

数据是分类型的，在JavaScript中，数据分为两种类型：原始数据类型和引用数据类型，有人将原始数据类型称为简单数据类型、引用数据类型称为复杂数据类型；有人将原始数据类型称为原生数据类型，引用数据类型称为对象数据类型。反正都是指向同一个类型，不同的叫法而已。不必过多纠结。

原始数据类型：number、string、Boolean、null、undefined、symbol和BigInt
引用数据类型：object

null是一个特殊的关键字，表示空值；
undefined，表示一个变量未定义。

引用数据类型object，是一种复合数据类型。

### 函数
函数是一组可以重复调用的代码语句，通过function关键字来定义。

#### JavaScript运行机制

JavaScript编译原理：JavaScript代码在运行之前，会经历一个编译过程，分为三个步骤：

1. 分词，分词的目的就是将代码分解为有意义的代码块；
2. 解析，JavaScript代码是不能直接运行的，只有通过对代码块进行编译之后才可以被识别，然后再通过JavaScript引擎执行代码逻辑。解析就是对分词后得到的代码块进行解析，生成一棵抽象的语法树。抽象语法树定义了代码本身，通过操作语法树可以准确定位到赋值语句、声明语句和运算语句。
3. 代码生成，JavaScript引擎把语法树转换成可以执行的代码。比如：

`var a = 90`，效果如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ad301e6e0a234109b5da86a3893a9b48.png)

#### 作用域

作用域就是在一个范围内查找变量，那么这个范围就是作用域。

在JavaScript中，作用域分为：全局作用域、函数作用域和块作用域。

#### 闭包

闭包，其实就是函数嵌套，里面的函数可以访问外面函数的变量。

形成闭包的条件：

1. 函数内有声明一个函数；
2. 函数内部的函数调用外部函数的局部变量
3. 外部函数把内部函数return出去。

一般情况下，我们在调用一个函数，里面的局部变量会在函数调用之后销毁。这就是全局作用域不能访问函数内部变量的原因。闭包的作用就是让函数的局部变量不随着原函数的销毁而销毁。比如：

```javascript
function test() {
    let a = 0;
    return function (parma) {
        a = a + parma;
        console.log(a)
    }
}
let add = test();

add(1)
add(1)
```

这样每次在调用内部函数的时候，里面访问的都是同一个变量了。

使用闭包操作，可以减少很多不必要的全局变量。

#### 自动执行函数

就是在定义之后就立即执行函数，一般是匿名函数。比如上面代码中，做一下修改：

```javascript
let add = (function() {
    let a = 0;
    return function (parma) {
        a = a + parma;
        console.log(a)
    }
})();

add(1); //1
add(1); //2
```

 后面的就是VUE和ES6，关于ES6和VUE还是用单独篇章来记录吧！
