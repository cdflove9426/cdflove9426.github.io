---
title: center_layout
tags:
  - null
date: 2017-02-08 21:35:05
category:
---

<!-- more -->
<!-- toc -->

# flexbox
 
```html
<style>
.container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.center {
	background: #BDD8F5;
	color: #000;
	text-align: center;
	font-size: 14px;
	padding: 10px
}
</style>
<div class="container">
	<div class="center">BigCan<br />公众号<br />infefe</div>
</div>

```

# postion + margin

```css
.container {
	position: relative;
}
.center {
	position: absolute;
	width: 100px;
	height: 100px;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
diaplay:table-cell
```

```css
.container{
    width: 200px;
    height: 200px;
    background: yellow;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.center{
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 100px;
    background: green;
}
```

# position加 transform


```css
.container {
    position: relative;
    background: yellow;
    width: 200px;
    height: 200px;
}
 
.center {
    position: absolute;
    background: green;
    top:50%;
    left:50%;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
    width: 100px;
    height: 100px;
}
display:flex;margin:auto
```


```css
.container {
    background: yellow;
    width: 200px;
    height: 200px;
    display: flex; 
}
 
.center {
    background: green;
    width: 100px;
    height: 100px;
    margin: auto;
}

```
# postion

```css
.container {
    background: yellow;
    width: 200px;
    height: 200px;
    position: relative;
}
/**方法一**/
.center {
    background: green;
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50px;
    top: 50px; 
  
}//这个要知道父级的宽高
/**方法二**/
.center {
    background: green;
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left:-50px;
    margin-top:-50px;
}
//这个要知道子的宽高

```

# 兼容低版本浏览器，不固定宽高

```html
<div class="table">
    <div class="tableCell">
        <div class="content">不固定宽高，自适应</div>
    </div>
</div>

```

```css
.table {
    height: 200px;/*高度值不能少*/
    width: 200px;/*宽度值不能少*/
    display: table;
    position: relative;
    float:left;
    background: yellow;
}      
 
.tableCell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;        
    *position: absolute;
    padding: 10px;
    *top: 50%;
    *left: 50%;
}
.content {
    *position:relative;
    *top: -50%;
    *left: -50%;
     background: green;
}

```