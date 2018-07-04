# vue 移动端屏蔽滑动的遮罩层

##  最简单的  `@touchmove.prevent`
vue提供的 `@touchmove.prevent` 可以用来阻止滑动，但是这个方法会对其内的子div的滑动事件也禁止掉了。

如果没有中间滑动需求，是一个很好的方法。
```html
<div class="overlayer" @touchmove.prevent >
</div>

$(document).on("touchmove",function(e) {
   e.preventDefault(); 
})

```
```
/*遮罩层*/
.overlayer{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:10;
}
```

## position: fixed
```css
body.modal-open {
    position: fixed;
    width: 100%;
}

```

如果只是上面的 css，滚动条的位置同样会丢失。

所以如果需要保持滚动条的位置需要用 js 保存滚动条位置关闭的时候还原滚动位置
```js
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');
```

而后在vue中点击和打开遮罩
```js
 openMarkBox(){
      this.openMark = true;
      ModalHelper.afterOpen();
    },
closeMarkBox(){
  ModalHelper.beforeClose();
  this.openMark = false;
}
```
