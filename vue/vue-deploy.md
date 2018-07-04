# vue项目部署

## 项目部署不再域名根目录
资源引用路径的解决方案

static与index.html直接放在服务器根目录,也就是说，当前的应用访问的网址如:`http://www.xxx.com`

默认配置不用修改
`config->index.js`文件修改
```
 build:{
    assetsPublicPath: './', 
 }
```

**打包后的dist文件放在了服务器的根目录** `http://www.xxx.com/dist`

这个时候就需修改 `router` 和`assetsPublicPath`配置，
[base router属性](https://router.vuejs.org/api/#base)
```
base
default: "/"

The base URL of the app. For example, if the entire single page application is served under /app/, then base should use the value "/app/".
```

```js
//config/index.js
publiPath:"/dist/"  //"http://www.xxx.com/dist/"



export default new Router({
  base:'/dist/',        
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
```



## HTML5 History 模式
想要很丑的 `hash`，我们可以用路由的 `history` 模式，这种模式充分利用` history.pushState` API 来完成 URL 跳转而无须重新加载页面。
```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

### 后端配置
#### Apache
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### nginx
```
location / {
  try_files $uri $uri/ /index.html;
}
```

需要修改为
```
location / {
 try_files $uri $uri/ /index.html;
 
 // 需要修改为
 try_files $uri $uri/ /dist/index.html;
}
```

#### 原生 Node.js
```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```



## vue-cli  开启Gzip压缩
`config-> index` 下的build
```js
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,   //修改为true
    productionGzipExtensions: ['js', 'css'],
```

```js
 
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      // deleteOriginalAssets:true, //删除源文件，不建议
      minRatio: 0.8
    })
  )
}
```


**配置gzip**
nginx-1.11.13 -> conf -> nginx.conf

添加如下gzip配置，具体配置描述及更多配置可查看 [ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)
```

http:{ 
      gzip on; 
      gzip_static on;
      gzip_buffers 4 16k;
      gzip_comp_level 5;
      gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg 
                 image/gif image/png;

```
