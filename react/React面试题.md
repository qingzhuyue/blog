<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-01-31 11:02:58
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-01 21:43:33
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

## 2、如何理解state、props、super()和super(props)

#### state
一个组件需要显示什么，怎么显示内容，都是由数据状态和外部参数决定的。

state就是这个数据状态。

当需要修改状态值的时候，通过调用setState，实现更新组件内部数据的问题。

setState的第一个参数有两种形式：一种是对象，这个对象里面包含了需要更新的状态字段；另一种是函数，这个函数接收当前状态作为入参，并且返回一个对象来更新组件的状态。

setState还可以接收第二个参数，它是一个函数，会在setState调用完成并且组件开始更新时被调用，在这里可以用来监听渲染是否完成。

#### props
React的核心思想就是组件化，页面被切分为一些独立的、可复用的组件，组件概念上就是函数，接收一个参数作为入参，这个参数就是props，组件外部传入的数据都在props上。

state和props都是对象，用来保存信息，props和state都能触发组件更新。

不同的是：
1. props是组件外部传入的，然而state是组件内部自己管理的。
2. props在组建内部不可修改，但是state可以修改；

#### super()

在class继承类的时候，通过super关键字来来实现调用父类，super替代父类的构建函数。

为什么要调用super呢，因为子类是没有自己的this对象，它只能通过继承父类的this，然后对它进行加工。super方法就是将父类的this继承给子类。没有调用super，子类就得不到this对象，那么使用this就会报错。


在React的类组件是通过继承React.Component，所以在constructor构造函数里面调用super方法才能初始化thi是。

如果super方法没有传入props，类组件会在构造函数生成实例后，再给this.props赋值。所以构造函数内this.props为undefined。

## 3、React组件如何通信
组件之间的通信，有四种类型：
1. 父组件向子组件传递
2. 子组件向父组件传递
3. 兄弟组件之间传递

#### 父组件向子组件传递

由于React有单向数据流动的特性，所以父组件向子组件传递是最常见的方式。

父组件在调用子组件的时候，在组件标签内传递参数，子组件通过props属性获取父组件传递过来的参数。

```js
function EmailInput(props){
  return (<label>
    <input value={props.email}/>
  </label>)
}

<EmailInput email={"9999@qq.com"} />
```

#### 子组件向父组件传递

父组件在调用子组件的时候，父组件向子组件传递一个函数，通过这个函数的回调函数，获取子组件传递的值。

父组件：
```js
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:'';
    }
  }

  getName = (name) => {
    this.setState({
      name
    })
  }

  render(){
    return(<div>
      <p>name:{this.state.name}</p>
      <Child getName={(name)=>this.getName(name)}/>
    </div>)
  }
}
```

子组件：

```js
class Child extends React.Component{
constructor(props){
  super(props);
}
  render(){
    return (<div><button onClick={()=>this.props.getName("000000")}>click</button></div>)
  }
}
```

#### 兄弟组件之间通信

兄弟组件之间通信，通过父组件作为中间层来实现数据互通，比如：

```js
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count:0;
    }
  }
changeCount = () =>{
  this.setState({count:this.state.count + 2})
}
  render(){
    return (<div>
      {/* 组件A */}
      <CompA count={this.state.count} />
      <CompB onClick={this.changeCount} />
    </div>)
  }
}
```

## 4、什么是高阶组件，有哪些场景？

高阶函数是接收一个或者多个函数作为入参，返回一个新的函数。

高阶组件，则是接收一个或者多个组价作为入参，并且返回一个组件。高阶组件的实现方式，本质上是一个装饰者设计模式。

最基本的高阶组件模版如下：

```js
import React form 'react';

export default (WrappedComponent) => {
  return class EnhancedComponent extends React.Component{
    render(){
      return <WrappedComponent />
    }
  }
}
```

通过传入的原始组件WrappedComponent，做一些逻辑处理，比如提取state给原始组件。加工成自己想要的组件EnhancedComponent。

把通用的逻辑放在高阶组件里面，对组件实现一致的处理，从而实现代码复用。

高阶组件主要的功能是封装并且分离组件的通用逻辑，同时让逻辑在组件之间更好被复用。

但是在使用高阶组件的时候，需要注意一些原则：

1. props保持一致；
2. 不能在无状态组件上使用ref属性，因为它没有实例；
3. 不要以任何方式改变原始组件；
4. 不要在render方法内使用高阶组件；
5. 使用compose组合高阶组件；

高阶组件可以传递所有的`props`，但是不能传递`ref`。

在实际的应用中，高阶组件一般用来封装与业务无关，但是在多个模块中使用的功能，比如：权限控制、日志记录、数据校验、异常处理。统计上报等等。比如从缓存中获取用户数据，代码如下：
```js
import React from 'react';

function withPersistentData(WrappedComponent) {
  return class extends React.Component{
    componentWillMount(){
      let data = localStorage.getItem("data");
      this.setState({data})
    }
    render(){
      return <WrappedComponent {...this.props} data={this.state.data}/>
    }
  }
}
```

业务组件代码：

```js
import React from "react";
import withPersistentData from "高阶组件的位置"

class MyComponent extends React.Component{
  render(){
    return <div>{this.props?.data}</div>
  }
}


export default withPersistentData(MyComponent);
```

