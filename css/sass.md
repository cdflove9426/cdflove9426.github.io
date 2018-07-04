# sass
```css
//定位上下左右居中
@mixin center  
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
// 背景图片地址和大小
@mixin bis($url) 
	background-image: url($url)
	background-repeat: no-repeat
	background-size: 100% 100%
```
听说现在很多sass的项目都用, 这个 [Bourbon](http://bourbon.io) - A Lightweight Sass Tool Set  


# sass文件组织
[Sass: Directory Structures That Help You Maintain Your Code](http://vanseodesign.com/css/sass-directory-structures/)
[知乎-你是如何去组织项目中的 Less/Sass 代码的](https://www.zhihu.com/question/35708352)

# sass 基础入门
[Sass 快速入门](http://ghmagical.com/article/page/id/ljjyDx1elX48)
[SASS官方文档](http://www.w3cplus.com/preprocessor/sass-chinese-reference.html)
[SASS参考手册](http://sass.bootcss.com/docs/sass-reference/)
[SASS基础——十个常见的Mixins](http://www.w3cplus.com/preprocessor/ten-best-common-mixins.html)
[SASS使用总结](http://www.cnblogs.com/Iona/p/5302476.html)

## 编程风格

 * nested：嵌套缩进的css代码，它是默认值。
 * expanded：没有缩进的、扩展的css代码。
 * compact：简洁格式的css代码。
 * compressed：压缩后的css代码。

## 变量
使用`$`

```css
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。(下次见到 别觉得神奇)

```css
　　$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}

### 变量的算法

```css
　　body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}
```

## 嵌套

```css
　div {
　　　　hi {
　　　　　　color:red;
　　　　}
　　}


　a {
　　　　&:hover { color: #ffb3ff; }
　　}
```

## 注释
SASS共有两种注释风格。
- 标准的CSS注释 /* comment */ ，会保留到编译后的文件。
- 单行注释  // comment，只保留在SASS源文件中，编译后被省略。

- "重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

```css
　　/*! 
　　　　重要注释！
　　*/

```

## 导入文件

@import命令，用来插入外部文件。

```css
　　@import "path/filename.scss";
```
**如果插入的是.css文件，则等同于css的import命令。**
　　@import "foo.css";

## 代码重用

### @extend

SASS允许一个选择器，继承另一个选择器。比如，现有class1：

```css
　　.class1 {
　　　　border: 1px solid #ddd;
　　}
```

class2要继承class1，就要使用@extend命令：
```css
　　.class2 {
　　　　@extend .class1;
　　　　font-size:120%;
　　}
```

### @mixin 混合指令 

使用@mixin命令，定义一个代码块。

```css
　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}
```

使用@include命令，调用这个mixin。

```css
　　div {
　　　　@include left;
　　}
```

**向混合样式中导入内容** (Passing Content Blocks to a Mixin)
在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 @content标志的地方：

```css
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

编译为

```css
* html #logo {
  background-image: url(/logo.gif);
}
```


**指定参数**

```css
　@mixin left($value: 10px) {
　　　　float: left;
　　　　margin-right: $value;
　　}
<!--使用的时候，根据需要加入参数：-->
　　div {
　　　　@include left(20px);
　　}
```


## 颜色函数

```css
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
```

## !default
!defalt  表示默认值

# sass 高级用法

## 条件语句
@if可以用来判断：

```css
　　p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}

```


配套的还有@else命令：

```css
　　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
````

## 循环

### @for 
```css
@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　}
　　}
```

### @while

```css
　$i: 6;
　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }

　　　　$i: $i - 2;
　　}
``` 

### @each

each命令，作用与for类似：

```css
　　@each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```

## 自定义函数

```css
　@function double($n) {
　　　　@return $n * 2;
　　}
　　#sidebar {
　　　　width: double(5px);
　　}
```

# sass 面向对象css - 使用%

```css
%button {
  min-width: 100px;
  padding: 1em;
  border-radius: 1em;
}
%twitter-background {
  color: #fff;
  background: #55acee;
}
%facebook-background {
  color: #fff;
  background: #3b5998;
}

.btn {
  &--twitter {
    @extend %button;
    @extend %twitter-background;
  }
  &--facebook {
    @extend %button;
    @extend %facebook-background; 
  }
}
```
 
# sass 与媒体查询

通过@mixin 编写媒体查询语句
[Mixin to Manage Breakpoints](https://css-tricks.com/snippets/sass/mixin-manage-breakpoints/)
[使用Sass之更高级的媒体查询](https://www.w3ctrain.com/2015/12/02/sass-media-query/)

[Write Simple, Elegant and Maintainable Media Queries with Sass](https://davidwalsh.name/sass-media-query)
[SASS mixins I’m using right now](https://medium.com/the-web-crunch-publication/sass-mixins-im-using-right-now-f88f39bfa5b5#.7pxwcqwbs)

通过以上链接，以及
[如何实现 font-size 的响应式](https://gold.xitu.io/post/57c6d8305bbb500063570662)

**使用 编辑好的媒体查询语句 ,来编辑通过font-size的响应式。因为我们不希望，每次改变窗口, root 的font-size 的有变化，而是通过一个临界值来进行变化。**

## 通过@mixin 编写媒体查询语句

**定义**

```css
//定义好节点后
$breakpoints: (
  "sm" :  767px,
  "md": 992px,
  "lg":  1200px
) !default;



@mixin resp($breakpoint) {
  // If the key exists in the map
  @if map-has-key($breakpoints, $breakpoint) {
    // Prints a media query based on the value
    @media (max-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
 
  // If the key doesn't exist in the map
  @else {
    @warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Available breakpoints are: #{map-keys($breakpoints)}.";
  }
}
```


**使用**

```css
@import 'response/config.scss';
body {
 
    @include resp(md) {
        color: blue
    }
   
    @include resp(sma) {
        color: lawngreen;
    }
}

```


## 升级使用
通过@mixin 虽然方便了，但配置起来也显得繁琐。

>Sass媒体查询应该是这样
1. 动态，可定义，可以随意增加断点
2. 简洁，自然的语法，可以使用 <=,>=, >,< 比如@include media(">minWidth")
3. 自由组合，临时定义断点，可以组合多个断点，也可以临时自定义断点，比如@include media(">tablet", "<1280px")


请看
Eduardo Bouças和Hugo Giraudel的开源作品-- [include-media](http://include-media.com/)


结合 `include-media`

```css
//config.scss


 @mixin responsive($width) {
        @if $width==sm {
            @include media(">phone", "<=tablet") {
                @content;
            }
        }
        @else if $width==md {
            @include media(">tablet", "<=desktop") {
                @content;
            }
        }
        @else if $width==lg {
            @include media(">desktop" ) {
                @content;
            }
        } 
        //@else {
        //@warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        //+ "Available breakpoints are: #{map-keys($breakpoints)}.";
        //}
}


//index.scss
@import 'response/include_media.scss';
@import 'response/config.scss';

body {
    @include responsive(sm){
           color: blue
    }
    @include responsive(md){
           color: red
    }
    @include responsive(lg){
           color: lightyellow
    }
}
```

最后生成

```css
@media (min-width: 321px) and (max-width: 768px) {
  body {
    color: blue; } }

@media (min-width: 769px) and (max-width: 1024px) {
  body {
    color: red; } }

@media (min-width: 1025px) {
  body {
    color: lightyellow; } }
```

# 实践
## 使用SASS多值变量： list && map
## list
```css
// 将背景颜色值定义成变量
$red : #FF0000;
$orange : #FFA500;
$yellow : #FFFF00;
$green : #008000;
$bluegreen : #00FFFF;
$blue : #0000FF;
$purple : #800080;

// 定义一个list储存背景颜色
$bgcolorlist: $red $orange $yellow $green $bluegreen $blue $purple;

// 使用SASS for循环语句为每一个li设置background-color
@for $i from 1 to length($bgcolorlist)+1 {
    #main-container ul li:nth-child(#{$i}) {
        background-color: nth($bgcolorlist,$i);
    }
}
```

## map
```css
$red : #FF0000;
$orange : #FFA500;
$yellow : #FFFF00;
$green : #008000;
$bluegreen : #00FFFF;
$blue : #0000FF;
$purple : #800080;

//将背景颜色以键值对的形式存在map中
$bgcolorlist : (
    1: $red,
    2: $orange,
    3: $yellow,
    4: $green,
    5: $bluegreen,
    6: $blue,
    7: $purple);

// 使用SASS each语法为每一个li设置background-color
@each $i, $color in $bgcolorlist {
    #main-container ul li:nth-child(#{$i}) {
        background-color: $color;
    }
}
```
[lee_magnum 的笔记](http://blog.csdn.net/lee_magnum/article/details/12652403)
```css
$sprite: long1 long2 long3 long4 long5 !default;  
  
%spriteAll{  
    background: url('menglong.png') no-repeat;  
}  
  
@each $one in $sprite {  
    .#{$one}-two {  
        @extend %spriteAll;       
        background-position:0 index($sprite,$one)*(-30px);  
    }  
}  
```

## 循环数组对象
```css

$stars: (
  (size: 40px, left: 22px, top: 97px),
  (size: 32px, left: 42px, top: 70px),
  (size: 31px, left: 464px, top: 273px),
  (size: 28px, left: 240px, top: 402px),
  (size: 25px, left: 289px, top: 557px)
);



@for $i from 1 through length($stars) {
  $item: nth($stars, $i);
  
  &:nth-child(#{$i}) {
    width: map-get($item, size);
    height: map-get($item, size);
    left: map-get($item, left);
    top: map-get($item, top);
  }
}
```
