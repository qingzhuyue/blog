---
sidebar_position: 0
slug: css
title: CSS：border-image
tags: [css]
---

border-image属性对图像的规格和比例比较高，导致使用成本比较高。另外，常见的场景中，大家更倾向于扁平化而不是非拟物化，边框装饰通常在项目中不会出现。

border-image是由多个CSS属性缩写的，比如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb4bd8a7c0764cde8cd6e2a6418db54e.png)

border-image-source属性值是一个image数据类型，那么所有图像类型都可以作为边框，比如渐变图像

## border-image-slice属性

border-image-slice属性作用是对原始图像进行划分，划分方位和顺序同margin一样，遵循上右下左的顺序。属性值是1到4个数值或者是百分比，后面可以带一个关键字fill：`border-image-slice: 20% fill;`

border-image-slice：20，表示在距离原图像上方20px、右侧20px、下方距离20px、距离原图像左侧20px。

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c7e41f057a0402daff6689037352a9a.png)

默认情况下，图像中心位置不参与填充，如果想要填充的话，就使用额外的fill关键字：

```css
.box{
	border-image-source: url("../img/bg.png");
	border-image-slice: 33.33% fill;
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/621b72d4c4554ae18af86967b92e6e6e.png)
![](https://img-blog.csdnimg.cn/244c874c190c4ad3920ce140eb5f2471.png)

## border-image-width属性

属性值支持1~4个，不同的数量的值所对应的方位规则也是一样的。border-image-width的初始值为1。有这样几种情况：

1. border-image-width属性是数值，那么这个数值作为系数和border-width的宽度相乘结果作为边框图片的宽度，比如：
![在这里插入图片描述](https://img-blog.csdnimg.cn/bf0614f3da8747289022a86423f053ce.png)

2. border-image-width为具体长度值，那么边框图片的宽度就是border-image-width的值。如果border-image-width为0，那么边框图片可能消失。

3. border-image-width属性值是百分比，那么就是相对于元素自身的尺寸计算了，水平方位是相对于宽度计算的，垂直方向是相对于高度计算的。

4. border-image-width属性值为auto，就使用border-image-slice值作为边框高度。

5. border-image-width不支持赋值

## border-image-outset属性 
定义边框图像可以超过边框盒子的大小，默认值是0。

## border-image-repeat属性
定义图片如何填充边框，初始值为：stretch

