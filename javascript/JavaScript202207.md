---
sidebar_position: 10
slug: JavaScript：Encoding和原生拖放事件
title: JavaScript：Encoding和原生拖放事件
tags: [JavaScript]
---
Encoding 是用于实现字符串和定型数组之间的转换，有四个用于执行转换的全局类：TextEncoder、TextEncoderStream、TextDecoder和TextDecoderStream。

## 文本编码
Encoding提供了两种字符串转换为定型数组二进制格式的方法：**批量编码和流编码**。把字符串转换为定型数组的时候，编码器始终使用的是UTF-8。
##### 批量编码
批量编码，指的是JavaScript引擎会同步编码整个字符串，对很长的字符串，花费时间比较长。

批量编码是通过TextEncoding的实例来完成的：`const  textEncoder =  new  TextEncoder()`。

```
const textEncoder = new TextEncoder();
const text = textEncoder.encode("foo");

console.log('====================================');
console.log(text);
console.log('====================================');
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/1946bb8e312949beb88cff1831b0e395.png)

其中f的UTF-8编码是0x66，十进制为102。

编码器还有一个方法是encodeInto()方法，接收一个字符串和目标Unit8Array，返回一个对象，该对象含有read和writen属性，表示成功从源字符串中读取多少字符和向目标数组写入多少字符。如果空间不够，编码就会提前终止，比如：

```
const textEncoder = new TextEncoder();
const fooArr = new Uint8Array(3);
const barArr = new Uint8Array(2);
const fooResult = textEncoder.encodeInto('foo', fooArr);
const barResult = textEncoder.encodeInto('bar', barArr);
console.log(fooArr);     // Uint8Array(3) [102, 111, 111]
console.log(fooResult); // {read: 3, written: 3}
console.log(barArr);     // Uint8Array(2) [98, 97]
console.log(barResult); // {read: 2, written: 2}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/da048bf9a04f43358f590e7d6794cda4.png)

## 文本解码
Encoding 提供了两种定型数组转换为字符串的方式：批量解码和流解码。

##### 批量解码
JavaScript引擎会同步解码整个字符串，对于很长的字符串，也是会花费很长时间的。批量解码是通过TextDecoder的实例来完成的。比如：

```
const textEncoder = new TextEncoder();
const  textDecoder = new TextDecoder();
const encodeText = textEncoder.encode("foo");
const decoderText = textDecoder.decode(encodeText);
console.log("解码：",decoderText); // 解码：foo
```
## 拖放事件

当一个元素被拖放的时候，会触发以下几个事件：dragstart、drag、dragend。按住鼠标键不放开，被拖动的元素上就会触发dragstart事件；之后只要目标元素还被拖动就会一直触发的drag事件；拖动停止后，就触发dragend事件。

 在把元素放到一个有效的放置目标上的时候，会依次发生以下事件：dragenter、dragover、dragleave或者drop。

元素拖动到放置目标上的时候，就触发dragenter事件，之后立即触发dragover事件，并且元素在放置区域范围内被拖动的过程中dragover事件一直在触发，只有在元素被拖动到放置区域外面的时候，dragover才会停止触发，然后触发dragleave事件。如果被拖动元素被放到目标上，那么就会触发drop事件而不是dragleave。

## 定义放置区域
当我们把一个元素拖动到无效放置区域上的时候，就会看到一个特殊的光标，表示不能放下。通过dragenter和dragover事件的默认行为，就可以把认可元素转换为有效的放置区域。代码如下：
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>原生拖放事件</title>
    <style>
        #droptarget {
            width: 100px;
            height: 100px;
            border: 1px solid red;
        }
    </style>
</head>

<body>
    <div id="droptarget"></div>

    <script>
        let dropTarget = document.getElementById("droptarget");
        dropTarget.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        dropTarget.addEventListener("dragenter", (event) => {
            event.preventDefault();
        })
    </script>
</body>
</html>
```
## 可拖动能力
一般情况下，图片、链接和文本是可以拖动的。其中文本是在被选中后才可以拖动。如果想让其他元素变得可以拖动，那么就需要在该元素上定义一个draggable，表示是可以拖动。
 
如果要设置图片或者链接禁止拖动，则直接在元素的draggable属性设置为false即可。

效果如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/3483dee9ac534f5888b3a86a58066999.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4ccd758a88764d32bdd32242802dd9e4.png)

这样我们就可以在不同的事件中，编写对应的逻辑。