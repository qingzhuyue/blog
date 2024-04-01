<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:14:10
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 00:15:19
 * @FilePath: /blog/react/React组件如何通信.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->

组件之间的通信，有四种类型：
1. 父组件向子组件传递
2. 子组件向父组件传递
3. 兄弟组件之间传递

## 父组件向子组件传递

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

## 子组件向父组件传递

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

## 兄弟组件之间通信

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