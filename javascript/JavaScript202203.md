---
sidebar_position: 6
slug: JavaScript：WebSocket
title: JavaScript：WebSocket基本使用方法
tags: [JavaScript]
---
WebSocket是一种双向、单套接字连接，使用WebSocket，那么请求就变成了打开WebSocket连接的单一请求，并且可以重用公客户端到服务器以及服务器到客户端的同一连接。

WebSock减少延迟，一旦建立起WebSocket连接，服务器可以在消息可用的时候发送。这是轮询和WebSocket的比较。

![在这里插入图片描述](https://img-blog.csdnimg.cn/d25aeda3d5bc418cb246be69d77d458c.png)

WebSocket让实时通信更加有效，可以节约带宽、CPU资源并减少延迟。

WebSocket连接通过在客户端和服务端之间第一次握手的时候将http协议升级到WebSocket协议来完成，这个过程在相同的底层TCP连接上进行。

## 创建WebSocket连接

首先调用WebSocket构造函数，创建一个WebSocket连接，构造函数返回的WebSocket对象实例。

### 建立客户端的WebSocket连接

使用WebSocket接口，通过指向一个表示所要连接端点的URL，实例化一个WebSocket对象。

WebSocket协议定义了两种URL：ws和wss。和HTTP、HTTPS类似，表示非加密和加密数据。wss表示使用传输层安全性的WebSocket连接。

WebSocket构造函数有一个必填的URL和可选参数protocols，URL是指向连接目标的URL；protocols是为了建立连接，服务器必须在它响应中包含一个或者一组协议名称，比如：

```javascript
    <script>
        let ws = new WebSocket("ws://localhost:3000/",['com.kaazing.echo']);
        ws.onopen = () => {
            ws.send("hello")
        }
        ws.onmessage =(ev) => {
            console.log("ev", ev)
        }
        
    </script>
```

和所有的Web API事件一样，使用on+事件名称来处理属性监听这些事件。WebSocket对象调度4个不同的事件：

1. open，当服务器响应了WebSocket连接请求，那么open事件触发并且建立一个连接，open事件对应的回调函数就是onopen。
2. message，在接收到消息时候触发，对应事件的回调函数是onmessage，
3. error，在响应意外故障的时候触发，对应的回调函数是onerror。错误还会导致WebSocket连接关闭。
4. close，在WebSocket连接关闭的时候触发，对应的回调函数是onclose。一旦连接关闭，那么客户端或者服务器就不再能接收或者发送信息。

## 创建服务端的WebSocket

代码如下：

```javascript
const express = require("express");
const http = require("http");
const Ws = require("ws").Server;
const app = express();

const server = http.createServer(app);

server.listen(3000);
app.use(express.static('www'));

let wsServer = new Ws({server});

wsServer.on("connection",function(socket){
    console.log("连接成功");
    socket.on("message",msg=>{
        console.log("客户端信息",msg)
        socket.send("客户端发送的信息："+msg+","+new Date().getTime())
    })
})
```

index.html代码：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p id="mes"></p>

    <script>
        let pText = document.querySelector("p")
        let ws = new WebSocket("ws://localhost:3000/", ['com.kaazing.echo']);
        ws.onopen = (e) => {
            console.log("WebSocket open", e);
            setInterval(() => {
                ws.send(new Date().getTime())
            }, 2000)
        }
        ws.onmessage = ({ data }) => {
            pText.innerText = data;
        }

    </script>
</body>

</html>
```

然后执行命令：`node  ws.js`，在浏览器打开上面创建的页面，效果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/af50cc17f6fb41d6b6005f0d32bd3d5b.png)
