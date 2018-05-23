---
title: autoHiding_nav
tags:
  - js
  - requestAnimationFrame
date: 2017-02-09 10:13:17
category:
---

<!-- more -->
<!-- toc -->


# 使用requestAnimationFrame进行优化

[Auto-Hiding Navigationtext](https://codyhouse.co/gem/auto-hiding-navigation/)

```js
var scrolling = false;
$(window).on('scroll', function(){
	if( !scrolling ) {
		scrolling = true;
		(!window.requestAnimationFrame)
			? setTimeout(autoHideHeader, 250)
			: requestAnimationFrame(autoHideHeader);
	}
});
```

```js
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


# 简单直接的兼容性写法
```js
var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
        || window[vp + 'CancelRequestAnimationFrame']);
    }
```

