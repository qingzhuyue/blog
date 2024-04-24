<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:24:33
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 01:04:42
 * @FilePath: /blog/react/React render方法原理.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->
render函数在React中，有两种形式：

1. 类组件中的render方法
2. 在函数组件中，render就是函数本身。

在render中，我们编写JSX，JSX通过babel编译后转成js格式，比如：

```javascript
    return (
      <div className='cn'>
        <Header> hello </Header>
        <div> start </div>
        Right Reserve
      </div>
    )
```

JS格式
```javascript
    return (
      React.createElement(
        'div',
        {
          className: 'cn'
        },
        React.createElement(
          Header,
          null,
          'hello'
        ),
        React.createElement(
          'div',
          null,
          'start'
        ),
        'Right Reserve'
      )
    )
```

本质上，就是通过React的createELement方法来创建React元素，这个元素就是虚拟DOM的节点，createELement函数接受三个参数，分别是：

1. type标签
2. 标签属性
3. 标签的子节点

这些虚拟DOM最终是会渲染成真实DOM。在更新的过程中，React调用render方法返回的虚拟DOM树和旧的虚拟DOM进行diff比较，然后更新DOM

什么时候触发render呢？

在类组件中，调用setState来更新状态：

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "默认值"
    }
  }
  changeValue() {
    this.setState({
      message: "更新数据"
    });
  }

  render() {
    console.log("render")
    return <div>
      <h2>{this.state.message}</h2>
      <button onClick={() => this.changeValue()}>点击</button>
    </div>
  }
}
```
点击按钮的时候，触发一次setStatet，控制台就打印了render：
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/a984e1ce164a4798bf0dd03ff6f26011.png)
函数组件通过useState hook 来更新状态：

```javascript
function App(){
  const [message,setMessage] = React.useState("默认值");
  console.log('render');
  return <div>
      <h2>{message}</h2>
      <button onClick={() => setMessage("更新数据")}>点击</button>
    </div>
}
```
效果如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/164da1f9917141efba09ed58221bbf06.png)
不管点击多少次，最终结果只打印两次。在函数组件通过useState hook来更新数据的时候，当数据没有发生变化时，就不会触发render。

总结：

1. 类组件只要执行setState函数，就一定触发render；函数使用useState更新状态不一定触发render；
2. 来自父组件的props发生改变不一定触发render，但是props的值来自父组件或者祖先组件的sstate，在这种情况下，父组件或者组件组件的state发生改变，就会导致子组件重新渲染。父组件发生渲染，子组件也会渲染。



