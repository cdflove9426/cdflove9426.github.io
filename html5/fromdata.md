# fileupload文件上传

## other
```
    caret-color: yellow  //设置光标颜色
```

## 传统表单上传
```html
<form id= "uploadForm"  method= "post" enctype ="multipart/form-data">  
     <h1 >测试上传文件 </h1>  
     <p>指定文件名： <input type ="text" name="filename" /></p>  
     <p>上传文件： <input type ="file" name="file" /></p>  
     <p>关键字1： <input type ="text" name="keyword" /></p>  
     <p>关键字2： <input type ="text" name="keyword" /></p>  
     <p>关键字3： <input type ="text" name="keyword" /></p>  
     <input type ="submit" value="上传"/>  
</form>  
```

```js
$.ajax({  
     url : "http://localhost:8080/file/upload",  
     type : "POST",  
     data : $( '#postForm').serialize(),  
     success : function(data) {  
          $( '#serverResponse').html(data);  
     },  
     error : function(data) {  
          $( '#serverResponse').html(data.status + " : " + data.statusText + " : " + data.responseText);  
     }  
});
```

通过`$('#postForm').serialize()`可以对form表单进行序列化，从而将form表单中的所有参数传递到服务端。

**但是上述方式，只能传递一般的参数，上传文件的文件流是无法被序列化并传递的。**

 有了这个`FormData`，我们就可以轻松地使用Ajax方式进行文件上传了。


## FormData
```html
<form id= "uploadForm" enctype ="multipart/form-data">  
      <p >指定文件名： <input type="text" name="filename" value= ""/></p >  
      <p >上传文件： <input type="file" name="file"/></ p>  
      <input type="button" value="上传" onclick="doUpload()" />  
</form>  
```
```js
function doUpload() {  
     var formData = new FormData($( "#uploadForm" )[0]);  
     $.ajax({  
          url: 'http://localhost:8080/cfJAX_RS/rest/file/upload' ,  
          type: 'POST',  
          data: formData,  
          async: false,  
          cache: false,  
          contentType: false,  
          processData: false,  
          success: function (returndata) {  
              alert(returndata);  
          },  
          error: function (returndata) {  
              alert(returndata);  
          }  
     });  
} 
```


## FileList 对象和 file 对象
HTML 中的 `input[type="file"]` 标签有个` multiple` 属性，允许用户选择多个文件，`FileList`对象则就是表示用户选择的文件列表。这个列表中的每一个文件，就是一个 `file` 对象。


file 对象的属性：
```
name : 文件名，不包含路径。
type : 文件类型。图片类型的文件都会以 image/ 开头，可以由此来限制只允许上传图片。
size : 文件大小。可以根据文件大小来进行其他操作。
lastModified : 文件最后修改的时间。
```

```js
<input type="file" id="files" multiple>
<script>
    var elem = document.getElementById('files');
    elem.onchange = function (event) {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            // 文件类型为 image 并且文件大小小于 200kb
            if(files[i].type.indexOf('image/') !== -1 && files[i].size < 204800){
                console.log(files[i].name);
            }


            // 一帮图片都是jpeg,jpg,png,gif
            if(/^image\/[jpeg|png|gif]/.test(files[i].type)){

            }
        }
    }
</script>
 
```
`input` 中有个 `accept` 属性,可以用来规定能够通过文件上传进行提交的文件类型。

`accept="image/*"` 可以用来限制只允许上传图像格式,是在 Webkit 浏览器下却出现了响应滞慢的问题，要等上好几秒才弹出文件选择框。

这样精确的写法，才不会有明显的卡顿
```html
<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png">
```

## FileReader 对象

FileReader 对象主要用来把文件读入内存，并且读取文件中的数据。通过构造函数创建一个 FileReader 对象
该对象有以下方法：
```
abort：中断读取操作。
readAsArrayBuffer：读取文件内容到ArrayBuffer对象中。
readAsBinaryString：将文件读取为二进制数据。
readAsDataURL：将文件读取为data: URL格式的字符串。
readAsText：将文件读取为文本。
``` 


