# SVG  &SVG动画
 

<!-- more -->

[SVG基础教程(超级详细)](https://segmentfault.com/a/1190000012071386)
[SVG 参考手册](http://www.runoob.com/svg/svg-reference.html)

SVG的基础使用以及 SVG动画
并介绍一些SVG插件的使用
<!-- toc -->
svgtrick  每天都有的学习
# svg插件
[HTML5 SVG图形轮廓线条绘制动画插件-vivus](http://www.htmleaf.com/html5/SVG/201501261279.html)
[SVG实现描边动画](http://www.tuicool.com/articles/RJNzeur)

比较炫的字体动画
https://github.com/codrops/AnimatedLetters/
http://www.tuicool.com/articles/jIrqi2
[实现SVG线动画](http://www.tuicool.com/articles/VfEbEvN)



[低多边形生成器](http://qrohlf.com/trianglify-generator/)
[XXX生成器](http://berjon.com/quasi/)
[20 个有用的 SVG 工具](http://www.oschina.net/translate/20-useful-svg-tools-for-better-graphics)

[将图片转化为带path 的svg ----vector magic ](http://www.pc6.com/softview/SoftView_49725.html)
(这工具要钱的。。用绿色版就好)


[SVG 入门](https://segmentfault.com/a/1190000008172279)
# SVG
## 一、栅格图形和矢量图形

>栅格图形：也称位图，图像由一组二维像素网格表示。
Canvas 2d API 就是一款栅格图形 API。通过 Canvas API 绘制图形，其实是更新 Canvas 的像素。PNG 和 JPEG 是两种栅格图形的格式。即 PNG 和 JPEG 图像中的数据也同样代表着像素。

>矢量图形：图像由数学描述的几何形状表示。矢量图像包括使用高级几何形状（比如线和形状）绘制图像所需的全部信息。
SVG 是矢量图形的一种，同 HTML 一样，SVG 是一种文件格式，有自己的 API。SVG 同 DOM API 结合形成了一种矢量图形 API。尽管可以将 PNG 等栅格图形嵌入到 SVG 中，但从根本上讲，SVG 是一种矢量格式。

## 二、理解 SVG

SVG 的本质特征是它基于 XML。HTML5 引入了内连 SVG，所以 SVG 元素可以直接出现在 HTML 标记中。
**SVG 和 Canvas 的重要差异：**
1. SVG 绘制的文本可选，而 Canvas 不能（因为 Canvas 文本用像素绘制，是图像的一部分）；
2. SVG 上的文本是可搜索的，Canvas 上的文本无法被搜索引擎获取。

HTML 是用来定义页面结构的声明性语言，而 SVG 是用来创建视觉结构的语言。通过 DOM API ，你可以与 SVG 和 HTML 进行交互。SVG 文档是元素构成的树状结构，同 HTML 一样，它支持脚本操作和添加样式，还可以向 SVG 元素添加事件处理函数。
图形 API 设计方面存在两个派系：
一是即时模式（immediate-mode）：图形提供了绘图接口，由 API 接口调用引起的绘制行为会即时发生。如 Canvas。
二是保留模式(retained-mode)：在保留模式图形中，有一个与场景中的视觉对象对应的模型，它会随着时间的推移而保留下来。可以使用 API 操作场景图形，当其改变时，图形引擎会重绘场景。SVG 是一种保留模式图形，其场景图形就是文档。用于操作 SVG 的 API 是 W3C DOM API。

SVG 文档在呈现时会保留构成它的矢量信息，缩放 SVG 时，渲染程序会立即重绘所有构成图像的线条。所以，缩放 SVG 不会导致其质量下降。而 Canvas 缩放时图像会模糊，原因是图像由像素组成，且只能在更高分辨率下重新采样。

# 在页面中使用SVG

## 静态图像的方式引用
```html
<img src="example.svg">
```

弊端： SVG 文档不能像内联 SVG 内容那样集成到 DOM 中，即无法编写与 SVG 元素进行交互的脚本。

## 内联方式
```
<svg width="200" height="200">
         <rect x="10" y="10" width="100" height="80" stroke="red" fill="#ccc" />
        <circle cx="120" cy="80" r="40" stroke="#00f" fill="none" stroke-width="8" />
    </svg>
```

# svg 画各种图案

[HTML5之SVG 2D入门2—图形绘制(基本形状)介绍及使用](http://www.jb51.net/html5/72250.html)
```html
<svg width="200" height="250">
<rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
<circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
<ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>
<line x1="10" x2="50" y1="110" y2="150" stroke="orange" fill="transparent" stroke-width="5"/>
<polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
stroke="orange" fill="transparent" stroke-width="5"/>
<polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
stroke="green" fill="transparent" stroke-width="5"/>
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```

 




# SVG的渲染顺序
> SVG是严格按照定义元素的顺序来渲染的，这个与HTML靠z-index值来控制分层不一样。在SVG中，写在前面的元素先被渲染，写在后面的元素后被渲染。后渲染的元素会覆盖前面的元素，虽然有时候受透明度影响，看起来不是被覆盖的，但是SVG确实是严格按照先后顺序来渲染的。


# SVG基础

SVG是一种矢量图格式，具体格式或者嵌到页面是怎么样的请自行查询，下面说一下他这个动画是咋个实现法

```html
<svg id="super" x="0px" y="0px" width="293px" height="200px" viewBox="0 0 293 200">
    <path fill="none"   stroke="#00ffff" stroke-width="1" d="M67.667,39.667c0,0-33.334,17.333-46.667,36.667
        c0,0,33.007,40.458,43.331,50.018c19.419,17.982,65.002,55.316,82.169,59.982c0,0,27.834-11.334,49.834-30.667S249,113,261,100
        s9.334-12.333,15.334-22.333c0,0-21.333-29.333-44-38c0,0-162.001-5.334-163.334-2.667"/>
    <path fill="00ffff"   stroke="#ffffff" stroke-width="1" d="M169.667,50.333c0,0-71.334-2.667-74.667,8.667s42,14,42,14
        s55.333,4.667,60,6.667s32.668,7.254,43.334,31.627L255,93.667C255,93.667,217,59,169.667,50.333z"/>
    <path fill="none"   stroke="#ffffff" stroke-width="1" d="M75.667,123c0,0,42,8,78,8.667s32.667,10.667,32.667,10.667
        S185.333,155,146.5,153.667S75.667,123,75.667,123z"/>
    <path fill="none"   stroke="#ffffff" stroke-width="1" d="M45,93c0,0-12.667-24,34-48h-8.667c0,0-35.455,24.559-36,35.677L45,93
        z"/>
    <path fill="none"   stroke="#ffffff" stroke-width="1" d="M174.912,161c0,0-24.745,12.999-24.745,12.333
        s-15.25-4.249-20.583-10.416"/>
    <path fill="none" stroke-width="1" d="M130,162.667c0,0,1.75-3.083,13.667-1.25c0,0,30,0.836,30.75-0.582"/>
    <path fill="none" stroke-width="1" d="M177.75,43L224,45.5c0,0,7.5,12.125-13,8.625S177.75,43,177.75,43z"/>
    <path fill="none"   stroke="#ffffff" stroke-width="1" d="M237.25,52c0,0,2.75,20.375,21.875,35.625l5.75-6.948
        C264.875,80.677,249.273,55.266,237.25,52z"/>
</svg>

```
<path>
fill="none"
stroke="#00ffff"
stroke-width="1"
<set>实现基本的延迟功能,在这个标签上可以设置
<animate>实现单属性的动画过渡效果，需在标签上设置属性
<animateTransform>这里的transform变换与CSS3的transform变换都是一个路数
<animateMotion>可以让SVG各种图形沿着特定的path路径运 

使用css给svg 添加样式

**stroke-dasharray**：就是把线条断开为虚线，把stroke-dasharray设置为10，它就变成虚线了，数值越大，线就越长

**stroke-dashoffset**：就是设置线条的偏移，设置了这个值后，线段就会偏移相应的值，我们要实现动画只要动态改变这个偏移值就好，那样线条就会动起来了
**stroke-miterlimit**：这个和canvas中的一样，它处理什么时候画和不画线连接处的miter效果。

```css
.test_Svg {
    path {
        stroke: #000;
    }
    #path_a {
        stroke-dasharray: 1;
    }
    #path_b {
        stroke-dasharray: 1 2;
    }
    #path_c {
        stroke-dasharray: 1 2 3;
    }
}

/*
path {
    stroke: #000;
    stroke-dasharray: 20px;
    stroke-dashoffset: 20px;
    animation: act 1s linear infinite alternate;
}
*/
@keyframes act {
    100% {
        stroke-dashoffset: 0;
    }
}

```

```html
<svg class="test_Svg" width=300 height=300 viewbox="0 0 30 30">
    <path id="path_a" d="M 5 10 L 25 10"></path>
    <path id="path_b" d="M 5 15 L 25 15"></path>
    <path id="path_c" d="M 5 20 L 25 20"></path>
</svg>
 
```

设置path路径描边颜色
```
path {
        stroke: #000;
    }
```

# 线
 stroke-linecap 线的端点 -属性 
- butt
- square 
- round




# svg  text
< text > 标签 在svg中添加文本

属性 ： x , y , text-anchor('middle','start','end')