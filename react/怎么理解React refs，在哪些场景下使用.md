<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:17:11
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 00:17:25
 * @FilePath: /blog/react/怎么理解React refs，在哪些场景下使用.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->

React的refs，提供了一种方式，让我们访问DOM节点或者在render方法中创建React元素。

创建ref的形式有三种：

1. 传入字符串，使用的时候通过this.refs传入的字符串格式获取对应的元素
2. 传入对象，对象是通过React.createRef()方式创建的，使用时取到的对象存在current属性上。
3. 传入一个函数，这个函数会在DOM被挂载时进行回调，这个函数会传入一个元素，可以自己保存，使用的时候，直接拿到之前保存的对象。
4. 传入hook，hook是通过useRef()方式来创建，使用的时候通过生成hook对象就是current属性上的元素。

###  传入字符串
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
### 传入一个对象
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

### 传入函数
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
### 传入hook
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