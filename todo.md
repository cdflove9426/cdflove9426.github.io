
[微信h5页面开发遇到的坑](https://www.qdfuns.com/article/13989/8fed58c72fd4be96e5fa3a9429ccea2a.html

[vue-cli中vue-scroller的详细用法，上拉加载下拉刷新,vue-axios获取数据的详细过程](https://www.jianshu.com/p/31ad32e7ec13)


[hbxywdk](https://github.com/hbxywdk)
[Hera-打通小程序,Web,iOS,Android的全平台混合框架](https://aotu.io/notes/2016/11/08/first-mobile-rebuild/)
[你真的知道怎么用 javascript 来写一个倒计时吗 ?](https://juejin.im/entry/5849186a128fe1006c73b0f3)

[Web 端 实现 app “输入验证码 ”的效果](https://juejin.im/post/5acc3a3f51882555867fbe8a)

[3D 视差效果](https://orangexc.xyz/2016/12/20/3D-parallax-effect/)

[Vue页面骨架屏](https://segmentfault.com/a/1190000014963269?utm_source=channel-hottest)

[HTML5 进阶系列：indexedDB 数据库](https://juejin.im/post/59013d2c0ce46300614ebe70)

[别人的案例 不错](https://github.com/lin-xin/blog)
# webpack

[提高 webpack 构建 Vue 项目的速度](https://github.com/lin-xin/blog/issues/10)

# Vue
[当面试官问你Vue响应式原理，你可以这么回答他](https://juejin.im/post/5adf0085518825673123da9a)
[浅谈使用 Vue 构建前端 10w+ 代码量的单页面应用开发底层](https://juejin.im/post/5b29c3bde51d45588d4d7110#heading-32)

# koa2
[Koa2 之文件上传下载](https://juejin.im/post/5abc451ff265da23a2292dd4)


# gulp 
[gulp自动化压缩合并、加版本号解决方案](https://github.com/lin-xin/blog/issues/1)
# websocker
[WebSocket：5分钟从入门到精通](https://juejin.im/post/5a4e6a43f265da3e303c4787)

# css
[纯 CSS 实现波浪效果](https://juejin.im/entry/596d7e8a5188254b7b53db03)


# Canvas
[HTML5 进阶系列：canvas 动态图表 #15](https://github.com/lin-xin/blog/issues/15)
[移动端图片上传旋转、压缩的解决方案](https://juejin.im/post/595599e75188250d99181801)
qunaer 网 
border.css
```css
ellipsis()
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
```
```css
@charset "utf-8";
.border,
.border-top,
.border-right,
.border-bottom,
.border-left,
.border-topbottom,
.border-topleft,
.border-topright,
.border-rightleft,
.border-rightbottom,
.border-bottomleft {
    position: relative;
}
.border::before,
.border-top::before,
.border-right::before,
.border-bottom::before,
.border-left::before,
.border-topbottom::before,
.border-topbottom::after,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::before,
.border-topleft::after,
.border-rightbottom::before,
.border-rightbottom::after,
.border-topright::before,
.border-topright::after,
.border-bottomleft::before,
.border-bottomleft::after {
    content: "\0020";
    overflow: hidden;
    position: absolute;
}
/* border
 * 因，边框是由伪元素区域遮盖在父级
 * 故，子级若有交互，需要对子级设置
 * 定位 及 z轴
 */
.border::before {
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-top::before,
.border-bottom::before,
.border-topbottom::before,
.border-topbottom::after,
.border-topleft::before,
.border-rightbottom::after,
.border-topright::before,
.border-bottomleft::before {
    left: 0;
    width: 100%;
    height: 1px;
}
.border-right::before,
.border-left::before,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::after,
.border-rightbottom::before,
.border-topright::after,
.border-bottomleft::after {
    top: 0;
    width: 1px;
    height: 100%;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    border-top: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-right::before,
.border-rightbottom::before,
.border-rightleft::before,
.border-topright::after {
    border-right: 1px solid #eaeaea;
    transform-origin: 100% 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::before {
    border-bottom: 1px solid #eaeaea;
    transform-origin: 0 100%;
}
.border-left::before,
.border-topleft::after,
.border-rightleft::after,
.border-bottomleft::after {
    border-left: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    top: 0;
}
.border-right::before,
.border-rightleft::after,
.border-rightbottom::before,
.border-topright::after {
    right: 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::after {
    bottom: 0;
}
.border-left::before,
.border-rightleft::before,
.border-topleft::after,
.border-bottomleft::before {
    left: 0;
}
@media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {
    /* 默认值，无需重置 */
}
@media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49),
 (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49),
 (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49),
 (min-resolution: 144dpi) and (max-resolution: 239dpi),
  (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {
    .border::before {
        width: 200%;
        height: 200%;
        transform: scale(.5);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.5);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.5);
    }
}
@media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {
    .border::before {
        width: 300%;
        height: 300%;
        transform: scale(.33333);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.33333);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.33333);
    }
}

```
