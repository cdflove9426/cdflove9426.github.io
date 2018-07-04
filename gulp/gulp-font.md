# 字蛛

[字蛛](http://font-spider.org/)
[gulp-font-spider](https://github.com/aui/gulp-font-spider)

```js
gulp.task('font1',function( callback){
  // console.log(path.join(__dirname,'dist/**/*.html'));
  return  gulp.src(path.join(__dirname,'dist/**/*.html'))
        .pipe(fontSpider({
          // map:[ ['www.cdf9426.com/fonts',path.join(__dirname,'dist/fonts')]],
          //将读取到底地址 css 以及字体包 都改成本地路基
            resourceMap: function(file) {
                console.log("file:");
                console.log(file);
                console.log(path.join(__dirname,'dist',file.split('192.168.1.69:3000/')[1]));
                return path.join(__dirname,'dist',file.split('192.168.1.69:3000/')[1]);
            }
        }))
        // .on('',callback);
        // callback();
});
```


字蛛插件 首先会读取html文档，提取相应的css,和字体包。

如果读取的文件都是相对路径 ，那基本上做配置都可以了，
但是如果我们的文件都是准备发布到网站或者cdn路径的。就需要帮助字蛛找到css文件以及 字体包了
[AP]()



```html
meta charset="UTF-8">
<title>page1</title>
<link href="//192.168.1.69:3000/css/index.b4eb3fff.css" rel="stylesheet"></head>
<body>
  
  <div class="app"></div>
  <img src="//192.168.1.69:3000/img/Screenshot.33bafbe1.png" alt="" width="100" height="100">
  <img src="//192.168.1.69:3000/img/img1.940bbb5b.png" alt="">
  <h1><a href="about.html">about.html</a></h1>
  <div class="testImg"><h1> 手动阀设法爱瑟菲爱瑟菲阿瑟发色发四六级阿瑟发色爱上及阿瑟发谁Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, similique!</h1></div>
  <div class="sp-_ai sp-_ai__heart337">1231</div>
  
```


```css
body {
  color: bisque; }
@font-face {
  font-family: 'lixuke';
  src: url(//192.168.1.69:3000/fonts/font_sp_lixuke.3183ecab.ttf) format("truetype");
  font-weight: normal;
  font-style: normal; }
```

**resourceMap**参数能够将读取到的css文件以及字体包进行路径修改。

```bash
[13:04:17] Using gulpfile D:\cai_web\build\gulp_webpack_handlebars\gulpfile.js
[13:04:17] Starting 'font1'...
file:
# 读取到的文件  
d://192.168.1.69:3000/css/about.fd97b4b8.css 
[ 'd://', 'css/about.fd97b4b8.css' ]
# 通过字符串配件而成的css路径
D:\cai_web\build\gulp_webpack_handlebars\dist\css\about.fd97b4b8.css
file:
d://192.168.1.69:3000/css/index.b4eb3fff.css
[ 'd://', 'css/index.b4eb3fff.css' ]
D:\cai_web\build\gulp_webpack_handlebars\dist\css\index.b4eb3fff.css
# 在找到相应的css 后就会对字体包进行操作  进行和css相同的操作
file:
d://192.168.1.69:3000/fonts/font_sp_lixuke.3183ecab.ttf
[ 'd://', 'fonts/font_sp_lixuke.3183ecab.ttf' ]
D:\cai_web\build\gulp_webpack_handlebars\dist\fonts\font_sp_lixuke.3183ecab.ttf
```

```bash
D:\cai_web\build\gulp_webpack_handlebars\dist\css\index.b4eb3fff.css
file:
d://192.168.1.69:3000/fonts/font_sp_lixuke.3183ecab.ttf
[ 'd://', 'fonts/font_sp_lixuke.3183ecab.ttf' ]
D:\cai_web\build\gulp_webpack_handlebars\dist\fonts\font_sp_lixuke.3183ecab.ttf
Font family : lixuke
Original size : 5876.616 KB
Include chars : !,.CLabcdefghiklmnopqrstuy上六动及发四手法爱瑟级色菲设谁阀阿
Font id : 93d4f2a48eb8a427ac3166420e3828aa
CSS selectors : h1
File : dist\fonts\font_sp_lixuke.3183ecab.ttf created: 22.8 KB
```

可以看到原本 5M 多的文件，被提取到只有 20+ kg了
