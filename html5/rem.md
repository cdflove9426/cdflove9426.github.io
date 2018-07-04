# Rem不是银弹
rem是弹性布局的一种实现方式，弹性布局可以算作响应式布局的一种，但响应式布局不是弹性布局，弹性布局强调等比缩放，100%还原；响应式布局强调不同屏幕要有不同的显示，比如媒体查询


rem可以做到100%的还原度，但使用rem还有一些问题，下面我们一一列举下：

（对iphone6而言：原先的375×667，就会变成750×1334）
设备像素比 = 物理像素 / 设备独立像素 
javascript中，可以通过`window.devicePixelRatio`获取到当前设备的dpr。

理论上，1个位图像素对应于1个物理像素，图片才能得到完美清晰的展示。

在普通屏幕下是没有问题的，但是在retina屏幕下就会出现位图像素点不够，从而导致图片模糊的情况。
![retina屏幕下就会出现位图像素点不](./images/rem_dpr_20180622175015.jpg)
对于dpr=2的retina屏幕而言，1个位图像素对应于4个物理像素，由于单个位图像素不可以再进一步分割，所以只能就近取色，从而导致图片模糊






首先是字体的问题，字体大小并不能使用rem，字体的大小和字体宽度，并不成线性关系，所以字体大小不能使用rem；由于设置了根元素字体的大小，会影响所有没有设置字体大小的元素，因为字体大小是会继承的，
```css
html {fons-size: width / 100}
body {font-size: 16px} 
```
**可以通过修改body字体的大小来实现，同时所有设置字体大小的地方都是用em单位**

```css
@media screen and (min-width: 320px) {
	body {font-size: 16px}
}
@media screen and (min-width: 481px) and (max-width:640px) {
	body {font-size: 18px}
}
@media screen and (min-width: 641px) {
	body {font-size: 20px}
}

p {font-size: 1.2em}
p a {font-size: 1.2em}
```

 **在PC端浏览，页面过宽?**
```js
var clientWidth = document.documentElement.clientWidth;
clientWidth = clientWidth < 780 ? clientWidth : 780;
document.documentElement.style.fontSize = clientWidth / 100 + 'px';
```
```css
body { margin: auto; width: 100rem } 
```


# 整合 Rem布局方案

rem+js方案  解决字体问题，解决屏幕过宽问题
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title>rem布局</title>
</head>
<body>
</body>
</html>
```
```css
html {
    font-size: 32px; /* 320/10 */
}
body {
    font-size: 16px; /* 修正字体大小 */
    margin: auto;
    padding: 0;
    /* width: 10rem; */
}

@media screen and (min-width: 320px) {
    body {font-size: 16px;}
}
@media screen and (min-width: 481px) and (max-width:640px) {
    body {font-size: 18px;}
}
@media screen and (min-width: 641px) {
    body {font-size: 20px;}
}


```

```js
var documentElement = document.documentElement;

function recalc() {
    var clientWidth = documentElement.clientWidth;
    // 屏幕宽度大于780，不在放大
    clientWidth = clientWidth < 780 ? clientWidth : 780;
    documentElement.style.fontSize = clientWidth / 10 + 'px';
}

document.addEventListener('DOMContentLoaded', recalc);
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', recalc);


