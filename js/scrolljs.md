滚动到顶部：

$('.scroll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
滚动到指定位置：

$('.scroll_a').click(function(){$('html,body').animate({scrollTop:$('.a').offset().top}, 800);});
滚动到底部：

$('.scroll_bottom').click(function(){$('html,body').animate({scrollTop:$('.bottom').offset().top}, 800);});

[vue ](https://blog.csdn.net/bbsyi/article/details/77897776)

[scrollTop animation without jquery [duplicate]](https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery)

如果使用 JQ

```js
$("#go-to-top").click(function() {
  $("html,body").animate({ scrollTop: 0 }, 400);
  return false;
});
```

without JQ

```html
<button onclick="scrollToTop(1000);"></button>
```

1# JavaScript (linear):

```js
function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
    scrollInterval = setInterval(function() {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval);
    }, 15);
}
```

2# JavaScript (ease in and out):

```js
function scrollToTop(scrollDuration) {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (scrollDuration / 15),
    cosParameter = scrollHeight / 2;
  var scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(function() {
      if (window.scrollY != 0) {
        scrollCount = scrollCount + 1;
        scrollMargin =
          cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
}
```

```js
function scrollToTop(scrollDuration) {
  var cosParameter = window.scrollY / 2,
    scrollCount = 0,
    oldTimestamp = performance.now();
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    window.scrollTo(
      0,
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    );
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}
```
