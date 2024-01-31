---
sidebar_position: 0
slug:  webpack基本配置
title:  webpack基本配置
tags: [配置]
---

现在的前端，出现很多种可以提高开发效率的工具和框架，但是源码却不能直接运行，只有通过转换之后才能正常运行。

那么构建就是把源码转化为可以执行的JavaScript、HTML和CSS代码。

构建包含：

1. 代码转换【比如typescript编译为JavaScript，scss编译为CSS】；
2. 文件优化，比如压缩JavaScript，压缩合成图片；
3. 代码分割，提取公共代码，提取首页不需要执行的代码让它异步加载；
4. 模块合并，把模块分类合并成一个文件；
5. 自动刷新，监听本地源码的变化，自动重新构建、刷新浏览器；
6. 代码校验
7. 自动发布。

## 基础
### webpack

webpack是一个打包模块化JavaScript的工具，通过loader转换文件，通过Plugin注入钩子，最后输出文件。


webpack专注于构建模块化项目。优点是：

1. 能做到开箱即用，一步到位；
2. 通过Plugin扩展，灵活
3. 使用的场景广泛
4. 社区活跃，可以找到很多场景下的开源扩展
5. 有良好的体验

webpack也有缺点，就是只能用于采用模块化开发的项目。


### webpack配置

1、 首先安装webpack和webpack-cli；
2、 创建基础的JavaScript文件盒HTML，代码如下：

index.html：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="root"></div>
    <script src="./dist/bundle.js"></script>
</body>

</html>
```

工具函数的JavaScript文件index.js:

```
function show(content){
    window.document.getElementById("root").innerText = "Hello，" + content
}

module.exports = show;
```

main.js代码如下：

```
const show = require("./index");

show("Webpack");
```

package.json配置如下：

```
  "scripts": {
    "build": "webpack"
  },