// 或者
  (function (doc, win) {
      var docEl = doc.documentElement;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);


```


# 设备像素比 
这种方式已经足够页面的开发布局，
可是要是想把页面做的更加高级，适配上屏幕的设备像素比


多屏适配布局问题
移动端布局，为了适配各种大屏手机，目前最好用的方案莫过于使用相对单位rem。

基于rem的原理，我们要做的就是: 针对不同手机屏幕尺寸和dpr动态的改变根节点html的font-size大小(基准值)。
```js
rem = document.documentElement.clientWidth * dpr / 10
```

rem 
除以10，是为了取整，方便计算(理论上可以是任何值)
iphone4/5: 320px * 2 / 10 = 64px

iphone6: 375px * 2 / 10 = 75px

所以 iphone6 的设计稿为 750×1334 
如果设计稿一个div 的宽为300px
css的写法就是  300/75 =4rem

```js
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * dpr / 10;
scale = 1 / dpr;


// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
```

自动适配版
```js
 (function (doc, win) {
      var dpr, rem, scale;
      var docEl = doc.documentElement;
      var fontEl = doc.createElement('style');
      var metaEl = doc.querySelector('meta[name="viewport"]');
      // var clineWidth = docEl.clientWidth;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          // console.log('----recalc',"docEl.clientWidth",docEl.clientWidth);
          // console.log('----window.screen.width',"window.screen.width",window.screen.width);
          dpr = win.devicePixelRatio || 1;
          rem = win.screen.width * dpr / 10; //clientWidth 在这里不合适 ，如果文档已经被缩放了那clientWidth 也就被了
          scale = 1 / dpr;

          // 设置viewport，进行缩放，达到高清效果
          metaEl.setAttribute('content', 'width=' + dpr * win.screen.width + ',initial-scale=' + scale +
            ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

          // 设置data-dpr属性，留作的css hack之用
          docEl.setAttribute('data-dpr', dpr);
          // 动态写入样式
          // docEl.firstElementChild.appendChild(fontEl);
          // fontEl.innerHTML = 'html{font-size:' +  rem + 'px!important;}';
          docEl.style.fontSize = rem + 'px';
          // 给js调用的，某一dpr下rem和px之间的转换函数
          win.rem2px = function (v) {
            v = parseFloat(v);
            return v * rem;
          };
          win.px2rem = function (v) {
            v = parseFloat(v);
            return v / rem;
          };

          win.dpr = dpr;
          win.rem = rem;
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window)
```
因为这个方案同时解决了三个问题：

- border: 1px问题
- 图片高清问题
- 屏幕适配布局问题



**rem单位计算**
rem = px / 基准值;

4rem = 300px/75  

width: 10rem; // -> 750px
height: 4rem; // -> 300px
因为dpr为2，页面scale了0.5，所以在手机屏幕上显示的真实宽高应该是375×150px

通过less  ,sass 或者stylu 等工具减少我们的运算

# 字体大小问题
对于页面区块的宽高，我们可以依赖高清视觉稿，但是如果字体也通过rem来设置的话 ，就不会那么美观了
对于字体缩放问题，设计师原本的要求是这样的：**任何手机屏幕上字体大小都要统一** 实际上也确实是这样才美观


我们也会用less写一个mixin：
```css
.px2px(@name, @px){
    @{name}: round(@px / 2) * 1px;
    [data-dpr="2"] & {
        @{name}: @px * 1px;
    }
    // for mx3
    [data-dpr="2.5"] & {
        @{name}: round(@px * 2.5 / 2) * 1px;
    }
    // for 小米note
    [data-dpr="2.75"] & {
        @{name}: round(@px * 2.75 / 2) * 1px;
    }
    [data-dpr="3"] & {
        @{name}: round(@px / 2 * 3) * 1px
    }
    // for 三星note4
    [data-dpr="4"] & {
        @{name}: @px * 2px;
    }
}
```


[移动端高清、多屏适配方案](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)



# 自己整合了一份
虽然用起来也是挺舒服的，样式也很清晰，不过要看情况，
微信端，因为放大视图的问题，长按二维码好像会有问题
同时因为放大的问题，一些组建用进来需要改样式，在开发时间比较紧的时候比较麻烦。
保存着 日后跟进

```css
@function px2rem($px, $base-font-size: 75px) {
  @if (unitless($px)) {
    @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
    @return px2rem($px + 0px); // That may fail.
  } @else if (unit($px) == rem) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

@function px2em($px, $base-font-size: 20px) {
  @if (unitless($px)) {
    @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
    @return px2em($px + 0px); // That may fail.
  } @else if (unit($px) == em) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1em;
}

```
```js
    (function (doc, win) {
      var dpr, rem, scale;
      var docEl = doc.documentElement;
      var defineFontSize = 16;
      var maxWidthScreen = 780; //设备最大宽度

      var metaEl = doc.querySelector('meta[name="viewport"]');
      // var clineWidth = docEl.clientWidth;
      function getfonesize(_screenWidth){
        console.log(_screenWidth);
        if(_screenWidth >=640){
          return 36 ;
        }else if(_screenWidth >=640){
          return 30;
        }else if(_screenWidth >=600){
          return 28;
        }else if(_screenWidth >=540){
          return 26;
        }else if(_screenWidth >=480){
          return 24;
        }else if(_screenWidth >=410){
          return 22;
        }else if(_screenWidth >=375){
          return 20;
        }else if(_screenWidth >=350){
          return 18;
        }else if(_screenWidth >=320){
          return 16;
        }
      }
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          // console.log('----recalc',"docEl.clientWidth",docEl.clientWidth);
          // console.log('----window.screen.width',"window.screen.width",window.screen.width);

          let  screenWidth =  win.screen.width; //设备宽度
          defineFontSize = getfonesize(screenWidth)
          console.log(screenWidth);
          screenWidth = screenWidth>maxWidthScreen ?  maxWidthScreen : screenWidth;
          dpr = win.devicePixelRatio || 1;
          rem = screenWidth * dpr / 10; //clientWidth 在这里不合适 ，如果文档已经被缩放了那clientWidth 也就被了
          scale = 1 / dpr;

          // 设置viewport，进行缩放，达到高清效果
          metaEl.setAttribute('content', 'width=' + dpr * screenWidth + ',initial-scale=' + scale +
            ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

          // 设置data-dpr属性，留作的css hack之用
          docEl.setAttribute('data-dpr', dpr);
          // 动态写入样式
          docEl.style.fontSize = rem + 'px';
          doc.body.style.fontSize = defineFontSize*dpr + 'px';
          doc.body.style.width = screenWidth*dpr + 'px';

          // 给js调用的，某一dpr下rem和px之间的转换函数
          win.rem2px = function (v) {
            v = parseFloat(v);
            return v * rem;
          };
          win.px2rem = function (v) {
            v = parseFloat(v);
            return v / rem;
          };

          win.dpr = dpr;
          win.rem = rem;
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window)
```
