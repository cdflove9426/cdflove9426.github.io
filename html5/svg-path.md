# SVG-path 路径动画
 

<!-- more -->
<!-- toc -->

http://www.open-open.com/news/view/194a7b0
[深度掌握SVG路径path的贝塞尔曲线指令](http://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/)
https://jsfiddle.net/m1erickson/5v5hmo62/


遮罩字体
http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201502081349.html
# SVG+JS path等值变化实现CSS3兴叹的图形动画 

[实现SVG线动画](http://www.tuicool.com/articles/VfEbEvN)
[SVG+JS path等值变化实现CSS3兴叹的图形动画](http://www.zhangxinxu.com/wordpress/2014/06/svg-path-d-polyline-points-bezier-curves/)
[将图片转化为带path 的svg ----vector magic ](http://www.pc6.com/softview/SoftView_49725.html)
(这工具要钱的。。用绿色版就好)

[SVG Drawing Animation](https://tympanus.net/Development/SVGDrawingAnimation/index2.html)
[vivus](http://maxwellito.github.io/vivus/)


# 属性
**stroke-dasharray**：就是把线条断开为虚线，把stroke-dasharray设置为10，它就变成虚线了，数值越大，线就越长

**stroke-dashoffset**：就是设置线条的偏移，设置了这个值后，线段就会偏移相应的值，我们要实现动画只要动态改变这个偏移值就好，那样线条就会动起来了

利用@keyframes实现动态描边

```css
@keyframes describe{
  from{
    stroke-dashoffset: 1000;
    opacity: 1;
  }
  to{
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
```


# DEMO
```css
 .super_logo{
        position: absolute;
        opacity: 0;
        animation:fadeIn 1s ease-in  forwards;
            -webkit-animation:fadeIn 1s ease-in  forwards;
    }
    #super{
      // display: none;
        position: absolute;
        z-index: 1;
        stroke-dasharray: 800;
          stroke-dashoffset: 1000;
        animation: describe 2s forwards;
            -webkit-animation: describe 2s forwards;
    }
    @keyframes fadeIn{
        from{opacity: 0;}
        80%{opacity: 0.5;}
        to{opacity: 1;}
    }
    @-webkit-keyframes fadeIn{
        from{opacity: 0;}
        80%{opacity: 0.5;}
        to{opacity: 1;}
    }
    @keyframes describe{
        from{
            stroke-dashoffset: 1000;
            opacity: 1;
        }
        
        to{
            stroke-dashoffset: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes describe{
        from{
            stroke-dashoffset: 1000;
            opacity: 1;
        }
        to{
            stroke-dashoffset: 0;
            opacity: 0;
        }
    }

body{
  background:#0f1a3a;
}
```
```html
<img src="http://images2015.cnblogs.com/blog/754767/201606/754767-20160606165217980-1558570494.gif" alt="super" class="super_logo">
<svg id="super" x="0px" y="0px" width="293px" height="200px" viewBox="0 0 293 200">
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M67.667,39.667c0,0-33.334,17.333-46.667,36.667
        c0,0,33.007,40.458,43.331,50.018c19.419,17.982,65.002,55.316,82.169,59.982c0,0,27.834-11.334,49.834-30.667S249,113,261,100
        s9.334-12.333,15.334-22.333c0,0-21.333-29.333-44-38c0,0-162.001-5.334-163.334-2.667"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M169.667,50.333c0,0-71.334-2.667-74.667,8.667s42,14,42,14
        s55.333,4.667,60,6.667s32.668,7.254,43.334,31.627L255,93.667C255,93.667,217,59,169.667,50.333z"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M75.667,123c0,0,42,8,78,8.667s32.667,10.667,32.667,10.667
        S185.333,155,146.5,153.667S75.667,123,75.667,123z"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M45,93c0,0-12.667-24,34-48h-8.667c0,0-35.455,24.559-36,35.677L45,93
        z"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M174.912,161c0,0-24.745,12.999-24.745,12.333
        s-15.25-4.249-20.583-10.416"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M130,162.667c0,0,1.75-3.083,13.667-1.25c0,0,30,0.836,30.75-0.582"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M177.75,43L224,45.5c0,0,7.5,12.125-13,8.625S177.75,43,177.75,43z"/>
    <path fill="none" data-duration="60" stroke="#ffffff" stroke-width="1" d="M237.25,52c0,0,2.75,20.375,21.875,35.625l5.75-6.948
        C264.875,80.677,249.273,55.266,237.25,52z"/>
</svg>

```



 
# 路径长度获取
```html

一道闪电
<svg width="580" height="400">
    <path d="m262.59622,90.56177l34.74561,60.80042l-14.32703,7.17541l43.75135,52.09264l-14.32061,8.69967l54.08581,87.23186l-91.73919,-66.84884l17.49797,-9.28344l-57,-42.81731l20.425,-13.23194l-60.18379,-44.91723l67.06487,-38.90124z">
</svg>
 
```

```css
path {
    stroke: #000;
    fill: transparent;
    stroke-width: 1.5px;
}
@keyframes act {
    100% {
        stroke-dashoffset: 0;
    }
}
```

```js
var char = 'http://www.w3.org/2000/svg',
    path = document.getElementsByTagNameNS(char, 'path')[0],
    len = path.getTotalLength(); //获得路径总长度

path.style.strokeDasharray = len;
path.style.strokeDashoffset = len;
path.style.animation = 'act 2s linear forwards';
```
![一道闪电](http://img1.tuicool.com/y6faEzm.gif)


# 使用 SVG 来制作 Morphing 动画效果
通过anime.js 文件进行动画。
[使用 SVG 来制作 Morphing 动画效果](http://svgtrick.com/tricks/ca1b01c1d3649dc7ddf6d21dba1ee245?utm_source=browser&utm_medium=push_notification&utm_campaign=PushCrew_notification_1491760631&pushcrew_powered)
