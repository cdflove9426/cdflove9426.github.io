# ES6 promiss & es6-polyfill

其实是android

> Are you polyfilling Promise? Maybe Android doesn't have native support.

[axios not work on android 4.4.2 #188](https://github.com/axios/axios/issues/188)
['Promise' is undefined #4254](https://github.com/webpack/webpack/issues/4254)

using [es6-promise](https://www.npmjs.com/package/es6-promise) as a polyfill.


# es6-promise与es6-promise.auto的区别与使用

es6-promise.auto会检测Promise是否存在，若存在原生的Promise，则不执行；
否则会应用polyfill;

html文档中加入 polyfill文件就可以了
```html
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script src="./static/es6-promise4.auto.min.js"></script>
```

# flex在安卓4.3中的兼容方式

经过了一番实践和一些基本的兼容处理，至少在移动端flexbox还是有可为的（安卓4.0+，2.3+没测试，ios都还行）。但是坑也确实还有很多。
1，flexbox有多个版本，在低版本安卓下实行的是09年的旧版标准Flexible Box Layout Module
这个标准需要添加-webkit-前缀。其余的实行的是新的flexbox标准CSS Flexible Box Layout Module Level 1，其中ios9以下Safari需要添加-webkit-前缀。
2，旧版flexbox标准各浏览器支持属性有限，**比如说不支持flex-wrap等**。所以如果考虑兼容性的话需要只使用旧版标准中浏览器可以支持的属性。
3，还是旧版的问题，旧版的使用比例伸缩布局时会导致盒子内容大小不等会导致无法‘等分’等布局。这个时候需要设置width:0%;等把原始大小设置成0。
4，依旧是旧版的问题，旧版的box item要求属性是块级结构，所以很多inline元素需要设置display：block等才能显示正常


主要还是 flex-wrap无法自动换行的问题
其他就交给`posscss-load`


## gulp 中的写法

```js

gulp.task('css', function () {
    gulp.src(['./src/css/*.css'])
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
        .pipe(postCss([
            autoprefixer({
                browsers: ['last 4 version','Android >= 4.0'],//添加浏览器最近的四个版本需要的前缀，兼容安卓4.0以上版本
                cascade: false,//是否美化属性,默认true
                remove: true//移除不必要的前缀
            }), cssNext()]))
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));

```


webpack 

postcss.config.js 或者 .postcssrc.js 文件
```js
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      
        browsers: ['last 4 version','Android >= 4.2'],//添加浏览器最近的四个版本需要的前缀，兼容安卓4.0以上版本
   
    
    }
  }
}


```
