---
sidebar_position: 8
slug: JavaScript：File API和Blob API
title: JavaScript：File API和Blob API
tags: [JavaScript]
---
web应用的痛点就是不能操作计算机上的文件。File API和Blob API可以安全访问到客户端上的文件。

## File类型

现在我们可以在html表单中直接访问文件，比如：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
    <input type="file">
</body>
</html>
```

效果如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/cdc88f6c79594a36a4439722ad74d81b.png)

当我们选择文件后，可以读出文件得到名称：

![在这里插入图片描述](https://img-blog.csdnimg.cn/908ef48b7a2d46ffaa0ed928207fdbbf.png)

选中后的文件中，每一个File对象中都只有一些只读属性，比如name、size和type：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c038c29f32e4918bd41851c06f3bc04.png)

#### FileReader类型

FileReader类型是一种异步文件读取机制，提供了集中读取文件数据的方法：

readAsText(file,encoding)：从文件中读取纯文本内容并且保存在result属性中，第二个参数是表示编码，可选参数。

readAsDataURL(file)：读取文件并且将内容的数据URI保存在result属性中。

readAsBinaryString(file)：读取文件并且把每一个字符的二进制数据保存在result属性。

readAsArrayBuffer(file)：读取文件并且把内容以ArrayBuffer形式保存在result中。

在读取文件中，会触发几个事件：progress、error和load，表示进度、发生错误和读取完成。

progress事件每50毫秒就会触发一次，在这期间可以读取FileReader的result属性；

error事件，在无法读取文件的时候触发，error属性是一个对象，只包含一个属性：code。这个错误码的值可能是1（未找到文件）、2（安全错误）、3（读取被中断）、4（文件不可读）或5（编码错误）

load事件会在成功加载后触发，如果error事件触发，那么不会触发load事件
比如：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <input type="file" id="file">

  <div type="text" id="output"></div>

  <div id="progress"></div>
  <script>
    let filesList = document.getElementById("file");
    filesList.addEventListener("change", (event) => {
      let info = "",
          output = document.getElementById("output"),
          progress = document.getElementById("progress"),
          files = event.target.files,
          type = "default",
          reader = new FileReader();
      if (/image/.test(files[0].type)) {
        reader.readAsDataURL(files[0]);
        type = "image";
      } else {
        reader.readAsText(files[0]);
        type = "text";
      }
      reader.onerror = function() {
        output.innerHTML = "Could not read file, error code is " +
            reader.error.code;
      };
      reader.onprogress = function(event) {
        if (event.lengthComputable) {
          console.log(`${event.loaded}/${event.total}`)
          progress.innerHTML = `${event.loaded}/${event.total}`;
        }
      };
      reader.onload = function() {
        let html = "";
        switch(type) {
          case "image":
            html = `<img src="${reader.result}">`;
            break;
          case "text":
            html = reader.result;
            break;
        }
        output.innerHTML = html;
      };
    });
  </script>
</body>

</html>

```

## Blob

Blob是表示二进制大对象，是JavaScript对不可修改的二进制数据的封装类型，包含字符串的数组、ArrayBuffers、ArrayBufferViews，

Blob对象有一个size属性和type属性，slice方法用于进一步切分数据，另外也可以使用FileReader从Blob中读取数据。只读取一部分文件可以节省时间，比如现在只读取文件的前10个字节：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <input type="file" id="file">

  <div type="text" id="output"></div>

  <div id="progress"></div>
  <script>
    let filesList = document.getElementById("files-list");
    filesList.addEventListener("change", (event) => {
      let info = "",
        output = document.getElementById("output"),
        progress = document.getElementById("progress"),
        files = event.target.files,
        reader = new FileReader(),
        blob = blobSlice(files[0], 0, 10);
      if (blob) {
        reader.readAsText(blob);
        reader.onerror = function () {
          output.innerHTML = "Could not read file, error code is " +
            reader.error.code;
        };
        reader.onload = function () {
          output.innerHTML = reader.result;
        };
      } else {
        console.log("Your browser doesn't support slice().");
      }
    });
  </script>
</body>

</html>

```

#### Blob URL

是引用存储在File或者Blob中数据的URL，有点就是不用把文件内容读取到JavaScript中可以使用文件，只需要在对应位置提供对象的URL即可。创建对象URL，使用window.URL.createObjectURL()方法，传入File或者Blob对象，它返回一个指向内存中地址的字符串。比如：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <input type="file" id="file" multiple>

  <div type="text" id="output"></div>

  <div id="progress"></div>
  <script>
    let filesList = document.getElementById("file");
    filesList.addEventListener("change", (event) => {
      let info = "",
        output = document.getElementById("output"),
        progress = document.getElementById("progress"),
        files = event.target.files,
        reader = new FileReader(),
        url=window.URL.createObjectURL(files[0]);
        console.log("url",url)
      if (url) {
        if (/image/.test(files[0].type)) {
          output.innerHTML=`<img src="${url}">`;
        } else {
          output.innerHTML = "Not an image.";
        }
      } else {
        output.innerHTML = "Your browser doesn't support object URLs.";
      }
    });
  </script>
</body>

</html>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c178f3879caa4192b7ab92b8ea1208ac.png)
