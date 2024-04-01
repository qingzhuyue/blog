<!--
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-04-02 00:13:11
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-04-02 00:13:39
 * @FilePath: /blog/react/如何理解state、props、super()和super(props).md
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
-->

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