## 上传图片预览
客户端上传图片之后通过 `readAsDataURL()` 来显示图片
```html
<input type="file" id="files" accept="image/jpeg,image/jpg,image/png">
<img src="blank.gif" id="preview">
<script>
    var elem = document.getElementById('files'),
        img = document.getElementById('preview');

    // elem.addEventListener('change', function (event) {
    //     reader.readAsDataURL(event.target.files[0]);
    // });
    elem.onchange = function () {
        var files = elem.files,
            reader = new FileReader();
        if(files && files[0]){
            reader.onload = function (ev) {
                img.src = ev.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }

     
</script>
 
```


# 文件上传
##  直接FormData
如果直接就是一个FormData了，那么直接用ajax发出去就行了，不用做任何处理：
```js
let form = document.querySelector("form"),
    formData = new FormData(form),
formData.append("fileName", "photo.png");

let xhr = new XMLHttpRequest();
// 假设上传文件的接口叫upload
xhr.open("POST", "/upload");
xhr.send(formData);
```


##  Jq文件上传
因为jQuery会自动把内容做一些转义，并且根据data自动设置请求mime类型，这里告诉jQuery直接用xhr.send发出去就行了。
```js
$.ajax({
    url: "/upload",
    type: "POST",
    data: formData,
    processData: false,  // 不处理数据
    contentType: false   // 不设置内容类型
});
```
```html
<form enctype="multipart/form-data" method="post">

    <input type="file" name="fileContent">

</form>
```


记得form 表单需要设置`enctype="multipart/form-data"` 表示上传文件

常用的POST编码是`application/x-www-form-urlencoded`，它和`GET`一样，发送的数据里面，参数和参数之间使用&连接，如：
`key1=value1&key2=value2`

`xhr.send`的是`FormData`类型话，它会自动设置`enctype`，所以jq 就需要设置两个属性为`false`。

如果你用默认表单提交上传文件的话就得在form上面设置这个属性，因为上传文件只能使用POST的这种编码。

特殊字符做转义，这个数据POST是放在请求body里的，而GET是拼在url上面的，如果用jq的话，jq会帮你拼并做转义。


而上传文件用的这种multipart/form-data，参数和参数之间是且一个相同的字符串隔开的，上面的是使用：

> ——WebKitFormBoundary72yvM25iSPYZ4a3F

这个字符通常会取得比较长、比较随机，因为要保证正常的内容里面不会出现这个字符串，这样内容的特殊字符就不用做转义了。

请求的contentType被浏览器设置成：

> Content-Type:
> multipart/form-data; boundary=—-WebKitFormBoundary72yvM25iSPYZ4a3F

后端服务通过这个就知道怎么解析这么一段数据了。



## canvas的图片上传
前端经常要处理图片，读取为base64之后就可以把它画到一个canvas里面，然后就可以做一些处理，如压缩、裁剪、旋转等。最后再用canvas导出一个base64格式的图片，那怎么上传base64格式的呢？

### canvas画布转换成img图像

canvas天然提供了2个转图片的方法

**canvas.toDataURL()**方法
可以把图片转换成base64格式信息，纯字符的图片表示法
`canvas.toDataURL(mimeType, qualityArgument)`

- mimeType 
表示示canvas导出来的base64图片的类型，默认是`png`格式，也即是默认值是'image/png'，我们也可以指定为jpg格式'image/jpeg'。

`file`对象中的`file.type`就是文件的`mimeType`类型，在转换时候正好可以直接拿来用

- qualityArgument
表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92，


**canvas.toBlob()**方法
把canvas转换成Blob文件，通常用在文件上传中，因为是二进制的，对后端更加友好。
`canvas.toBlob(callback, mimeType, qualityArgument)`
和toDataURL()方法相比，toBlob()方法是异步的，因此多了个callback参数，


部分安卓微信浏览器无法触发onchange事件（第一步就特么遇到问题）
这其实安卓微信的一个遗留问题。 查看讨论 解决办法也很简单：input标签 
```html
<input type=“file" name="image" accept="image/gif, image/jpeg, image/png”>
要写成
<input type="file" name="image" accept=“image/*”>
```


```html
<input id="file" type="file">
```
 
