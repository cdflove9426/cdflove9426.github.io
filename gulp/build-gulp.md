---
title: build_gulp
date: 2016-12-17 10:39:18
tags: 
- build
- gulp
categories:

---



# gulp的使用以及项目构建

[gulp-stsrt](https://github.com/vigetlabs/gulp-starter)
[Building With Gulp](https://www.smashingmagazine.com/2014/06/building-with-gulp/)
[Gulp开发教程（翻译）](https://www.w3ctech.com/topic/134)
[gulp文件的匹配规则以及一些文件匹配技巧](http://www.cnblogs.com/2050/p/4198792.html)

<!-- more -->

[gulp插件推荐，无敌好用](http://blog.csdn.net/fspwz/article/details/50524721)
[gulp使用小结)](http://www.cnblogs.com/Darren_code/p/gulp.html)
# 其他

------------

用es6 写gulp 
[Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/)
[有人用es6写 gulp 文件?!!](https://segmentfault.com/a/1190000004136053?_ea=503811)
[gulp-es6-webpack-example](https://github.com/tiagorg/gulp-es6-webpack-example/blob/master/gulpfile.babel.js)
 

# 使用gulp4 ,babel
安装gulp4
```bash
npm install gulpjs/gulp.git#4.0  --save-dev
npm install gulp-cli --save-dev
```
Gulp3和Gulp4都能使用独立出来的命令行工具。

如果你不想在你的项目中使用npm scripts，你需要使用-g替换-save-dev来进行全局安装。现在你就可以像以前一样使用gulp命令了，但是你应该会得到一个错误信息，因为你需要更新你的gulpfile.js来兼容最新版的Gulp。

[【译】相对完整的Gulp4升级指南](https://segmentfault.com/a/1190000005357048)


## 插件
[browsersync](http://www.browsersync.cn/docs/gulp/)



css
 - 压缩[cssnano](https://github.com/ben-eb/cssnano)
 autoprefixer


 img

 用这个更好
 [gulp-image](https://www.npmjs.com/package/gulp-image)
  -[gulp教程之gulp-imagemin](http://www.ydcss.com/archives/26)


## sourcemaps
gulp-sourcemaps
```js
import sourcemaps from 'gulp-sourcemaps';

gulp.task('babel',function(){
    return gulp.src('./src/assest/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())  //babel转码
    // .pipe( gulp.dest(disJsPath) )
    // .pipe(uglify())  //压缩
    // .pipe(rev()) 
    .pipe( sourcemaps.write('../maps'))    //将maps 生成到别处
    // .pipe( sourcemaps.write('.'))   //将maps 生成与文件同个地址
    // .pipe( sourcemaps.write(''))   //内联到文件中
    
    .on("error", notify_errHandle)
    .pipe( gulp.dest('./dist/assest/js') )
   
      .pipe(browserSync.reload({
        stream: true
    }));
});

```


### 雪碧图

**gulp.spritesmith-multi **(根据文件夹生成多个图)、


[gulp.spritesmith 教程](https://segmentfault.com/a/1190000007121606)
[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith)
[gulp.spritesmith 同过其他插件生成多个图](http://stackoverflow.com/questions/33552027/gulp-make-sprites-by-folder/33555401#33555401)

```javascript
gulp.task('spritesmith',['clean'],function(){
    return gulp.src('src/spriteTest/images/*.png')
            .pipe(spritesmith({
                imgName:'images/sprite20161010.png',  //保存合并后图片的地址
                cssName:'css/sprite.css',   //保存合并后对于css样式的地址
                padding:20,
                algorithm:'binary-tree',
                cssTemplate:"src/spriteTest/handlebarsStr.css"
            }))
            .pipe(gulp.dest('//雪碧图gulp.spritesmith
```

gulp.spritesmith-multi 的使用
gulp.spritesmith-multi 给予gulp.spritesmith  说以大部分配置都是共同的

默认配置为

```javascript
var options = {
  imgName: sprite + '.png',
  cssName: sprite + '.css',
  cssTemplate: builtin.css,
  cssSpritesheetName: 'sp-' + sprite,
}
 
```

作者提供的修改配置的方法为：

```javascript

 // Generate our spritesheet 
  var spriteData = gulp.src('default/**/*.png')
    .pipe(spritesmith({
      spritesmith: function (options) {
        options.imgPath = '../images/' + options.imgName //在css中的图片地址 
      }
    }))
```

>options.imgPath 这个属性很重要啊 因为每个项目可能文件架构等不同，css和图片的位置不一样 或者说 我是想把图片放上7牛云？？ 那也是说不定的。



### Gulp+fontspider按需压缩中文字体
[字蛛](http://font-spider.org/)
[Gulp+fontspider按需压缩中文字体](http://www.jianshu.com/p/666c83666636)


# MD5 和静态文件上传到cdn

[text](http://blog.csdn.net/cczhumin/article/details/50990726)


# 区分开发模式和生产模式

```javascript
var gulp = require('gulp');
gulp.task('env:dev', function () {
    return process.env.NODE_ENV ='development' ;
});

gulp.task('env:build', function () {
    return process.env.NODE_ENV = 'production';
});
```

在gulpfile.js 中引用

```javascript

gulp.task('default', ['env:dev','ejs','sass','javascript','watch'], function() {
    console.log("default");
});


gulp.task('build', ['env:build','ejs','sass','javascript','watch'], function() {
    console.log("default");
});
```

在task中应用

```javascript
process.env.NODE_ENV  //

```


# 关于触发bowerSync自动刷新的一些疑问和解决方法
gulp 中通过watch 方法监控文件


bowersync.js

```javascript

var browserSync = require('browser-sync').create()

module.exports = browserSync
```


watch.js

```javascript

var browserSync = require('./bowersync');

 //sass
  gulp.watch(config_sass.paths.src ,  ['sass'],function (event) { browserSync.reload(); });

//   ejs
  gulp.watch([
        config_ejs.paths.src,
        config_ejs.paths.json],  ['ejs'])
     .on('change',handle);

```

sass 直接在watch方法中添加触发函数，可以在执行完 `sass`流程后 除非刷新

ejs 如果使用和sass一样的方法 ，没有触发。 
改为通过 `on`方法后，可以出发刷新操作。但 `on`方法是在进行 ejs流程 中 同时进行刷新。导致 ejs 还没生成好就已经刷新好了页面。

**解决方法**

```javascript
        .pipe(gulp.dest(path_dist))
        //  .pipe(browserSync.reload({stream:true}));

```
就是直接在pipe 方法中添加刷新操作。
