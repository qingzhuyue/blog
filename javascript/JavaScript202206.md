---
sidebar_position: 9
slug: JavaScript：Fetch
title: JavaScript：Fetch
tags: [JavaScript]
---

fetch能够执行XMLHttpRequest对象的所有任务，接口更加现代化。XMLHttpRequest可以选择异步，而fetch必须是异步的。

## 基本用法

fetch方法是暴露在全局作用域中的。在使用的时候，需要传入一个必选项URL，这个参数是获取资源的URL。

在读取响应的时候，根据需要获取对应的格式内容，比如常见的json方法：

```javascript
fetch("url").then(res=>res.json()).then(res=>{
 console.log(res);
})
```

fetch支持通过response的status和statusText属性检查响应状态，成功获取响应的请求通常会产生值为200的状态码：

```javascript
fetch("url")
.then(res=>{
 console.log(res.status); // 200
 console.log(res.statusText); // ok
})
```

## fetch请求模式

1. 发送JSON数据格式：

```javascript
    let payload = JSON.stringify({
      foo: 'bar'
    });
    let jsonHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    fetch('/send-me-json', {
      method: 'POST',    // 发送请求体时必须使用一种HTTP方法
      body: payload,
      headers: jsonHeaders
    });
```

2. 在请求体中发送参数：

```javascript
    let payload = 'foo=bar&baz=qux';
    let paramHeaders = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    fetch('/send-me-params', {
      method: 'POST',   // 发送请求体时必须使用一种HTTP方法
      body: payload,
      headers: paramHeaders
    });
```

3. 发送文件，因为请求体支持FormData，fetch可以序列化并且发送文件字段中的文件：

```javascript
    let imageFormData = new FormData();
    let imageInput = document.querySelector("input[type='file']");
    imageFormData.append('image', imageInput.files[0]);
    fetch('/img-upload', {
      method: 'POST',
      body: imageFormData
    });
```

还可以发送多个文件：

```javascript
    let imageFormData = new FormData();
    let imageInput = document.querySelector("input[type='file'][multiple]");
    for(leti=0;i<imageInput.files.length;++i){
      imageFormData.append('image', imageInput.files[i]);
    }
    fetch('/img-upload', {
      method: 'POST',
      body: imageFormData
    });
```

4. 加载Blob文件，fetch也提供了Blob类型的响应。比如加载图片，将图片加载到内存中，然后添加到HTML图片元素，这样就可以使用响应对象上暴露的blob方法，得到一个Blob实例，然后，可以将这个实例传给URL.createObjectUrl()以生成可以添加给图片元素src属性的值：

```javascript
    const imageElement = document.querySelector('img');
    fetch('my-image.png')
      .then((response) => response.blob())
      .then((blob) => {
        imageElement.src = URL.createObjectURL(blob);
      });
```

5. 跨域请求，从不同的源请求资源，响应要包含CORS头部才能保证浏览器收到响应；
6. 中断请求，Fetch API支持通过AbortController/AbortSignal对中断请求。调用AbortController. abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的fetch()请求会导致包含错误的拒绝。

```javascript
    let abortController = new AbortController();
    fetch('wikipedia.zip', { signal: abortController.signal})
      .catch(() => console.log('aborted! ');
    // 10 毫秒后中断请求
    setTimeout(() => abortController.abort(), 10);
    // 已经中断
```

## Headers对象

Headers对象是所有外发请求和接收响应头部的容器，每发一次request实例都包含了一个空的Header实例。根据需要设置不同的header参数。

## Request对象

Request对象是获取资源请求的接口。这个接口暴露了请求的相关信息，也暴露了使用请求体的不同方式。

1. 创建Request对象：

```javascript
    let r = new Request('https://foo.com');
    console.log(r);
    // Request {...}
```

Request对象构造函数也接收第二个参数，这个参数就是一些常规的设置，比如method。
2. 克隆Request对象，Fetch提供两种方式来创建Request对象的副本：使用Request构造函数和使用clone方法。clone方法的代码如下：

```javascript
    let r1 = new Request('https://foo.com', { method: 'POST', body: 'foobar' });
    let r2 = r1.clone();
    console.log(r1.url);        // https://foo.com/
    console.log(r2.url);        // https://foo.com/
    console.log(r1.bodyUsed); // false
    console.log(r2.bodyUsed); // false
```
