# node-server 快速开启一个服务
http-server是一个基于Node.js的简单零配置命令行HTTP服务器. 如果你不想重复的写Node.js的web-server.js
```
npm install http-server -g
```

启动http-server命令就是在cmd下直接输入http-server，之后就可以浏览器访问http://localhost:8080. 
默认web目录是当前目录，想改变web目录的话，在命令后面加上本地路径，例如：
```
http-server <path_of_project>
```

```
http-server <path> -a 0.0.0.0 -p 8080
```

参数-a是监听地址，而参数-p是修改监听端口。


# browserSync

// --files 路径是相对于运行该命令的项目（目录） 
browser-sync start --server --files "css/*.css"

// --files 路径是相对于运行该命令的项目（目录） 
browser-sync start --server --files "css/*.css, *.html"
// 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。 
browser-sync start --server --files "**/*.css, **/*.html"