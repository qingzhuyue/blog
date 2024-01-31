---
sidebar_position: 1
slug: Electron：搭建一个桌面应用
title: Electron：搭建一个桌面应用
tags: [Electron]
---
# Electron 搭建一个桌面应用

在安装 Electron 的时候，因为访问的是国外的 IP，所以很容安装失败，需要设置访问国内的 Electron 镜像：` yarn config set ELECTRON_MIRROR http://cdn.npm.taobao.org/dist/electron/`

安装 ELectron：`yarn add electron --dev --platform=win64`

在 package.json 文件中设置：

```javascript
{
  "name": "electron",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "electron ./index.js"
  },
  "devDependencies": {
    "electron": "^16.0.7"
  }
}

```

然后在项目目录下创建 index.js 和 index.html：

index.html：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
            http-equiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self'"
    />
    <meta
            http-equiv="X-Content-Security-Policy"
            content="default-src 'self'; script-src 'self'"
    />
    <title>djdfj</title>
    <link rel="stylesheet" type="text/css" href="./index.css"/>
</head>

<body>
<h1>Hello World!哈哈哈</h1>
We are using Node.js <span id="node-version"></span>, Chromium
<span id="chrome-version"></span>, and Electron
<span id="electron-version"></span>.
<p>Current theme source: <strong id="theme-source">System</strong></p>

<button id="toggle-dark-mode">Toggle Dark Mode</button>
<button id="reset-to-system">Reset to System Theme</button>

<button id="openDevTool">打开开发工具</button>
<script src="renderer.js"></script>
<script>
    let {remote} = require("electron/electron");
    console.log("remote", remote);
    document.querySelector("#openDevTool").addEventListener("click", () => {
        remote.getCurrentWindow().webContents.openDevTool();
    });
</script>
</body>
</html>
```

index.js:

```javascript
const {app, BrowserWindow, ipcMain, nativeTheme} = require("electron/electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });

    win.loadFile("index.html");
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = "light";
        } else {
            nativeTheme.themeSource = "dark";
        }
        return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
```

执行命令：`yarn start`:效果如图


![在这里插入图片描述](https://img-blog.csdnimg.cn/651f11a1feee46bb8c8ef5ebdea0400e.png)


在 Electron 内部已经集成了 nodejs，所以我们直接引入 electron 的模块即可。

app 表示是整个应用，通过 app 可以调用应用程序的各个事件。

BrowserWindow，负责创建和管理应用的窗口。

如上面的代码中，在创建窗口的时候，设置了窗口的默认宽高以及 webPreferences，

```javascript
webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration:true
        }
```

这一项配置是给 Electron 页面继承 nodenode 环境，并且让 index.html 页面的 JavaScript 拥有访问 node 的能力。

如果我们加载的页面是一个网络页面，但是我们不能确保该页面是否可靠，那么 nodeIntegration 可以设置为 false，不然该页面的一些恶意脚本也能访问 node，可能会给用户造成损失。

Electron 中，只有在 app 模组的 ready 事件触发后才能创建 BrowserWindow。

窗口创建后就可以让窗口加载 index.html 页面了。

关闭窗口后就退出 app 应用，所以 app 退出的代码就放在窗口关闭事件中，比如：

```javascript
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

这就是 Electron 简单应用
