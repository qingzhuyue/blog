<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-01-31 11:02:58
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-03-24 20:47:19
 * @FilePath: /blog/react/React面试题.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->

## 1、如何理解React？

一、React用来构建界面的JavaScript库，它只提供了UI层面的解决方案，遵循组件设计模式，声明式编程规范和函数式编程概念。为了让前端应用程序更高效，React使用了虚拟DOM来操作真实DOM。React遵循高阶组件到低阶组件的单向数据流，帮助我们将页面划分为多个独立的小模块，每一个模块就是一个组件，这些组件之间可以组合、嵌套，构成一个整体的页面。

React类组件使用一个render方法接收传入的数据，返回需要展示的内容【函数组件是通过return返回需要展示的内容】


二、React有很多的特性，比如JSX语法、单向数据流、虚拟DOM、声明式编程、Component。

### JSX语法

JSX语法，是一种JavaScript语法扩展，允许在JavaScript代码里面，写类似于HTML代码，这样在创建React组件更为直观、便于理解。最后Babel编译器会把JSX转化为纯粹的JavaScript代码。

### 单向数据流
React遵循数据单向流动，有这几个原因：
1. 为了让程序的结构更加清晰、易于理解和调试；
2. 单向数据流中，数据的更新只会是从父组件流向子组件，这样避免不必要的视图更新。

### React虚拟DOM
React的虚拟DON就是一个JavaScript对象，通过对象来表示DOM结构。

React采用虚拟DOM的目的是：
1. 提升开发效率；
2. 解决跨平台的问题，一套代码可以转化为多个平台应用。

### React的声明式编程
它只关注你在做什么，而不是怎么做。在代码层面上更简单易于维护。

### Component组件化
在React中，一切都可以当成独立的组件，组件可以是函数、可以是类，接受数据传入，然后返回在UI中展示的React元素。比如：

```js 
const Header = (props) => {
  return (<>
       <H1>{props.title}</H1>
  </>)
}
```

```js
class Header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (<><H1>{this.props.title}</H1></>)
  }
}
```

一个组件应该具有特性如下：

1. 可以组合，每一个组件都可以与其他组件一起使用，或者是嵌套使用；

2. 可以复用，每一个组件都是具有独立功能，可以在多个场景下使用；

3. 可以维护，组件只能包含自身的逻辑，这样更容易被理解和维护。

最后React的优势就是：
1. 高效灵活
2. 声明式的设计，简单使用
3. 组件式开发，提高代码复用率
4. 单向数据流更加安全。

## 