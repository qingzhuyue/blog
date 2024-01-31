---
sidebar_position: 5
slug: JavaScript：客户端存储
title: JavaScript：客户端存储
tags: [JavaScript]
---
## cookie
用于客户端存储会话信息。在浏览器中会对cookie做一些限制：
❑ 不超过300个cookie；
❑ 每个cookie不超过4096字节；
❑ 每个域不超过20个cookie；
❑ 每个域不超过81920字节。

每个域能设置的cookie总数也是受限的，但不同浏览器的限制不同。例如：
❑ 最新版IE和Edge限制每个域不超过50个cookie；
❑ 最新版Firefox限制每个域不超过150个cookie；
❑ 最新版Opera限制每个域不超过180个cookie；
❑ Safari和Chrome对每个域的cookie数没有硬性限制。

## Web Storage
Web Storage定义了两个对象：localStorage和sessionStorage。localStorage是永久存储机制，sessionStorage是跨会话的存储机制。这两种存储方式都不会因为网页刷新而影响存储数据的。

storage类型用于保存键值对数据，storage实例包含了以下几个方法：

1. clear()：删除所有的值
2. getItem(name)：获取name的值
3. key(index)：获取对应位置的名称
4. removeItem(name)：删除name的键值对
5. setItem(name,value)：设置name的键值对

#### sessionStorage对象
sessionStorage对象只存储会话数据，会话数据只会储存到浏览器关闭，浏览器关闭时数据就会清空。另外存储在sessionStorage对象中的数据只能在最初存储数据的页面使用，无法在多页面应用程序中使用。

sessionStorage对象是Storage的实例，所以可以通过setItem方法或者直接给属性赋值：

```javascript
    // 使用方法存储数据
    sessionStorage.setItem("name", "Nicholas");
    // 使用属性存储数据
    sessionStorage.book = "Professional JavaScript";
```
对于存储在sessionStorage对象上的数据，可以使用getItem方法或者直接访问属性名来获取值：

```javascript
    // 使用方法取得数据
    let name = sessionStorage.getItem("name");
    // 使用属性取得数据
    let book = sessionStorage.book;
```
 #### localStorage对象
 localStorage作为在客户端永久存储数据的机制，要访问同一个localStorage对象，页面必须来自同一个域（子域不可以）、在相同的端口上使用相同的协议。
localStorage是storage的实例，那么localStorage可以使用storage的方法：

```javascript
    // 使用方法存储数据
    localStorage.setItem("name", "Nicholas");
    // 使用属性存储数据
    localStorage.book = "Professional JavaScript";
    // 使用方法取得数据
    let name = localStorage.getItem("name");
    // 使用属性取得数据
    let book = localStorage.book;
```

## 存储事件
当Storage对象发生变化的时候。都会在文档上触发storage事件，比如使用属性或者setItem设置值、使用delete或者removeItem删除值，以及每次调用clear的时候都会发生这个事件。

这个事件对象有这几个属性：

1. domain：存储变化对应的域。
2. key：被设置或删除的键。
3. newValue：键被设置的新值，若键被删除则为null。
4. oldValue：键变化之前的值

storage事件不会区分sessionStorage还是localStorage。

```javascript
        window.addEventListener("storage",(e)=>{
            console.log("storage",e)
        })
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9052a57893a34f0d9acf878e02db2f53.png)


