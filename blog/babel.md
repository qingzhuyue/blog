---
sidebar_position: 0
slug:  babel
title:  babel
tags: [配置]
---

ES6是JavaScript比较稳定而且应用广泛，但是有部分浏览器并没有完全支持ES6。为了在开发中使用ES6，就需要将ES6编写的代码转化为ES5。

Babel就能够完成转换。

Babel是JavaScript的一种编译器，把ES6转为ES5，这样在开发中使用最新的语言特性，就不用担心兼容的问题了。

在Babel执行编译的时候，会从项目的.babelrc文件中读取配置，那么我们只需要将一些规则配置在babelrc文件中即可。

比如：

```
{
    "plugins": [
        [
            "babel-plugin-transform-runtime",
            {
                "polyfill": false
            }
        ]
    ],
    "presets": [
        [
            "es2015",
            {
                "modules": false
            }
        ],
        "stage-2",
        "react"
    ]
}
```

plugins就是Babel使用了哪些插件，插件是怎么控制如何转换代码的。

presets：要转换的源码使用哪些新的语法特性。

在webpack中设置Babel，配置如下：

```

```