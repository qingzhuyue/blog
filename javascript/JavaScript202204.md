---
sidebar_position: 7
slug: JavaScript：Promise进阶
title: JavaScript：Promise进阶知识
tags: [JavaScript]
---

## Promise

Promise就是ES6新增的一个用于解决异步编程的方案。以前，我们在处理异步的时候，都是在回调函数内做处理的。比如Ajax请求，是在success属性里面做异步处理的，那么如果在一个请求中需要执行读个异步请求，第二个请求是依赖于第一个请求的结果，这样就导致代码嵌套很深，可读性差、很难维护并且难以复用。

那么Promise正好可以解决这样的问题，Promise有3种状态：pending、fulfilled和rejected。Promise在创建阶段是属于pending状态，接着状态只能有两种一个数fulfilled或者rejected，状态改变后就不能再发生变化了，例如：

```javascript
const promise = new Promise((resolve, rejected) => {
    // 异步请求处理
    if (/异步请求/) {
        resolve();
    } else {
        rejected();
    }
})
```

异步请求成功，则执行resolve函数，否则执行rejected函数，resolve和rejected函数可以传参数，作为后面.then函数或者catch函数的数据源。

Promise在创建后立即调用，然后等待执行resolve或者是rejected函数来确定Promise的最终状态，比如下面代码：

```javascript
const promise = new Promise((resolve, rejected) => {
    console.log("Promise");
    resolve();
})

promise.then(() => {
    console.log("resolve")
});

console.log("hello")
```

结果就是Promise，hello，resolve。因为Promise创建后会立即执行，输出Promise；然后是执行resolve函数，这样就会触发then函数里面的回调函数，但是它需要等待当前线程代码执行完毕后再执行，缩回跳过，先执行后面的代码，输出hello，最后执行then的回调函数，输出resolve。

then函数，返回的是一个Promise对象实例，所以可以通过链式调用then函数，在上一个then函数内return的值是下一个then函数接收的数据，比如：

```javascript
const promise = new Promise((resolve, rejected) => {
    resolve(1);
})

promise.then((res) => {
    console.log(res);
    return 2;
}).then(res => {
    console.log(res);
    return 3;
}).then(res => {
    console.log(res)
})
```

结果就是一次打印1，2，3。这样就是可以解决异步回调地狱的问题。

catch函数，是Promise执行失败的回调。如果我们在Promise中手动抛出一个异常，来测试catch函数，代码如下：

```javascript
const promise1 = new Promise((resolve, rejected) => {
    try {
        throw new Error("测试");
    } catch (error) {
        rejected(error)
    }
})

promise1.catch(err=>{
    console.log(err); // Error: 测试
})
```

然而Promise在执行中，如果出现异常就会自动抛出，这样上面的代码可以改为：

```javascript
const promise1 = new Promise((resolve, rejected) => {
    throw new Error("测试");
})

promise1.catch(err=>{
    console.log(err); // Error: 测试
})
```

但是需要注意，Promise的状态一旦变味fulfilled成功状态，然后再抛出异常，是不能触发catch的，因为前面已经说过了Promise的状态只要发生变化后就不能再次更改。

## Promise静态方法

##### Promise.all()函数

将多个Promise对象实例包装成为一个Promise实例，参数是一个数组，这个Promise的状态是由所有传入Promise对象来决定，当所有的Promise的状态为fulfilled，这个新的Promise的状态才是fulfilled状态，如果有一个promise的状态为rejected，那么这个新Promise的状态就是reject。

现在使用一段代码来理解上面的描述：

```javascript
const p1 = new Promise((resolve, reject) => {
    resolve("success")
})

const p2 = new Promise((resolve, reject) => {
    resolve(1)
})

const p = Promise.all([p1, p2]);
p.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err)
})
// [ 'success', 1 ]
```

如果p1，p2中已经定义了对应的catch，当有一个promise状态变为reject的话，promise.all不会触发catch函数了，比如：

```javascript
const p1 = new Promise((resolve, reject) => {
    resolve("success")
}).then(res => res).catch(err => err)

const p2 = new Promise((resolve, reject) => {
    throw new Error("报错")
}).then(res => res).catch(err => err)

const p = Promise.all([p1, p2]);
p.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
// [ 'success',  Error: 报错 ]
```

##### Promise.race 函数

通过race方法来合并多个promise，那么这个promise状态是最先更新状态的promise的状态，比如：

```javascript
const p1 = new Promise((resolve, reject) => {
}).then(res => res).catch(err => err)

const p2 = new Promise((resolve, reject) => {
    reject("失败了")
}).then(res => res).catch(err => err)
const race = Promise.race([p1, p2]);
race.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
}) // 失败了
```

##### Promise.any函数

传入一个可迭代的参数，如数组。
结果为：
1、所有promise状态都为成功，返回的是第一个promise的成功状态

```javascript
//1.获取轮播数据列表

function getBannerList() {
    return new Promise((resolve, reject) => {
        resolve('banner')
    })
}

//2.获取店铺列表

function getStoreList() {
    return new Promise((resolve, reject) => {
        resolve('store')
    })
}

//3.获取分类列表

function getCategoryList() {
    return new Promise((resolve, reject) => {
        resolve("失败了")
    })
}

function initLoad() {

    Promise.any([getBannerList(), getStoreList(), getCategoryList()])

        .then(res => {

            console.log(res)

        }).catch(err => {

            console.log(err)

        })

}
initLoad(); // banner

```

2、有一个promise的状态为失败，那么就返回第一个状态为成功的promise：

```javascript
//1.获取轮播数据列表

function getBannerList() {
    return new Promise((resolve, reject) => {
        reject('banner')
    })
}

//2.获取店铺列表

function getStoreList() {
    return new Promise((resolve, reject) => {
        resolve('store')
    })
}

//3.获取分类列表

function getCategoryList() {
    return new Promise((resolve, reject) => {
        resolve("失败了")
    })
}

function initLoad() {

    Promise.any([getBannerList(), getStoreList(), getCategoryList()])

        .then(res => {

            console.log(res)

        }).catch(err => {

            console.log(err)

        })

}
initLoad(); // store
```

3、所有promise状态为失败的，那么返回的是[AggregateError: All promises were rejected]：

```javascript
//1.获取轮播数据列表

function getBannerList() {
    return new Promise((resolve, reject) => {
        reject('banner')
    })
}

//2.获取店铺列表

function getStoreList() {
    return new Promise((resolve, reject) => {
        reject('store')
    })
}

//3.获取分类列表

function getCategoryList() {
    return new Promise((resolve, reject) => {
        reject("失败了")
    })
}

function initLoad() {

    Promise.any([getBannerList(), getStoreList(), getCategoryList()])

        .then(res => {

            console.log(res)

        }).catch(err => {

            console.log(err)

        })

}
initLoad(); // [AggregateError: All promises were rejected]

```
