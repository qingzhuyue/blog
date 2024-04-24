<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-24 16:49:32
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-24 17:13:17
 * @FilePath: /blog/react/React的Key和diff.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->
先说说React组件的中Key，在渲染一个列表的时候，都要求设置一个唯一的Key，不然就会提示：`Each child in a list should have a unique "key" prop.`

意思是列表的每一个子元素都应该需要设置一个唯一的key值。在开发中一搬会以id作为key。比如

```js
const data = [
  {id:1,value:12},
  {id:2,value:12},
  {id:3,value:34}
]
const ListItem = (props) => {
  return <li>{props.value}</li>
}

const List = () => {
  return (
    <ul>
      {
        data.map(item => (<ListItem value={item.value} key={item.id}/>))
      }
    </ul>
  )
}
```

Key的作用是用来判断元素是新建的还是被移动的，从而减少不必要的元素渲染。

并不是设置Key就能提高性能，设置Key是关于节点的增加和删除，如果发现旧的key消失了，那就是删除节点；新的key之前没有，就插入。

