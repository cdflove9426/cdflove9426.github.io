


# gulp4的基础使用
[gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
[github gulp4文档](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md)
[【译】相对完整的Gulp4升级指南](https://segmentfault.com/a/1190000005357048)

##watch方法路径不要用 './xx'
用 './xx' 开头作为当前路径开始，会导致无法监测到新增文件，所以直接省略掉 './' 即可。'./images/*' === 'images/*'

gulp 3 
[gulp-book](https://github.com/nimojs/gulp-book)

# gulp3 to  gulp4
```bash
# 卸载全局的 gulp
$ npm uninstall gulp -g

# 安装全局的 gulp 4.0
$ npm install "gulpjs/gulp-cli#4.0" -g
$ npm install "gulpjs/gulp#4.0" -g

# 到项目目录里删掉本地的 gulp
$ npm rm gulp --save-dev

# 安装本地的 gulp 4.0
$ npm install "gulpjs/gulp#4.0" --save-dev
```

# gulp4中多的实用技巧

gulp.src 接收的文件匹配字符串会顺序解释，所以你可以写成这样 gulp.src(['*.js', '!b*.js', 'bad.js'])（排除所有以 b 开头的 JS 文件但是除了 bad.js）
gulp.task 不再支持三个参数的用法
gulp.task 用字符串注册的任务必须是直接在命令行中调用的任务
gulp.task 可以接受单参数语法，这个参数必须是一个命名函数，函数名会被作为任务名

# 升级代码gulp3 到gulp4

```js
//gulp3
gulp.task('build', function(){
  gulp.src(['*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
```

build 任务  没毛病，Gulp 4.0 下还是行的
default 就不行了，要改成这样：
```js
gulp.task('default', gulp.parallel('build'));
```

--------------

过去只用gulp.start 的方法是想在一个task 结束或者监听到文件结束后触发另一个task
```js
gulp.task('clean', function(){
  del('dist');
});

gulp.task('build', function(){
  gulp.src(['*.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-build', ['clean'], function(){
  gulp.start('build');
});

gulp.task('default', ['build']);
```

 

gulp4 有了更漂亮的写法了


**任务函数可以接受一个 callback 作为参数，只有当你调用了这个 callback，这个任务才算结束：** 否则任务只有开始 ，不会结束
```js
function clean(callback){
  del('dist', callback);
}

<!--
 gulp.task('clean', function(callback){
  del('dist',callback);
}); -->

function build(callback){
  gulp.src(['*.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .on('finish', callback);
}

gulp.task(clean);
gulp.task(build);
gulp.task('clean-build', gulp.series(clean, build));
gulp.task('default', gulp.parallel(build));
```

# gulp4顺序执行task

过去 gulp 是这样的

```js
gulp.task('prod', ['clean', 'compass', 'image', 'style', 'html', 'ftp']);  
```
```bash
[10:22:54] Starting 'clean'...
[10:22:54] Starting 'compass'...
[10:22:54] Starting 'imagemin'...
[10:22:54] Starting 'style'...
[10:22:54] Starting 'html'...
[10:22:54] Starting 'ftp'...
[10:22:54] Finished 'style' after 88 ms
[10:22:54] Finished 'html' after 86 ms
[10:22:54] Finished 'clean' after 255 ms
[10:22:54] Finished 'ftp' after 549 ms
[10:22:55] Finished 'compass' after 1.5 s
[10:22:56] gulp-imagemin: Minified 15 images (saved 337.01 kB - 30.8%)
[10:22:56] Finished 'imagemin' after 2.46 s
[10:22:56] Starting 'prod'...
[10:22:56] Finished 'prod' after 14 μs
```

所以在gulp3中有顺序执行的插件
 gulp-run-sequrence插件https://www.npmjs.com/package/gulp-run-sequence 已弃用了，
 可以用gulp-sequence代替https://github.com/teambition/gulp-sequence 
 
但使用了gulp4 就不用了
```
gulp.task('prod', gulp.series('clean', 'compass', gulp.parallel('image', 'style', 'html'), 'ftp'));  
```
**series里的任务是顺序执行的**
**parallel里的任务是同时执行的。**

```
[15:36:53] Starting 'prod'...
[15:36:53] Starting 'clean'...
[15:36:54] Finished 'clean' after 24 ms
[15:36:54] Starting 'compass'...
[15:36:55] Finished 'compass' after 1.28 s
[15:36:55] Starting 'parallel'...
[15:36:55] Starting 'image'...
[15:36:55] Starting 'style'...
[15:36:55] Starting 'html'...
[15:36:55] Finished 'style' after 67 ms
[15:36:55] Finished 'html' after 67 ms
[15:36:57] gulp-imagemin: Minified 15 images (saved 337.01 kB - 30.8%)
[15:36:57] Finished 'image' after 2.25 s
[15:36:57] Finished 'parallel' after 2.25 s
[15:36:57] Starting 'ftp'...
[15:36:57] Finished 'ftp' after 63 ms
[15:36:57] Finished 'prod' after 3.62 s
```

 
#  gulp 添加版本号
网上的教程 有许多是通过修改node_modules的包文件来实现添加版本好，这都不是我们想要的
[前端静态资源版本更新与缓存之——通过gulp 在原html文件上自动化添加js、css版本号](http://blog.csdn.net/zchcode/article/details/52421871)

```html
<link rel="stylesheet" href="../css/default-803a7fe4ae.css">
<script src="../js/app-3a0d844594.js"></script>
```

我们想要这种
```html
<link rel="stylesheet" href="../css/default.css?v=5a636d79c4">
<script src="../js/app.js?v=3a0d844594"></script>

```

[使用gulp为项目中的文件自动添加版本号之实践思路](http://blog.csdn.net/itpinpai/article/details/53011860)


实践结果
使用 gulp-rev  后生成一个rev-manifest.json
```js
gulp.task('babel:prod', function () {
    return gulp.src('./src/assets/js/*.js')
        .pipe(babel()) //babel转码
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('./' + build_DirName + '/assets/js'))  //在rev 前先输出内容
        .pipe(rev())
        //.pipe(revFormat(CF.rev_format))
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/js'))
    // .pipe( rename({suffix: '.min'}))
    //   .pipe(browserSync.reload({
    //     stream: true
    // }));
});
```

后通过 gulp-rev-collector 插件提供的方法进行 替换路径 并在**替换的过程中 修改自己想要的路径形式**
```js
function changeUrl(urlHead_str, manifest_value) {
    console.log("manifest_value--------------");
    var _str_filename = manifest_value.match(/-[\w]*\./)[0].slice(1, -2) // // -3c337df2ee.
    var match_sta = manifest_value.split(/-[\w]*\./) // // -3c337df2ee.
    console.log(_str_filename, match_sta);
    return urlHead_str + match_sta[0] + "." + match_sta[1] + "?v=" + _str_filename;
}
gulp.task('rev', function () {
    return gulp.src([ 'rev/**/*.json', build_DirName + '/**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                // './assets/styles': CF.build_urlAssets + 'styles',
                './assets/styles': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'styles/' ,manifest_value);
                },
                './assets/js': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'js/' ,manifest_value);

                },
                // './assets/images': CF.build_urlAssets + 'images',
                './assets/images': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'images/' ,manifest_value);
                },
                // './assets/lib': CF.build_urlAssets + 'lib',
                './assets/lib':  function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'lib/' ,manifest_value);
                },
                // 'cdn/': function(manifest_value) {
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }))
        .pipe(gulp.dest(build_DirName)); //- 替换后的文件输出的目录
});

```


gulp-rev 默认生产的文件类似`icecream-197842d639.js`
原先通过 gulp-rev-format 修改文件的名，也修改成功了

开始修改后 gulp-rev-collector 插件读取不到文件名参数 ， 
**gulp-rev-collector 插件默认配置 revSuffix 匹配类型为 '-[0-9a-f]{8,10}-?'**

>revSuffix
Type : String
It is pattern for define reved files suffixes. Default value is '-[0-9a-f]{8,10}-?'. This is necessary in case of e.c. gulp-rename usage. If reved filenames had different from default mask.

修改配置后就可以了
```js
gulp.task('rev', function () {
    return gulp.src([ 'rev/**/*.json', build_DirName + '/**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({

            revSuffix:'--[0-9a-f]{8,10}\.rev-?',
            replaceReved: true,
            dirReplacements: {
                // './assets/styles': CF.build_urlAssets + 'styles',
                './assets/styles': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'styles/' ,manifest_value);
                },
                './assets/js': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'js/' ,manifest_value);

                },
                // './assets/images': CF.build_urlAssets + 'images',
                './assets/images': function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'images/' ,manifest_value);
                },
                // './assets/lib': CF.build_urlAssets + 'lib',
                './assets/lib':  function (manifest_value) {
                    return changeUrl(CF.build_urlAssets + 'lib/' ,manifest_value);
                },
                // 'cdn/': function(manifest_value) {
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }))
        .pipe(gulp.dest(build_DirName)); //- 替换后的文件输出的目录
});

```
