<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-02-04 12:41:09
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-03-24 14:55:00
 * @FilePath: /blog/javascript/promise.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->
Promise是用来处理异步操作的一个对象，它提供统一的API来解决异步编程中的回调地狱问题。

Promise有三个状态：
1. 待定【pending】，
2. 已完成【fulfilled】，
3. 失败【rejected】

执行Promise对象后，就进入待定状态，然后经过一次状态转变，要么变成fulfilled，要么变成rejected。

创建一个Promise的时候，给Promise构造函数传一个执行器函数，这个执行器函数接收两个参数，分别是resolve和reject，resolve是用来改变Promise状态为fulfilled，reject是用来改变Promise状态为rejected的

在Promise状态改变之后，通过使用then方法来获取到成功的结果，catch方法获取失败的结果。

比如：
```
const pro = new Promise((resolve, reject) => {
  reject({ code: 200 })
});


pro.then(res=>{
  console.log("res：",res)
}).catch(err=>{
  console.error("err",err)
})
```

初次之外，Promise还提供几个静态方法：Promise.all、Promise.allSettled、Promise.race

Promise.all，将多个一步操作并行处理，当所有结果成功返回的时候，会按照请求的顺序返回。

当有一个请求失败的时候，就会进入reject方法。

Promise.any，也是将多个异步操作并行执行，但是只要有一个Promise实例的状态是fulfilled，那么最终返回的也是fulfilled状态。如果所有的Promise实例都是rejected状态，那么Promise.any最终返回的是rejected状态。

Promise.race，也是将多个异步操作并行执行，但是只要有一个Promise实例发生状态改变，那么Promise.race就返回这个Promise实例的结果。