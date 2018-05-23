---
title: animation-动画
tags:
  - animation
  - css
date: 2017-02-07 16:10:12
category:
---

# animation
[animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

[案例-京东海外招聘](http://jdc.jd.com/h5/jd-campus-2017/international/index.html)

一个适合做背景，小元素循环运动的代码
```
.in{
    animation: in_fall 2s .5s ease-out backwards,in_float2 10s 2.5s linear infinite alternate;
}

@keyframes in_fall {
    0% {
        -webkit-transform: translateY(-25.7185rem);
        transform: translateY(-25.7185rem);
        opacity: 0
    }
    30% {
        -webkit-transform: translateY(1.4815rem);
        transform: translateY(1.4815rem);
        opacity: 1;
    }
    50% {
        -webkit-transform: translateY(-.4444rem);
        transform: translateY(-.4444rem);
    }
    100% {
        -webkit-transform: translateY(.4445rem);
        transform: translateY(.4445rem);
    }
}

@keyframes in_fall2 {
    0% {
        -webkit-transform: translate3d(0, .4445rem, 0);
        transform: translate3d(0, .4445rem, 0);
    }
     100% {
        -webkit-transform: translate3d(4.4445rem, -4rem, 0);
        transform: translate3d(4.4445rem, -4rem, 0);
    }
}


```

animate plus是一个CSS和SVG的动画效果类库，超轻量级并且高性能，非常适合手机端的动画效果需求
[animateplus](https://github.com/bendc/animateplus)




animation 属性是一个简写属性，用于设置动画属性：

animation-name:动画名称，需要用@keyframes去设置一个动画
animation-duration:动画完成的周期，0则不会播放动画
animation-timing-function:动画速度的曲线
animation-delay:延迟执行动画的时间,也可以负值
animation-iteration-count:动画被播放的次数
animation-direction:播放方向
animation-fill-mode:设置动画结束后的状态
animation-play-state:
<!-- more -->
<!-- toc -->
[例子](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

```html
<div class="view_port">
  <div class="polling_message">
    Listening for dispatches
  </div>
  <div class="cylon_eye"></div>
</div>

```

```css
.polling_message {
  color: white;
  float: left;
  margin-right: 2%;            
}

.view_port {
  background-color: black;
  height: 25px;
  width: 100%;
  overflow: hidden;
}

.cylon_eye {
  background-color: red;
  background-image: -webkit-linear-gradient(    left, rgba( 0,0,0,0.9 ) 25%, rgba( 0,0,0,0.1 ) 50%, rgba( 0,0,0,0.9 ) 75%);
  background-image:    -moz-linear-gradient(    left, rgba( 0,0,0,0.9 ) 25%, rgba( 0,0,0,0.1 ) 50%, rgba( 0,0,0,0.9 ) 75%);
  background-image:      -o-linear-gradient(    left, rgba( 0,0,0,0.9 ) 25%, rgba( 0,0,0,0.1 ) 50%, rgba( 0,0,0,0.9 ) 75%);
  background-image:         linear-gradient(to right, rgba( 0,0,0,0.9 ) 25%, rgba( 0,0,0,0.1 ) 50%, rgba( 0,0,0,0.9 ) 75%);
  color: white;
  height: 100%;
  width: 20%;

  -webkit-animation: 4s linear 0s infinite alternate move_eye;
     -moz-animation: 4s linear 0s infinite alternate move_eye;
       -o-animation: 4s linear 0s infinite alternate move_eye;
          animation: 4s linear 0s infinite alternate move_eye;
}

@-webkit-keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }
   @-moz-keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }
     @-o-keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }
        @keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }

```

## animation-direction
- reverse: 反向播放
- alternate:正反正反...的播放
- alternate-reverse:反正反正...的播放

## animation-timing-function


```css
/* Keyword values */
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: linear;
animation-timing-function: step-start;
animation-timing-function: step-end;

/* Function values */
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
animation-timing-function: steps(4, end);

/* Multiple animations */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* Global values */
animation-timing-function: inherit;
animation-timing-function: initial;
animation-timing-function: unset;
```


## animation-fill-mode

- none;
- forwards;
- backwards;
- both;

forwards:设置对象状态为动画结束时的状态,100%或者to时，也是显示最后动画结束的样子


# animation event

## 暂停动画

通过设置animation-play-state: paused;

```css
.stop {
    animation-play-state: paused;
}
```
```
 button.onclick = function () {
        if (this.value == '暂停') {
            image.classList.add('stop');
            this.value = '播放';
        } else {
            image.classList.toggle('stop')
            this.value = '暂停';
        }
    };
```

## 监听动画事件

```css
.life{
 animation: heart-burst steps(60) 1s infinite both;
}

 .stop {
    animation-play-state: paused;
}
@keyframes heart-burst {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
    // background-position: 100%;
  }
}
```

```js
image.addEventListener("webkitAnimationStart", function(){ //动画开始时事件 
	console.log("start"); 
}, false); 

//如果动画设置了infinite 将不会执行
image.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件 
	console.log("end"); 
}, false); 



image.addEventListener("webkitAnimationIteration", function(){ //动画重复运动时的事件
	console.log("webkitAnimationIteration"); //第一遍动画完成输出end
}, false);
```
