---
title: canvas_learn
date: 2017-01-09 23:30:31
tags:
  - canvas
category:
---

<!-- more -->
<!-- toc -->

# 学习链接
[五分钟学会 Canvas 基础](http://www.jianshu.com/p/d9ec1ef9c1e8)
[五分钟学会 Canvas 基础 二](http://www.jianshu.com/p/2f79c3d8f9d0)
[Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

[canvas-test](https://github.com/whxaxes/canvas-test)
wait
[如何实现Canvas图像的拖拽、点击等操作 - Darly](http://www.tuicool.com/articles/bMBVzu)
[如何实现Canvas图像的拖拽、点击等操作](http://www.cnblogs.com/ghost-xyx/p/3833179.html?utm_source=tuicool&utm_medium=referral)
# 使用

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

> canvas 默认样式的宽度和高度 是 300px * 150px。

## 判断是否支持画布

```
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```
## 设置画布大小

```html
 <canvas id="canvas_1">
  我们在设置 canvas 之前需要首先监测用户电脑是否支持 canvas
 </canvas>
```

 如果通过style.* 来进行画布大小设置，**画布变大，内容也相应的变大，被拉伸了。**

```js
//错误示范
 var canvas_1 = document.getElementById("canvas_1");
 // 设置宽度和高度,但是这种写法会造成额外的问题
 // 画布会拉伸
 // canvas_1.style.width = "500px";
 // canvas_1.style.height = "500px";
```



## resize

```js
var canvas = document.getElementById("cas");
  var ctx = canvas.getContext("2d");
  resize();
  window.onresize = resize;

  function resize() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();
```

 **推荐写法**
 **画布变大 内容不变**

 ```
 canvas.setAttribute('width',400);//注意，不要加 px
 canvas.setAttribute('height',400);
```

## 适配屏幕分辨率
```js
//原本为200px*200px 的画布 
if(window.devicePixelRatio ==2 ){
//设置画大小
canvas.setAttribute('width',400);
canvas.setAttribute('height',400);
//设置内容变大
ctx.scale(2,2);
}
canvas.style.cssText = "height:" +400  +"px; width:" + 400+"px;"   //注意， 加 px
```

画布生成的内容最后就是jpg 的形式，所以在通过css调整显示

和 设置obj.style.cssTest 一样道理
```css
#canvas{
  height:200px;
  width:200px;
}
```

## 坐标轴

横轴向右是正，纵轴向下是正。
![canvas坐标轴](http://upload-images.jianshu.io/upload_images/693359-a77529261762cd36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 常用方法

## 例子
```
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}

//填充属性
ctx.fillStyle = "rgb(200,0,0)";
ctx.fillStyle = "rgba(0, 0, 200, 0.5)";

//填充圆
ctx.fillRect (10, 10, 50, 50);

//画一个 xxx什么都型

// 开始绘制
ctx.beginPath();

//设置绘制起点
ctx.moveTo(100,100);

//设置绘制下一个点
ctx.lineTo(700,400);

//设置绘制下一个点
ctx.lineTo(400,100);

//设置绘制下一个点
ctx.lineTo(600,500);

//结束绘制
ctx.closePath();

//设置线的宽度
ctx.lineWidth = 10;

//设置绘制的样式
ctx.strokeStyle = "red";

//绘制点之间的线路
ctx.stroke();

// 设置填充样式
ctx.fillStyle = "green";

// 填充当前视图
ctx.fill();

// 注意：所有的绘制相应属性全部应该放在 closePath 之前
 
```

## 点&线
moveTo
lineTo

```js
//设置绘制起点
    ctx.moveTo(100,100);

    //设置绘制下一个点
    ctx.lineTo(700,400);

    //设置绘制下一个点
    ctx.lineTo(400,100);
```
### 线
`lineWidth` 设置线的宽度
`lineJoin` 设置返回所创建边角的类型，当两条线交汇时。
 - bevel	创建斜角
 - round	创建圆角
 - miter	默认，创建尖角

## 绘制

`fill()`	填充 canvas 当前路径
`stroke()`	填充 canvas 当前路径绘制边框
`strokeRect(float x,float y,float width,float height)`	绘制一个矩形边框
`fillRect(float x,float y,float width,float height)`	填充一个矩形边框

## 绘制风格

`fillStyle()`	设置填充 canvas 路径所使用的填充风格
`strokeStyle()`	设置绘制 canvas 路径的填充风格
`lineWidth()`	设置笔触线条的宽度

```js
ctx.fillStyle = "rgb(200,0,0)";
ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
```

## 画圆

`arc(x, y, radius, startAngle, endAngle, anticlockwise)`
`arcTo(x1, y1, x2, y2, radius)`

```js
for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        ctx.beginPath();
        var x = 25+j*50; // x coordinate
        var y = 25+i*50; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI+(Math.PI*j)/2; // End point on circle
        var anticlockwise = i%2==0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }

```
## 绘制字体
[MDN-Drawing text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text)
`fillText(String Text, float x, float y, [float maxWidth])`	填充字符串
`strokeText(String Text, float x, float y, [float maxWidth])`	绘制字符串边框
`textAlign`	设置绘制字符串的水平对齐方式(start、end、left、right、center等)
`textBaseAlign`	设置绘制字符串的垂直对齐方式(top、hanging、middle、alphabetic、idecgraphic、bottom 等)


## Bezier and quadratic curves
cp = control point.
`quadraticCurveTo(cp1x, cp1y, x, y)`
`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

## 画图

### drawImage
[Using images](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images)
`drawImage(image, x, y)`
`drawImage(image, x, y, width, height)`
`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`

```
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    ctx.moveTo(30,96);
    ctx.lineTo(70,66);
    ctx.lineTo(103,76);
    ctx.lineTo(170,15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
}
```

### Parameters
```
 var img = new Image();
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
    img.onload = function () {
        var pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 400, 400);
    };
```
## 透明
`globalAlpha  =0.1`

# 小案例

## 时钟
[An animated clock](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)

## 画一个笑脸 并通过 requestAnimationFram 添加动画
```
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var speed = 4;
var x = 0;
var draw;
if (window.devicePixelRatio == 2) {
    canvas.setAttribute('with', 1600);
    canvas.setAttribute('height', 400);
    ctx.scale(2, 2);
}


function animate() {
    reqAnimaFrame = window.mozRequestAnimationFram || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    x += speed
    reqAnimaFrame(animate);
    if (x <= 0 || x >= 600) {
        speed = -speed;
    }
    draw();
}

function draw() {
    //清除
    ctx.clearRect(0+x-10, 0, 220, 200);

    ctx.beginPath();
    ctx.fillStyle = "#f1f42e";
    ctx.strokeStyle = '#00f';

    ctx.lineWidth = 3;
    ctx.arc(x+100, 100, 99, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x+170, 100);
    ctx.arc(x+100, 100, 70, 0, Math.PI)
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(x+60, 65);
    ctx.arc(x+60, 65, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(x+140, 65);
    ctx.arc(x+140, 65, 12, 0, Math.PI * 2);
    ctx.fill();

}

animate();
```

# save  && restore
保存和摧毁状态



# 上传照片加预览（canvas）

```js
function doInput(id){
    var inputObj = document.createElement('input');
    inputObj.addEventListener('change',readFile,false);
    inputObj.type = 'file';
    inputObj.accept = 'image/*';
    inputObj.id = id;
    inputObj.click();
}

function readFile(){
    var file = this.files[0];//获取input输入的图片
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
    var reader = new FileReader();
    reader.readAsDataURL(file);//转化成base64数据类型
    reader.onload = function(e){
            drawToCanvas(this.result);
        }
    }
}

function drawToCanvas(imgData){
    var canvas = document.querySelector('#canvas');
        canvas.width=300;
        canvas.height=400;
        var ctx = canvas.getContext('2d');
        var img = new Image;
            img.src = imgData;
            img.onload = function(){//必须onload之后再画
                ctx.drawImage(img,0,0,300,400);
                strDataURI = canvas.toDataURL();//获取canvas base64数据
            }
}   

```
 
 **给canvas设置宽和高的时候会重新绘制**
... 也可以使用clearRect 



# 照片变色
```js
function ImagesChange(imgsrc,canvas){
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = imgsrc;
    img.onload = function(){
        ctx.drawImage(img,0,0,268,272);
        img = ctx.getImageData(0, 0, 268, 272);
        for (var i = 0; i < 268 * 272 * 4; i += 4) {
            var myRed = img.data[i];
            var myGreen = img.data[i + 1];
            var myBlue = img.data[i + 2];
            var myGray = parseInt((myRed + myGreen + myBlue) / 3);
            img.data[i] = myGray;
            img.data[i + 1] = myGray;
            img.data[i + 2] = myGray;
        }
        ctx.putImageData(img, 0, 0);
    }
}
```

# 插件

真的是帅到不要不要的 插件啊
[seuratjs](http://seuratjs.com/)
[Real Shadow](http://indamix.github.io/real-shadow/#/box/)
[sigmajs ](http://sigmajs.org/)
[Canvas 做的滚动特效](http://lab.hakim.se/scroll-effects/)