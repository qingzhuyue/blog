---
sidebar_position: 4
slug: JavaScript：错误处理
title: JavaScript：错误处理
tags: [JavaScript]
---
一个优秀的产品，需要有一个良好的错误处理策略可以让用户知道到底发生什么。不至于让用户自己不知道发生了什么，然后再重试或者是不至于然用户感到特别厌烦，然后直接离开。

## try/catch语句

try/catch语句，在JavaScript中作为处理异常的一种方式，基本语句如下：

```javascript
try{
   // 可能出错的代码
} catch(error){
   // 出错的时候做什么
}
```
如果try块中有代码发生错误，就会立即退出执行，跳到catch块中，这时候catch模块接受到一个对象，该对象包含了发生错误的相关信息，比如：

```javascript
try{
	window.someNonexistenFunction();
} catch (error){
	console.log(error.message);
}
```

这个message属性是唯一一个在IE、Firefox、Safari、Chrome和Opera中都有的属性，尽管每个浏览器添加了其他属性。IE添加了description属性（其值始终等于message）和number属性（它包含内部错误号）。Firefox添加了fileName、lineNumber和stack（包含栈跟踪信息）属性。Safari添加了line（行号）、sourceId（内部错误号）和sourceURL属性。同样，为保证跨浏览器兼容，最好只依赖message属性。


####  finally子句
在try/catch语句中，可选的finally语句始终运行，意思就是try模块中代码执行结束后，就执行finally模块中的代码。如果出错并执行catch中的代码，finally模块中代码依旧在运行。try或者catch不能阻止finally块的执行，包括return。比如：

```javascript
function test(){
	try{
		return 2;
	}catch(err){
		return 1;
	}finally{
		return 0;
	}
}
console.log(test()); // 0
```
在这段代码中，如果去掉finally模块，则返回2；如果写上finally语句，就不管什么情况都会返回2，那么catch就是可选项了。

总结：只要代码中包含了finally语句，那么try或者catch的return就会被忽略。

## 错误类型
代码在执行过程中，会发生各种各样的类型错误，每种类型都会对应一个错误发生时抛出的错误对象。

有8中错误类型：
1. Error，基类型，其他类错误类型都是继承基类型。所以所有的错误类型都共享相同的属性；
2. internalError，在底层JavaScript引擎抛出异常的时候，由浏览器抛出的错误类型。例如递归过多导致栈溢出；
3. EvalError，通常在eval函数发生异常的时候抛出。基本上，只要不把eval()当成函数调用就会报告该错误；
4. RangeError，在数值越界时抛出，比如定义数组时，设置了不支持的长度，就会这个类型的错误；
5. ReferenceError，在找不到对象的时候发生，这种错误经常是由访问不存在的变量而导致的；
6. SyntaxError，SyntaxError经常在给eval()传入的字符串包含JavaScript语法错误时发生，比如：`eval("a ++ b"); // 抛出SyntaxError`；
7. TypeError，JavaScript中很常见，主要发生在变量不是预期类型，或者访问不存在的方法时

```javascript
let o = new 1100 ; // TypeError
console.log('name' in true) ; // TypeError
Function.prototype.toString.call("name"); // TypeError
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20227d3ef5324a9d904d112f351c694a.png)

8. URIError，会在使用encodeURI()或decodeURI()但传入了格式错误的URI时发生

