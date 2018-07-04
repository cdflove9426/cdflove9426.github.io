
#  gulp 处理图片（压缩，雪碧图）

**注意**
国内网络 别翻墙
如果使用 cnpm install 安装 gulp-image 失败，可以先安装gulp-image，在安装cnpm install


--------

# 使用gulp-imagemin 压缩图片

```js
gulp.task('image:prod', function () {
    //    gulp.src(['src/assets/*.+(jpg|png|gif|svg)','!src/assets/icons'])
    return gulp.src(['src/assets/images/**/*.+(jpg|png|gif|svg)', "!src/assets/images/**/_*.*"])
        // .pipe(cache(image(imgCf)))
        .pipe(cache(
            imagemin({
                verbose:true,
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [{
                    removeViewBox: true
                }]
            })
        ))
        // .pipe(image(imgCf))
        .pipe(gulp.dest(build_DirName + '/assets/images'))
        .pipe(rev())
        .pipe(revFormat(CF.rev_format))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/images'))
});
```

# 使用gulp-image 压缩图片

[gulp-image](https://www.npmjs.com/package/gulp-image)

```js
var gulp = require('gulp'),
    image  = require('gulp-image');
     cache = require('gulp-cache'); //只压缩修改的图片，没有修改的图片直接从缓存文件读取
var del =  require('del');
gulp.task('image', function () {
//    gulp.src(['src/assets/*.+(jpg|png|gif|svg)','!src/assets/icons'])
   gulp.src(['src/assets/**/*.+(jpg|png|gif|svg)'])
    .pipe(cache(image ()))
    .pipe(gulp.dest('dist/assets'));
});
```
其中使用到了gulp-cache 插件，
![img1](https://raw.githubusercontent.com/1000ch/gulp-image/master/screenshot/terminal.png)


# gulp-tinypng-compress 压缩png jpg

之所以用这个插件，是因为这个插件压缩效果高，而且支持将图片压缩后替代原先的图片（原地址）
而且生成一个记录文件
避免重复压缩

[gulp-tinypng-compress](https://github.com/stnvh/gulp-tinypng-compress)

```js
var tinypng = require('gulp-tinypng-compress');
gulp.task('image:tiny', function () {
    gulp.src('src/testimg_same/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: '-----5mSKbxDCg5GHxMIu0HvX1HuGTmD',
            sigFile: 'src/testimg_same/.tinypng-sigs',
            log: true,
            sameDest:true  ,//src 和图片输出为同一路径
            summarize:true
        }))
        .pipe(gulp.dest('src/testimg_same'));
});

```


# 美化插件输出
找到 gulp-tinypng-compress 包 在 index.js 文件中修改

```js
// self.utils.log('[compressing] ' + chalk.green('✔ ') + file.relative + chalk.gray(' (done)'));

```

```js
var _file_ = file.contents.toString().length,
    _tinyFile_ = tinyFile.contents.toString().length,
    _f_f_ = _file_ - _tinyFile_;
self.utils.log(
    chalk.green('✔ ') + chalk.bgBlue(file.relative) +
    chalk.gray('-> before=') +
    chalk.blue(_file_ / 1000 + " KB") +
    chalk.gray(' after=') +
    chalk.yellow(_tinyFile_ / 1000 + 'KB') +
    chalk.gray(' reduced=') +
    chalk.green(_f_f_ / 1000 + ' KB(' + (_f_f_ / _file_ * 100).toFixed(2) + '%)')
)
// self.utils.log('[compressing] ' + chalk.green('✔ ') + file.relative + chalk.gray(' (done)'));
// self.stats.compressed++;
self.stats.total.in += _file_;
self.stats.total.out += _tinyFile_;;
```