JS代码：
```js
var eleFile = document.querySelector('#file');

// 压缩图片需要的一些元素和对象
var reader = new FileReader(), img = new Image();

// 选择的文件对象
var file = null;

// 缩放图片需要的canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

// base64地址图片加载完毕后
img.onload = function () {
    // 图片原始尺寸
    var originWidth = this.width;
    var originHeight = this.height;
    // 最大尺寸限制
    var maxWidth = 400, maxHeight = 400;
    // 目标尺寸
    var targetWidth = originWidth, targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
        
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
        // 图片ajax上传
        var xhr = new XMLHttpRequest();
        // 文件上传成功
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                // xhr.responseText就是返回的数据
            }
        };
        // 开始上传
        xhr.open("POST", 'upload.php', true);
        xhr.send(blob);    
    }, file.type || 'image/png');
};

// 文件base64化，以便获知图片原始尺寸
reader.onload = function(e) {
    img.src = e.target.result;
};
eleFile.addEventListener('change', function (event) {
    file = event.target.files[0];
    // 选择的文件是图片
    if (file.type.indexOf("image") == 0) {
        reader.readAsDataURL(file);    
    }
});
```

## 案例
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <title>移动端图片压缩上传demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style-type: none;
        }

        a,
        input {
            outline: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        #choose {
            display: none;
        }

        canvas {
            width: 100%;
            border: 1px solid #000000;
        }

        #upload {
            display: block;
            margin: 10px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid;
            border-radius: 5px;
            cursor: pointer;
        }

        .touch {
            background-color: #ddd;
        }

        .img-list {
            margin: 10px 5px;
        }

        .img-list li {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            margin: 5px 5px 20px 5px;
            border: 1px solid rgb(100, 149, 198);
            background: #fff no-repeat center;
            background-size: cover;
        }

        .progress {
            position: absolute;
            width: 100%;
            height: 20px;
            line-height: 20px;
            bottom: 0;
            left: 0;
            background-color: rgba(100, 149, 198, .5);
        }

        .progress span {
            display: block;
            width: 0;
            height: 100%;
            background-color: rgb(100, 149, 198);
            text-align: center;
            color: #FFF;
            font-size: 13px;
        }

        .size {
            position: absolute;
            width: 100%;
            height: 15px;
            line-height: 15px;
            bottom: -18px;
            text-align: center;
            font-size: 13px;
            color: #666;
        }

        .tips {
            display: block;
            text-align: center;
            font-size: 13px;
            margin: 10px;
            color: #999;
        }

        .pic-list {
            margin: 10px;
            line-height: 18px;
            font-size: 13px;
        }

        .pic-list a {
            display: block;
            margin: 10px 0;
        }

        .pic-list a img {
            vertical-align: middle;
            max-width: 30px;
            max-height: 30px;
            margin: -4px 0 0 10px;
        }
    </style>
</head>

