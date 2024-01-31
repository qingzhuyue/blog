---
sidebar_position: 11
title: JavaScript：来一波Promise用法实例，可能是面试题吧
slug: JavaScript：Promise用法
tags: [JavaScript]
---
对Promise有一定的了解后，但是在面对一些关于Promise的面试，还是感觉力不从心。现在整理一下Promise的使用场景：

###### 1、Promise和同步代码一起执行

看一下这段代码的结果是什么？

```javascript
const promise = new Promise((resolve,reject)=>{
    console.log(1);
    resolve();
    console.log(2)
})
promise.then(()=>{
    console.log(3)
})

console.log(4)
```

promise创建后就立即执行，那就或输出1，2，4。
resolve或者reject函数会在同步代码之后执行，等到resolve或者reject执行后，就进入了then或者catch函数。所以最好才输出3。

###### 2、同一个Promise实例内resolve和reject执行先后

代码如下：

```javascript
const promise = new Promise((resolve,reject)=>{
    resolve(1);
    reject(2);
    resolve(3)
})
promise.then((res)=>{
    console.log("then",res)
}).catch(err=>{
    console.log("catch",err)
})
```

会输出什么样的结果呢？
答案是then 1。

要记住，promise状态的变更只有一次，当执行resolve或者reject，就完成一次状态变更。

###### 3、promise实例重复执行

代码如下：

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1);
        resolve(2)
    }, 1000)
})
const start = Date.now();


promise.then((res) => {
    console.log(res, Date.now() - start)
})

promise.then(res => {
    console.log(res, Date.now() - start)
})
```

答案是一秒后输出1， 2 1017，2 1017

当promise实例变更状态后，就会触发所有的then或者catch函数，所以上面的代码中第一个then和第二个then函数执行的结果是一样的。

###### 4、在then函数返回一个异常

代码如下：

```javascript
const promise = new Promise((resolve, reject) => {
    resolve(20)
})
promise.then((res) => {
    console.log(res);
    return new Error("Error")
}).then(res => {
    console.log(22)
    console.log('then', res)
}).catch(err => {
    console.log("Error", err)
})
```

答案是：
20
22
then  Error: Error

其实在then中return的异常，和promise没有联系，所以不会触发catch函数。而是按照正常流程执行下去，把then中return的异常作为下一个then函数的的数据源。

注意：返回异常和抛出异常是不同概念的，如果是抛出异常就会被catch函数捕获，代码如下：

```javascript
const promise = new Promise((resolve, reject) => {
    resolve(20)
})
promise.then((res) => {
    console.log(res);
    throw new Error("Error")
}).then(res => {
    console.log(22)
    console.log('then', res)
}).catch(err => {
    console.log("Error", err)
})
```

输出结果：
20
Error Error: Error

###### 5、then的参数不是函数

代码如下：

```javascript
const promise = new Promise((resolve, reject) => {
    resolve(20)
})
promise.then(21)
    .then(res => {
        console.log('then', res)
    })
    .then(Promise.resolve(34))
    .catch(err => {
        console.log("Error", err)
    })
```

答案是20。

因为promise的then函数或者catch函数接受的是一个函数，如果传入其他值，那么就会产生穿透现象。也就是传入非函数的值会被忽略掉，执行后面的函数。

暂时到这里吧，以后遇到了再说哈
