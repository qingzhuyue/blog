---
sidebar_position: 1
slug: react
title: react源码：目录结构、调试源码
tags: [React]
---
<!--
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-10-14 13:06:15
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-10-14 13:06:17
 * @FilePath: /blog/react/java.md
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
-->

我的技术栈是React，最近在整理react的源码，react版本是18.1.0，之前版本，没有看过，就此略过。

## 源码目录
从github将源码下载后，先看看源码目录结构，如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/394be1618e9140038cab2ac9e57fcbf7.png)
fixtures：代码贡献者提供的测试react
package：react源码的主要部分，包含了Schedule、reconcile等等
scripts：react构建相关

查阅源码，我们主要查阅package目录下即可。package目录如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/05e19ab0cd8941369540bdb0d8db4bc4.png)
react：核心的API，比如：Children,Component,Fragment,Profiler,PureComponent,StrictMode,Suspense等等

react-art：canvas、svg的渲染；
react-dom：浏览器环境；
react-native-renderer：原生客户端相关的；
react-noop-renderer：调试或者fiber；
react-server：ssr相关；
react-fetch：请求相关；
react-interactions：和事件相关，比如点击事件；
react-reconciler：构建节点；
shared：包含公共方法和变量；
react-is：判断类型；
react-client：流相关；
react-refresh：热加载相关
scheduler：调度器相关

## 核心API
从react目录的index.js中找到React暴露出来的API：

```javascript
export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  act as unstable_act,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  SuspenseList,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createMutableSource,
  createRef,
  createServerContext,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_Cache,
  unstable_DebugTracingMode,
  unstable_LegacyHidden,
  unstable_Offscreen,
  unstable_Scope,
  unstable_TracingMarker,
  unstable_getCacheSignal,
  unstable_getCacheForType,
  unstable_useCacheRefresh,
  useId,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useMutableSource,
  useSyncExternalStore,
  useReducer,
  useRef,
  useState,
  useTransition,
  version,
} from './src/React';
```

是否找到自己常用的API呢？比如Children、memo、useRef等等。

## 调试源码

如果想自己调试源码的话，就需要先安装依赖：`yarn`或者`npm install`，

build源码：`npm run build react/index,react/jsx,react-dom/index,scheduler --type=NODE`

给源码创建软链：
切换到build/node_modules/react，执行命令：`npm  link`
切换到build/node_modules/react-dom，执行命令：`npm  link `

使用create-react-app脚手架创建项目：

```javascript
npx create-react-app demo
npm link react react-dom
```
使用创建项目时候。默认是安装了react的最新版本，从package.json文件中可以看出：
![在这里插入图片描述](https://img-blog.csdnimg.cn/1dbece946e394b8bbc5700276614f40f.png)
执行`npm link react react-dom`后，在依赖文件夹下找到react目录，查看react的实际版本。

查看该项目下react的版本，可以从version得到，因为version是react暴露出来的API，直接使用即可：

```javascript
import { version } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>React:版本{version}</p>
      </header>
    </div>
  );
}

export default App;

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/8f6b5eee55fd40e5835b6a439b869680.png)
