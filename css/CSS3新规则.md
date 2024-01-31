---
slug: CSS3：动画、变换和渐变
sidebar_position: 0
title: CSS3：动画、变换和渐变
tags: [css]
---
<!--
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-09-02 12:21:31
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-09-02 12:22:44
 * @FilePath: /blog/blog/css/CSS3新规则.md
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
-->

CSS3常用的新功能包括圆角、阴渐变、2D变换、3D旋转、动画、viewpor和媒体查询。

## 圆角、阴影

### border-redius
对一个元素实现圆角效果，是通过border-redius完成的。属性为两种方式：

1. 一个属性值，表示设置所有四个角的半径为相同值；
2. 对四个角分别设置，属性值的顺序为：左上角、右上角、右下角和左下角。

### box-shadow

box-shadow属性值为：h-shadow v-shadow blur spread color inset。

h-shadow：水平阴影的位置，必选项；
v-shadow:  垂直阴影的位置，必选项；
blur：可选值，模糊半径
color：可选项，阴影的颜色
inset：可选，默认是外部阴影outset。

如果需要设置多重阴影的话，就添加多个属性值。

## 渐变gradient
CSS的渐变就是在两个或者多个颜色之间平稳过度显示。

### 1、线性渐变【linear-gradient】

需要设置两个颜色和方向【或者一个角度】。语法如下：
`background:linear-gradient(direction,color1,color2)`

其中方向的值direction，可以设置角度，比如0deg、90deg或者英文，比如to top，to right，to left。

### 2、径向渐变【redial-gradient】
径向渐变就是圆形渐变或者是椭圆渐变。颜色是从起点向周围延伸过渡显示。

渐变可以指定渐变的中心点、渐变的形状和大小。默认情况下渐变中心为center。还可以设置left、top、right和bottom来表示渐变的中心位置。

渐变的形状默认是椭圆ellipse，圆形设置为circle

## 2D变换：旋转、倾斜、缩放和位移

### 1、旋转【rotate】和倾斜【skew】
旋转函数rotate，就是元素通过一个角度相对于原点进行旋转，如果旋转值为正数，则顺时针旋转；如果旋转值为负数，则是逆时针选装。

倾斜函数skew，让一个元素倾斜。

rotate和skew都可以接受两个参数，分别表示为x、y轴方向上的角度。

### 2、缩放【scale】和位移【translate】
scale函数是根据中心原点对元素进行缩放；可以设置元素在X轴或者Y轴方向上进行缩放。translate位移函数原理相同。


任何一个元素，都有一个中心点，也就是元素的坐标原点。没有特殊设置的情况下，元素的中心原点位于元素X轴和Y轴的50%处。
比如；

![在这里插入图片描述](https://img-blog.csdnimg.cn/d402e24bca5b4ac8a49f2e6c44bba83f.png)
如果想改变元素的中心点，就通过transform-origin，它的使用语法如下：

`transform-origin:left top`，表示元素中心为左上角。

## 3D旋转

backface-visibility属性定义当元素不面向屏幕时是否可见，其值可为visible（可见）、hidden（不可见）。如果旋转后不希望看到其背面，该属性很有用。

## 动画

### 1、transition
transition的语法如下：

`transition:transition-property  transition-duration transition-timing-function  transition-delay`


transition-timing-function的取值为linear、ease、ease-in、ease-out、ease-in-out和cubic-bezier。

linear：匀速过度
ease：慢——快——慢
ease-in：慢速结束过度效果
ease-in-out：慢速开始和结束过度效果。
cubic-bezier：贝塞尔曲线函数，自定义过渡效果。

### 2、自定义动画

在css3中第一一个动画，那么首先为建立对应的动画规则，也就是关键帧keyframes。

keyframes用来指定动画名称和动画规则，动画名称在执行动画周期的时候，作为一个标识符来使用。

在动画规则里面，使用关键字from和to来自定义动作。效果表现为从一种状态过渡到另一种状态。

如果要定义复杂动画的话，那就在form到to之间，使用相应的百分比。比如20%、40%、60%，在不同阶段执行不同的动画规则。以此来实现完整的动画效果。