如果想监听组件的渲染性能，可以这样封装：

```js
function withTiming(WrappedComponent){
  return class extends WrappedComponent{
    constructor(props){
      super(props);
      this.start = 0;
      this.end = 0;
    }

    componentWillMount(){
      super.componentDidMount && super.componentWillMount();
      this.start = Date.now();
    }

    componentDidMount(){
      super.componentDidMount && super.componentDidMount();
      this.end = Date.now();
      console.log(`${WrappedComponent.name} 组件的渲染时间为 ${this.end - this.start} ms`)
    }

    render(){
      return super.render();
    }
  }
}
```

使用的时候，直接调用即可：`withTiming(Home)`

这就是高阶组件的作用。


## 5、React应用中如何捕获错误

错误是我们在编写代码的时候，经常出现的。比如在编写React组件的时候，因为存在JavaScript代码错误会导致React内部状态被破坏，造成整个应用崩溃。

作为一个框架来说，React也是有对错误的处理解决方案。

React16有一个错误边界的概念，错误边界就是一个组件，这个组件可以捕获发生在子组件树中任何位置的JavaScript错误，并且打印这些错误。同时也可以展示错误提示，不会展示发生崩溃的组件。

错误边界在渲染期间，生命周期方法和整个组件树的构造函数中捕获。

在错误边界组件中的使用两个方法：

. static getDerivedStateFromError()
. componentDidCatch()

组件抛出错误以后，使用`static getDerivedStateFromError()`渲染备用UI，使用`componentDidCatch()`打印错误，代码如下：

```js
class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasError:false,
    }
  }

  static getDerivedStateFromError(){
    return {hasError:true}
  }

  componentDisCatch(error,errorInfo){
    // 打印日志，或者将日志上传到服务器

  }

  render(){
    if(this.state.hasError){
      return <h2>发生了一些错误</h2>
    }

    return this.props.children
  }
}
```

让后把应用的其他组件作为错误边界的子组件：

```js
<ErrorBoundary>
  <Widget/>
</ErrorBoundary>
```

react16之后的版本，就把渲染期间发生的所有错误打印到控制台了。

如果有一些异常，在错误边界组件不能捕获的，比如事件处理结果，异步代码操作等等。

那么可以使用try...catch来完成，代码如下：

```js
class Comp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error:null
    }
  }
  handleClick = () =>{
    try{

    }catch(error){
      this.setState({
        error
      })
    }
  }
  render(){
    return <div>组件其他内容</div>
  }
}
```

另一种方式是通过监听`onerror`事件:

```js
window.addEventListener('error',function(event){
  // 其他逻辑处理
})
```

这就是React异常捕获的解决思路。

## 6、怎么理解React refs，在哪些场景下使用？


React的refs，提供了一种方式，让我们访问DOM节点或者在render方法中创建React元素。

创建ref的形式有三种：

1. 传入字符串，使用的时候通过this.refs传入的字符串格式获取对应的元素
2. 传入对象，对象是通过React.createRef()方式创建的，使用时取到的对象存在current属性上。
3. 传入一个函数，这个函数会在DOM被挂载时进行回调，这个函数会传入一个元素，可以自己保存，使用的时候，直接拿到之前保存的对象。
4. 传入hook，hook是通过useRef()方式来创建，使用的时候通过生成hook对象就是current属性上的元素。

##  传入字符串
只要在对应的组件或者元素的ref属性添加即可，代码如下：

```js
import React from "react";

class RefsComponent extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount(){
    this.refs.myRef.innerHTML = 'refs的用法'
  }

  render() {
    return (
      <div ref='myRef'></div>
    );
  }
}

export default RefsComponent;
```

效果如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/bd7ebc7ff2d742a7a67b5df67cbc8c73.png)
## 传入一个对象
传入的对象是通过React.createRef方法创建的，然后将ref属性添加到React元素上，代码如下：

```javascript
import React from "react";

class RefsComponent extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount(){
    console.log(this.myRef)
  }

  render() {
    return (
      <div ref={this.myRef}>refs的用法</div>
    );
  }
}

export default RefsComponent;
```

效果如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/062163454e0a49be85a6065f34930a87.png)
会在current属性上找到节点的相关信息。

## 传入函数
当ref传入的是一个函数的时候，在渲染时，回调函数会传入一个元素对象
，然后通过实例把元素对象保存起来。代码如下：

```javascript
import React from "react";

class RefsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.myRef)
  }

  render() {
    return (
      <div ref={(element) => { this.myRef = element }}>refs的用法</div>
    );
  }
}

export default RefsComponent;
```
打印的元素对象如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/52e90a7f5ae64c26b6d10d94a8e27532.png)
## 传入hook
通过useRef创建一个ref，然后添加到React元素上，代码如下：

```javascript
function RefsComponent() {
  const myRef = React.useRef()
  console.log(myRef)
  return <div ref={myRef} />
}
export default RefsComponent;
```
效果如下如：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/031205bb6de84020b52aaefa81037767.png)
在这几种场景下，我们会使用到refs:

1. 对DOM元素的焦点控制，内容选择和控制
2. 对DOM元素的内容设置以及媒体播放
3. 集成第三方DOM库

这就是refs的使用场景和使用方法。