```

webpack的配置文件webpack.config.js如下：

```
const path = require("path");
module.exports = {
    entry:"./main.js",
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"./dist")
    }
}
```

执行命令：`yarn build`，在浏览器中打开index.html文件，页面会显示：“Hello，Webpack”

执行命令后，文件夹下会生成一个dist文件夹，dist就是就是编译后的静态代码。


执行打包命令后，webpack从entry的配置文件开始，识别出源码中的模块化导入语句，递归地找出入口文件的依赖，然后进行打包。

这就是webpack基本的打包流程。

### Loader

由于webpack不能解析CSS文件，那就需要同Loader机制来支持一些非JavaScript类型的文件，webpack.config.js配置更新如下：

```
const path = require("path");
module.exports = {
    entry: "./main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```

配置了一组规则，在打包的时候，遇到CSS文件就是用css-loader来读取CSS文件，再使用style-loader来把CSS内容注入到JavaScript中。

规则里面的use属性，是一个由Loader名称组成的数组，Loader的执行顺序是由后往前。

我们可以在对应的Loader文档上查阅相关的用法。

现在添加CSS文件main.css:

```
#root {
    text-align: center;
}
```

main.js中引入main.css:

```
require("./main.css");
const show = require("./index");

show("Webpack");
```

执行命令后，页面的文字居中了。

这时候，并没有生成单独的CSS文件，CSS全部卸载JavaScript文件中，这样会有一个缺点，就是JavaScript文件变大，导致加载页面时间变长。

### Plugin

Plugin是实现扩展Webpack功能的，在构建流程中注入钩子，这样给webpack带来很大的灵活性。

现在就实现打包生成单独的CSS文件。需要安装插件：`mini-css-extract-plugin`，webpack.config.js配置更新如下：

```
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离CSS为独立文件的插件

module.exports = {
    mode: 'development',
    entry: "./main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                // use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 指定抽离的之后形成的文件名
            filename: 'styles/[name]_[contenthash:8].css'
        })
    ],

}
```

打包后生成单独的CSS文件：main_094aa2e7.css，然后在HTML文件中引入CSS。


### DevServer

> 在开发中，启动项目需要http服务，而不是本地文件预览，这就需要监听文件的变化来自动刷新页面，可以支持source map，方便调试。
> 
> webpack官方提供了webpack-dev-server，实现了http服务。
> 
> 配置如下：
> 
> ```
> const webpack = require('webpack')
> const path = require("path");
> const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离CSS为独立文件的插件
> 
> module.exports = {
>     mode: 'development',
>     entry: "./main.js",
>     output: {
>         filename: "bundle.js",
>         path: path.resolve(__dirname, "./dist")
>     },
>     module: {
>         rules: [
>             {
>                 test: /\.(css)$/,
>                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
>                 // use: ['style-loader', 'css-loader']
>             }
>         ]
>     },
>     plugins: [
>         new MiniCssExtractPlugin({
>             // 指定抽离的之后形成的文件名
>             // filename: 'styles/[name]_[contenthash:8].css'
>             filename: 'styles/[name]_[contenthash:8].css'
>         }),
>         new webpack.HotModuleReplacementPlugin(),
>     ],
>     devServer: {
>         // 开发时可直接访问到 ./public 下的静态资源，这些资源在开发中不必打包
>         port: 3000,
>         open: true, // 打开浏览器
>         compress: false, // 是否压缩
>         static: "./",
>         proxy: {
>             '/api': {
>                 target: "https://api.github.com",
>                 pathRewrite: {
>                     "^/api": ""
>                 },
>                 changeOrigin: true
>             }
>         },
>         hotOnly: true,
>     }
> 
> }
> ```
> 
> 总结一下webpack的几个核心：
> 
> · Entry：入口，Webpack执行构建的第一步将从Entry开始，可抽象成输入。
> 
> · Module：模块，在Webpack里一切皆模块，一个模块对应一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块。
> 
> · Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
> 
> · Loader：模块转换器，用于将模块的原内容按照需求转换成新内容。

> · Plugin：扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑，来改变构建结果或做我们想要的事情。
> 
> · Output：输出结果，在Webpack经过一系列处理并得出最终想要的代码后输出结果。
> 
> · Resolve：配置寻找模块的规则
> 
> · DevServer：配置DevServer

## 配置

> webpack的配置有两种方式：
> 
> 1. 通过JavaScript文件描述配置，比如webpack.config.js；
> 2. 执行Webpack可执行文件的时候，通过命令行传入参数；
> 
> 这样输入不同命令，执行不同的配置文件。


### Entry
> Entry作为配置模块的入口。默认的情况下，会以context为根目录，context默认> 是启动Webpack时所在的工作目录。比如：
> 
> ```
>     context:path.resolve(__dirname,"app"),
> ```
> 
> 这是选择将当前工作目录的app目录下作为webpack的工作目录。
> 
> entry的类型可以是String、Array或者Object，当参数为Object的时候，配置多个入口。
> ```
>        entry: "./main.js",
>     // entry: {a:"./main.js",b:"./index.js"},
>     // entry:["./index.js","./main.js"],
>     // context:path.resolve(__dirname,"app"),
> ```

### Output

> 配置输出代码，属性值是一个Object类型，参数如下：
> 1. filename，可以定义为自己喜欢的文件名，当时设置多个入口的时候，会根据入口的名称来区分输出文件名：`filename:'[name].js'`，这个变量名可以是name、id、hash或者chunkhash；
> 2. path，设置输出文件的目录，一般是会通过node的path模块获取绝对路径，比如：`path: path.resolve(__dirname, "./dist")`；
> 3. publicPath，有时候项目构建出的资源需要异步加载，publicPath是设置了需要异步加载的资源对应的URL地址。比如将构建的资源发布到CDN服务器上，利于加快页面的打开速度，配置如下：
> ```
> filename:'[name]_[chunkhash:8].js',
> publicPath:"https:cdn.duxinyues.com/assets/"
> ```

### Module

> module配置处理模块的规则，比如配置对样式文件的解析：
> ```
>             {
>                 test: /\.(css)$/,
>                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
>                 // use: ['style-loader', 'css-loader']
>                 exclude: path.resolve(__dirname, "node_modules"), // 排除node_modules下的文件
>             },
> ```


### Resolve

> Webpack启动后，是从入口模块出发，找出所有依赖的模块，Resolve是配置webpack如何寻找模块对应的文件。如果没有配置，那么webpack会按照默认的规则进行查找。

> 1. alias，配置别名，通过别名的方式将原来导入路径映射成一个简单的导入路径。
> 2. extension，在导入语句没有带文件后缀名的时候，webpack会自动加上后缀名，去访问对应的文件是否存在，比如：`extension:['.js','.json']`，在配置中都找不到对应的文件，那就报错
> 3. modules，配置第三方模块，webpack会默认去node_modules下寻找，如果同一个模块被不同位置的文件引入，就会导致引入路径很长，通过modules的配置，这样优化了导入路径。
> 4. enforceExtension，设置为true时，所有导入语句必须带上后缀。

### Plugin

> Plugin用来扩展Webpack的功能，比如：
```
    plugins: [
        new MiniCssExtractPlugin({
            // 指定抽离的之后形成的文件名
            // filename: 'styles/[name]_[contenthash:8].css'
            filename: 'styles/[name]_[contenthash:8].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
```

### resolveLoader
resolveLoader配置Webpack如何查找Loader，比如：
```
   resolveLoader:{
    modules:['node_modules'],
    extensions:[".js",'.json']
   }
```

resolveLoader一般用于加载本地的Loader。

### 