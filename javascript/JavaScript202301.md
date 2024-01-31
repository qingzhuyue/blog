---
sidebar_position: 0
title: JavaScript：Reflect全局对象，对象代理
slug: JavaScript：Reflect全局对象、对象代理
tags: [JavaScript]
---
这是之前写的，关于Proxy的文章：[JavaScript的Proxy代理](https://blog.csdn.net/xuelian3015/article/details/122780136?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167351711716782429737475%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=167351711716782429737475&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-122780136-null-null.blog_rank_default&utm_term=proxy&spm=1018.2226.3001.4450)

## Reflect

Reflect是一个全局对象，内置的，提供了拦截JavaScript操作的方法，另外Reflect不是一个函数对象，所以它不是构造函数。它就像Math对象一样，所有的属性和方法都是静态的，比如

##### Reflect.apply(target,thisArgument,argumentsList)

对一个函数进行调用操作，同时传入一个数组作为调用参数。
target：目标函数
thisArgument：目标函数调用时绑定的this对象
argumentsList：目标函数调用时传入的参数列表，是一个类数组。

比如

```javascript
function fn(name){
    console.log("Name:",name)
}
Reflect.apply(fn,undefined,["duxin"]); // Name: duxin
```

##### Reflect.construct(target,argumentList[, newTarget])

和new 操作符一样，执行的是new target(...args)，这里的target是目标构造函数，比如：

```javascript
function MyClass(name){
    this.class = name;
}
const obj = Reflect.construct(MyClass,['duxinyues'])

console.log(obj); // MyClass { class: 'duxinyues' }
console.log(obj instanceof MyClass) ; // true
```

##### Reflect.defineProperty(target, propertyKey, attributes)

在目标对象中添加一个属性或者是修改一个属性值，比如：

```javascript
let obj1 = {}
Reflect.defineProperty(obj1, 'x', { value: 7 })  // true
console.log(obj1.x)                                         // 7
console.log(Reflect.defineProperty(obj1, "name",{value:"duxin"}))
console.log(obj1.name) 
```

如果Reflect.defineProperty用来检测一个对象的属性是否已经定义，如果是，则返回true。

##### Reflect.deleteProperty(target,propertyKey)

和delete操作符一样，是删除对象的一个属性。比如：

```javascript
let obj ={
    name:"duxin"
}
console.log(obj);//{ name: 'duxin' }
Reflect.deleteProperty(obj,"name")
console.log(obj);//{}
```

##### Reflect.get(target,propertyKey)

获取对象的某一个属性值，比如：

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.get(obj,"name"));// duxin
```

##### Reflect.getOwnPropertyDescriptor(target, propertyKey)

判断对象中是否存在一个属性，如果存在，那么返回该属性描述符，比如属性值，是否可读写等等信息，如果不存在该属性，那么返回undefined。

示例代码：

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.getOwnPropertyDescriptor(obj, "name"))
```

输出内容如下：

```javascript
{
  value: 'duxin',
  writable: true,
  enumerable: true,
  configurable: true
}
```

##### Reflect.getPrototypeOf(obj)

和Object.getPrototypeOf(obj)一样，返回目标对象的原型

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.getPrototypeOf(obj)); // [Object: null prototype] {}
```

##### Reflect.has(target, propertyKey)

判断一个对象是含有某一个属性，比如

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.has(obj,"x")); // false
```

##### Reflect.isExtensible()

判断一个对象是否可扩展。

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.isExtensible(obj)); //true
```

##### Reflect.ownKeys(obj)

返回对象自身的所有属性，和Object.keys()一样。

```javascript
let obj ={
    name:"duxin"
}
console.log(Reflect.ownKeys(obj)); //[ 'name' ]
```

##### Reflect.preventExtensions(obj)

将一个对象设置为不可扩展，不能添加新属性

```javascript
let obj = {
    name: "duxin"
}
console.log(Reflect.isExtensible(obj)); // true
Reflect.preventExtensions(obj);
console.log(Reflect.isExtensible(obj)); //false
```

##### Reflect.set(target, propertyKey, value[, receiver])和

修改对象属性的属性值，

##### Reflect.setPrototypeOf(target, prototype)

设置对象原型的函数。

```javascript
let obj = {
    name: "duxin"
}

console.log(Reflect.setPrototypeOf(obj, Object.prototype));// true
```
