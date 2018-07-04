# Vue 项目优化
后来发现这个更像是webpack 优化打包。。。

vue 项目打包后，一般都能发现`app.js` `vendor.js`文件比较大

**vendor.js**主要是把**node_modules**里所用到的**modules**都合并成一个公共js文件，所以比较大.而我们也希望将业务代码和第三方引用分开打包。
毕竟我们很少修改第三方的代码

**优化点主要在如下几个方面:**

- 开启gzip压缩功能
- 引入CDN
- 路由懒加载
- 某些第三方组件按需加载而不是全部加载
- 较小的图片资源用base64嵌入src中，减少http请求 

##  gzip压缩
`config.js->index.js`
修改build
```js

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,  //  <- 是否开启Gzip
    productionGzipExtensions: ['js', 'css'],
```

上面的配置也将关系到一下的配置代码是否执行
webpack.prod.conf.js
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
      minRatio: 0.8
    })
  )
}

```



如果后端是用的**express**，开启`gzip`非常简单，首先`npm install compression`安装中间件,然后在app.js里添加use使用即可：
```js
var compression = require('compression');
var app = express();
app.use(compression())
```



## CDN
CDN(内容分发网络)。

使用CDN实质上就是让CDN作为网站的门面，用户访问到的是CDN服务器，而不是直接访问到网站。由于CDN内部对TCP的优化、对静态资源的缓存、预取，加上用户访问CDN时，会被智能地分配到最近的节点，降低大量延迟，让访问速度可以得到很大提升

**原则是尽量将比较大的第三方库放到cdn上去以减少请求时间**

vue,vuex,vue-router,echarts等都放到了cdn上，具体操作是打开`BootCDN` 然后搜索关键字并copy链接粘贴到index.html的body闭合标签前

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>tmp_vue_oo</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->

    <script src="https://cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/vux/3.0.1/vuex.min.js"></script>
    <script src="https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js"></script>
  </body>
</html>

```
`webpack.base.conf.js`里设置**externals**选项，目的告诉webpack引用的这些模块不打包,通过外部链接添加了。

由于index.html中script的引入，比如vue就会有一个全局变量Vue存在，因此这里external的value就是Vue
```js
externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'echarts': 'echarts'
  },
```


## 路由懒加载
```js
//**webpack 2 和 ES2015** 语法加在一起，我们可以写成这样：
Vue.component(
  'async-webpack-example',() => import('./my-async-component')
)

//AMD风格的异步加载
const ComA = resolve => require(['./components/A.vue' ], resolve);
 
//CMD风格的异步加载
const ComA = resolve => require.ensure([], () => resolve(require('./components/A.vue')));
 
```


## 第三方按需加载

## 图片转base64

图片可以转为base64字符串然后嵌入img的src中，节省http请求数量,webpack中用url-loader处理,limit控制了图片转base64的阈值，小于该值就转base64
不过一般图片转base64后比原先体积会更大一些，这就需要在http请求和加载的图片体积进行权衡了，
当然 小图片下我们才转为base64
```js
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  },

```



关于 webpack dll   waiting
[Vue SPA 打包优化实践](https://juejin.im/post/5a3251ee6fb9a0450f21f6ac)

推荐神奇 查看打包后情况`webpack-bundle-analyzer`
[Vue SPA 首屏加载优化实践](https://juejin.im/post/5a291092518825293b50366d)
