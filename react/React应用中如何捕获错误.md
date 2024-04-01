<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:16:31
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 00:16:33
 * @FilePath: /blog/react/React应用中如何捕获错误.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->

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