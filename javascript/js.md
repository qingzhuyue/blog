---
sidebar_position: 3
slug: JavaScript Ajax
title: JavaScript：Ajax
tags: [JavaScript]
---
Ajax是前端好后端数据交互的方式，通过异步请求就可以在不需要刷新页面的情况下，达到局部刷新的效果。

Ajax的原理就是通过XMLHttpRequest对象向服务器发送异步请求，获取数据后利用DOM操作来更新页面。
流程如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/312e1598ba664048a4283a214b027c2c.png)

XMLHttpRequest对象，支持异步请求。访问服务器的并且不阻塞用户，达到不用刷新页面的效果。


## XMLHttpRequest对象
它在创建到销毁整个生命周期中，不同阶段是调用不同的函数，在函数中需要通过XMLHttpRequest对象的特定属性来判断函数执行的情况。

1. abort函数：如果请求已经发送，那么暂停当前的请求；
2. getAllResponseHeaders函数，获取http请求的响应头部，作为键值对返回，如果没有那么返回一个null；
3. getRequestHeader(key)函数，获取指定key的响应头，如果没有或者不存在key对应的报头，那么返回null。
4. open("method",,"url",[asyncFlag],"username","password")，建立对服务器的调用。其中asyncFlag表示异步还是同步，默认是true，表示异步
5. send(content)函数，向服务器发送请求
6. setRequestHeader("key","value")函数，设置请求头，设置header之前，先调用open函数，设置的header和send函数一起发送；

## XMLHttpRequest对象声明周期
标准的XMLHttpRequest创建方法：

```javascript
        let xmlhttp = null;
        function createXMLHttp() {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            }
            // code for IE6, IE5
            if (window.ActiveXObject) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    try {
                        xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
                    }
                    catch (ex) { }
                }
            }
        }
```
这个是为了兼容其他低版本的浏览器，可以根据需要直接使用new XMLHttpRequest来创建：

```javascript
var xhr = new XMLHttpRequest();
        xhr.open("post", "/admin/login", true);
        //  请求参数
        var content = {
            userName: 'duxin',
            password: '123456',
        }

        // 发送请求
        xhr.send(content);

        // 处理响应
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.readyState === 200) {
                document.write(xhr.responseText)
            }
        }
```

## Ajax优缺点
有点：
1. 不需要刷新就可以个新数据；
2. 异步通信，Ajax使用异步的方式和服务器通信，能够减少不必要的数据通信，降低网络数据流量。
3. 前后端分离，前端专注于页面逻辑的处理，后端则是专注于接收和响应数据
4. 前后端负载均衡，可以将一些在后端处理的数据逻辑，放到前端来处理。


缺点：
1.  安全性问题，比如跨域脚本攻击、SQL注入攻击；
2. 对搜索引擎支持比较弱，因为浏览器在进行SEO的时候，会屏蔽所有的JavaScript代码，而Ajax正好是JavaScript一部分。

## 表单提交
现在有一个简单的表单：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form name="userForm" id="userForm">
        <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="text-center">
            <input type="button" class="btn btn-default btn-primary" value="提交" id="submit">
        </div>
    </form>
    <div id="result"></div>
    <script>
        const textDiv = document.getElementById("result")
        function ajaxBtn() {
            var xhr = new XMLHttpRequest();
            xhr.open("post", "http://192.168.0.114:3000/user/login", true);
            xhr.setRequestHeader("Content-Type", "application/json")
            //  请求参数
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value
            var content = {
                name: username,
                password: password,
            }

            // 发送请求
            xhr.send(JSON.stringify(content));

            // 处理响应
            xhr.onreadystatechange = function () {
                console.log("网络请求", xhr)
                if (xhr.readyState === 4 && xhr.status === 200) {
                    textDiv.innerText = xhr.responseText
                }
            }
        }
        var btn = document.getElementById("submit");
        btn.addEventListener("click", function () {
            ajaxBtn();
        })
    </script>
</body>

</html>
```
效果如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/d270e12144904d37a2bfc9531265a941.png)

这里的服务器端是使用nodejs。

## 进度事件
在上面的代码中，时使用onreadystatechange事件，在回调函数中获取readyState和status的值，并且做相关的判断请求是否成功。

进度事件就是让Ajax在请求的不同阶段触发不同类型的事件，所以我们可以不用readystate的属性，也能够处理请求成功和失败的操作。
下面是一些常见的进度事件：
1. loadstart，在开始接收响应时触发
2. progress，在接收响应期间不断触发，直到请求结束
3. error，请求失败
4. abort，在主动请求时，调用abort函数表示请求终止
5. load，数据接收完成后触发，
6. loadend，在通信完成或者error、abort、load事件后触发
7. timeout，请求超时触发


progress事件在浏览器接收数据的过程中周期性调用，在回调处理程序中接收一个event对象，里面含有对应的XMLHttpRequest对象的实例，另外含有三个属性：分别是lengthComputable、loaded和total。

lengthComputable，表示进度信息是否可用；
loaded，表示已经接受到的字节数；
total，表示响应的实际字节数。

## Ajax跨域解决方案
首先浏览器同源策略约定了客户端脚本在没有明确授权的情况下，不能访问不同源的目标资源。

同源指的是相同的协议、域名、端口号，如果两个资源路径在协议、端口号或者是域名上的任何一点不同，那么这两个资源就是属于同源资源。

浏览器跨域限制，这是因为有一些没有遵守浏览器的同源策略引起的，浏览器跨域访问的限制，在一定程度上可以保护用户的隐私数据安全。

如果没有DOM同源策略限制，不同域名的iframe可以相互访问，这样黑客做假的网站，里面使用iframe嵌套一个银行的网站，这个假网站的内容就是和银行网站一模一样。当用户输入用户名和密码后，黑客就可以获取到iframe所嵌套的银行网站的DOM节点，从而拿到用户的账号和密码了。

另一个是XMLHttpRequest同源策略，如果没有这个策略的话，黑客就可以进行跨站请求伪造CSRF攻击。


当我们需要跨域请求的时候，主要是在服务端通过设置响应头，接收跨域请求处理，在express开发的服务端跨域处理：

```javascript
app.all('*', function (req, res, next) {
  // 设置可以接收请求的域名
  res.header('Access-Control-Allow-Origin', '*');
  // 是否可以携带cookie
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
```
可以指定具体域名。


另一个跨域解决方法就是JSONP，优点就是简单、兼容低版本浏览器，对服务端影响小。
但是它只支持get请求。另外很难判断JSONP请求是否成功