<body>
    <input type="file" id="choose" accept="image/*" multiple>
    <ul class="img-list"></ul>
    <a id="upload">上传图片</a>
    <span class="tips">只允许上传jpg、png及gif</span>
    <div class="pic-list">
        你上传的图片(图片有效期为1分钟)：
    </div>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <!-- <script src="/public/jquery-2.1.1.min.js"></script> -->
    <script>
        var filechooser = document.getElementById("choose");
        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
        var maxsize = 100 * 1024;
        $("#upload").on("click", function () {
                filechooser.click();
            })
            .on("touchstart", function () {
                $(this).addClass("touch")
            })
            .on("touchend", function () {
                $(this).removeClass("touch")
            });
        filechooser.onchange = function () {
            if (!this.files.length) return;
            var files = Array.prototype.slice.call(this.files);
            if (files.length > 9) {
                alert("最多同时只可上传9张图片");
                return;
            }
            files.forEach(function (file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                var reader = new FileReader();
                var li = document.createElement("li");
                //          获取图片大小
                var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(
                    file.size / 1024) + "KB";
                li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size +
                    '</div>';
                $(".img-list").append($(li));
                reader.onload = function () {
                    var result = this.result;
                    var img = new Image();
                    img.src = result;
                    $(li).css("background-image", "url(" + result + ")");
                    //如果图片大小小于100kb，则直接上传
                    if (result.length <= maxsize) {
                        img = null;
                        upload(result, file.type, $(li));
                        return;
                    }
                    //      图片加载完毕之后进行压缩，然后上传
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = compress(img);
                        upload(data, file.type, $(li));
                        img = null;
                    }
                };
                reader.readAsDataURL(file);
            })
        };
        //    使用canvas对大图片进行压缩
        function compress(img) {
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                var nw = ~~(width / count);
                var nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.1);
            console.log('压缩前：' + initSize);
            console.log('压缩后：' + ndata.length);
            console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        }
        //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function upload(basestr, type, $li) {
            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            var pecent = 0,
                loop = null;
            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }
            var blob = getBlob([buffer], type);
            var xhr = new XMLHttpRequest();
            var formdata = getFormData();
            formdata.append('imagefile', blob);
            xhr.open('post', '/cupload');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonData = JSON.parse(xhr.responseText);
                    var imagedata = jsonData[0] || {};
                    var text = imagedata.path ? '上传成功' : '上传失败';
                    console.log(text + '：' + imagedata.path);
                    clearInterval(loop);
                    //当收到该消息时上传完毕
                    $li.find(".progress span").animate({
                        'width': "100%"
                    }, pecent < 95 ? 200 : 0, function () {
                        $(this).html(text);
                    });
                    if (!imagedata.path) return;
                    $(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '（' + imagedata.size +
                        '）<img src="' + imagedata.path + '" /></a>');
                }
            };
            //数据发送进度，前50%展示该进度
            xhr.upload.addEventListener('progress', function (e) {
                if (loop) return;
                pecent = ~~(100 * e.loaded / e.total) / 2;
                $li.find(".progress span").css('width', pecent + "%");
                if (pecent == 50) {
                    mockProgress();
                }
            }, false);
            //数据后50%用模拟进度
            function mockProgress() {
                if (loop) return;
                loop = setInterval(function () {
                    pecent++;
                    $li.find(".progress span").css('width', pecent + "%");
                    if (pecent == 99) {
                        clearInterval(loop);
                    }
                }, 100)
            }
            xhr.send(formdata);
        }
        /**
         * 获取blob对象的兼容性写法
         * @param buffer
         * @param format
         * @returns {*}
         */
        function getBlob(buffer, format) {
            try {
                return new Blob(buffer, {
                    type: format
                });
            } catch (e) {
                var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                buffer.forEach(function (buf) {
                    bb.append(buf);
                });
                return bb.getBlob(format);
            }
        }
        /**
         * 获取formdata
         */
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
                ~navigator.vendor.indexOf('Google') &&
                !~navigator.userAgent.indexOf('Chrome') &&
                navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            return isNeedShim ? new FormDataShim() : new FormData()
        }
        /**
         * formdata 补丁, 给不支持formdata上传blob的android机打补丁
         * @constructor
         */
        function FormDataShim() {
            console.warn('using formdata shim');
            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;
            this.append = function (name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type +
                        '\r\n\r\n');
                    parts.push(value);
                } else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };
            // Override XHR send()
            XMLHttpRequest.prototype.send = function (val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function () {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function (err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                } else {
                    oldSend.call(this, val);
                }
            };
        }
    </script>
</body>

</html>
```



# 关于图片上传 自动被旋转90度的问题
[利用exif.js解决ios手机上传竖拍照片旋转90度问题](https://blog.csdn.net/linlzk/article/details/48652635)


# link
[前端获取图片压缩后上传给后台](https://blog.csdn.net/lowers_sunshine/article/details/72865300)
[HTML5 file API加canvas实现图片前端JS压缩并上传-鑫大神] (https://www.zhangxinxu.com/wordpress/2017/07/html5-canvas-image-compress-upload/)
[前端本地文件操作与上传](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651554433&idx=2&sn=a273503dcb32987bb548cd4a1280d974&chksm=80255540b752dc56d176d384eeaa592a3a63f5ee29e79493e5896050ec759fd6e5b9b3a4822e&mpshare=1&scene=1&srcid=0623fRTEv21yZahrlgGoXlsU#rd)

[移动端H5实现图片上传](https://segmentfault.com/a/1190000010034177)
[手把手教你如何编写一个前端图片压缩、方向纠正、预览、上传插件](https://juejin.im/post/5a9759a16fb9a0635b5360b3)
