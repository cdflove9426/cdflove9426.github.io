# 移动端 fixed失效问题


## 监听事件后 重新设置属性
移动端虚拟键盘出现的条件是：文本框（文本类）获得焦点

弹出键盘后原先定位与底部的东西会被虚拟键盘顶上去，样式错乱！

苹果手机浏览器仿佛是将原来的`fixed`熟悉替换为 `absolute`

首先我们会想到监听focus和blur事件，但是会有bug，虚拟键盘有自带的收起键盘，这样输入框还是聚焦事件，并没有触发blur事件。所以会导致失效的。
```js
 windowInnerHeight = window.innerHeight; //获取当前浏览器窗口高度
$(window).resize(function(){
    if(window.innerHeight < windowInnerHeight){
        $('.footer').removeClass('footerss');
    }else{
        $('.footer').addClass('footerss');
    }
});

```


## 设置内容宽满屏滚动后，absolute
```html
<div class="main_comment">```````````````````</div>
<div class="commentBar">fixed宽</div>
```

```css
.main_comment{
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;   /*这句是为了滑动更顺畅*/
}
.commentBar{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  padding: 5px;
  z-index: 99;
}
```