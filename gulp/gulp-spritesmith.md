# gulp 雪碧图
 
插件：[gulp.spritesmith-multi](https://www.npmjs.com/package/gulp.spritesmith-multi)
之所以需用这个插件， 是因为该插件可以

- 根据文件夹生成多张雪碧图，
- 设置图片与文件的输出位置，
- 生成的css样式都可以自己设置模板，（如果说要弄响应式雪碧图，就可以自己设置了 下次补上）
A wrapper for[gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith#spritesmithparams) to generate multiple sprites and stylesheets.

许多配置可以从gulp.spritesmith中查看

```js

var spritesmith = require('gulp.spritesmith-multi');
var merge = require('merge-stream');
var util = spritesmith.util;
// generate sprite.png and _sprite.scss 
gulp.task('sprity', function () {
      // 添加模板
      // var themeTemplate = util.createTemplate(
      //   path.join('src/icons', 'csstml.hbs'),
      //    [addTheme]
      // );
      // 模板添加过滤器   如添加新的参数
      // function addTheme(data) {
      //   data.sprites.forEach(function (sprite) {
      //       sprite.a = {
      //         x: sprite.total_width/sprite.width + 'rem',
      //         y: sprite.total_heigth/sprite.heigth + 'rem',
      //       }
      //   });
      // }
        
          // Generate our spritesheet 
          var spriteData = gulp.src('src/icons/**/*.+(png|jpg)')
            .pipe(spritesmith({
              spritesmith: function (options, sprity, icons) {
                options.cssName = options.cssName.split('.')[0] + '.scss';
                options.imgPath = '../assets/icons/' + options.imgName; //在css中的图片地址   妙到爆了
                options.cssFormat = 'scss';
                 options.cssTemplate = spritesmith.builtin.css;
                //  options.cssTemplate = spritesmith.builtin.responsiveCss;
                console.log(options.cssTemplate);
                // test tmp
                // options.cssName = options.cssName.split('.')[0] + '.scss';
                // options.imgPath = '../assets/icons/' + options.imgName; //在css中的图片地址   妙到爆了
                // options.cssFormat = 'scss';
                // //  options.cssTemplate = 'src/icons/csstml.hbs';
                // options.cssTemplate = themeTemplate;
                // console.log(options.cssTemplate);
              }
            }));
          // Pipe image stream through image optimizer and onto disk 
          var imgStream = spriteData.img
            .pipe(gulp.dest('src/assets/icons'))
          // Pipe CSS stream through CSS optimizer and onto disk 
          var cssStream = spriteData.css
            // .pipe(csso())
            .pipe(gulp.dest('src/styles'))
          // Return a merged stream to handle both `end` events 
          return merge(imgStream, cssStream)
        });
```

# 移动端适配之雪碧图(sprite)背景图片定位
[移动端适配之雪碧图(sprite)背景图片定位](http://www.jianshu.com/p/d3b19968a4c2)
