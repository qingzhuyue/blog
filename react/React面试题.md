<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-01-31 11:02:58
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-01-31 16:17:23
 * @FilePath: /blog/react/React面试题.md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->
1、调用setState时，执行哪些操作？
2、React中Diff算法的原理？
【1】比较两个节点：节点有两种类型，一种是ComponentELement、另一种是DOMElement，如果两个节点的类型不同，那直接用新的节点替换旧的节点；

3、什么是 React Fiber?
Fiber是React16中新的重新实现核心算法，主要目的是支持虚拟DOM的增量渲染，为不同类型的更新分配优先级。能够将渲染工作分割成块，并且分散到多个帧中。

