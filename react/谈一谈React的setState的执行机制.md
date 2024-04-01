<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:19:05
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 00:19:05
 * @FilePath: /blog/react/谈一谈React的setState的执行机制.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->
React组件显示什么样的数据，都是由数据状态和外部参数所决定的，这个数据状态就是state。

当需要修改数据状态的值，就要调用setState，从而达到更新组件内部数据状态的目的。比如代码：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "默认值"
    }
  }
  changeValue = () => {
    this.setState({
      message:"更新数据"
    })
  }
  render() {
    return <div>
      <h2>{this.state.message}</h2>
      <button onClick={()=>this.changeValue()}>点击</button>
    </div>
  }
}
```

当点击按钮的时候，执行this.setState方法更新state状态，然后重新执行render函数，完成组件更新。

setState内部是怎么定义的呢？这里选择类组件来看一下，它的源码是这样的：

```javascript
Component.prototype.setState = function(partialState, callback) {
 invariant(
 typeof partialState === 'object' ||
 typeof partialState === 'function' ||
 partialState == null,
 'setState(...): takes an object of state variables to update or a ' +
 'function which returns an object of state variables.',
 );
 this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```
setState的第一个参数可以是一个对象、一个函数，第二个参数是一个回调函数，用来获取更新后的状态数据。

在调用setState更新数据的时候，有两种更新方式：

1.  异步更新
2. 同步更新

### 异步更新
在上面代码中，changeValue函数里面更新后，立刻打印message：

```javascript
  changeValue = () => {
    this.setState({
      message:"更新数据"
    });
    console.log(this.state.message)
  }
```
结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/a42108db5c8b43cea76061a5c1053e7a.png)
在更新后不能马上拿到最新的状态，想要最新的状态，只能在setState的第二个参数回调函数里面获取。

```javascript
  changeValue = () => {
    this.setState({
      message:"更新数据"
    },()=>{
      console.log(this.state.message)
    });
  }
```


### 同步更新

在原生事件中更新：

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "默认值"
    }
  }
  componentDidMount() {
    const btnEl = document.getElementById("btn");
    btnEl.addEventListener('click', () => {
      this.setState({
        message: "更新数据"
      });
      console.log(this.state.message); // 更新数据
    })
  }
  render() {
    return <div>
      <h2>{this.state.message}</h2>
      <button id="btn">点击</button>
    </div>
  }
}
```


总结：setState在生命周期函数或者是React合成事件中，是异步；在DOM原生事件或者setTimeout函数中是同步。

setState本身不分异步还是同步，要看看是不是在批量更新，如果是批量更新，那就是异步更新，否则就是同步更新。

但是在React18，优化了批量处理以后，不管在什么场景下调用都是异步更新了。
