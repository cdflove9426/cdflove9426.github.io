# 用 webpack 实现持久化缓存

[用 webpack 实现持久化缓存](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/#hash)

[webpack2-doc  caching](https://webpack.js.org/guides/caching/)

# 文件添加Hash
 webpack 有两种计算 hash 的方式：

1.计算所有 chunks 的 hash —— [hash]
2.为每个 chunk 计算 hash —— [chunkhash]

第一种是每次编译生成一个唯一 hash，适合 chunk 拆分不多的小项目，但所有资源全打上同一个 hash，无法完成持久化缓存的需求,（基本是修改一小处代码，全部资源再修改为同一hash后，所有资源基本得在下载）


第二种是 webpack 为每个 chunk 资源都生成与其内容相关的 hash 摘要，为不同的资源打上不同的 hash。

相关官方文档：

webpack 1.x - [Long term cache](https://webpack.github.io/docs/long-term-caching.html)
webpack 2 - [Generating unique hashes for each file - Caching](https://webpack.js.org/guides/caching/)



## 在webpack配置中添加hash
JS 资源的 [chunkhash] 由 webpack 计算，
Images/Fonts 的 [hash] 由 [webpack/file-loader](https://github.com/webpack/file-loader) 计算，
提取的 CSS 的 [contenthash] 由 [webpack/extract-text-webpack-plugin]() 计算。


js用的是webpack的chunkhash，
而css用的是contenthash，contenthash是根据内容生成的hash。如果不用contenthash，那么一改js，css的版本号也会跟着改变，这个就有问题了。
webpack还有另外一个自带的叫做”[hash]”，这个hash是所有文件都用的同一个哈希，也就是说某个文件改了，所有文件的版本号都会跟着改，所以一般不用这个。

```js
// production
output: {  
  filename: '[name].[chunkhash:8].bundle.js',
  chunkFilename: '[name].[chunkhash:8].js'
},
module: {  
  rules: [{
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'assets/imgs/[name].[hash:8].[ext]'
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'assets/fonts/[name].[hash:8].[ext]'
    }
  }]
},
plugins: [  
  new ExtractTextPlugin('[name].[contenthash:8].css')
]
```
[chunkhash]/[hash]/[contenthash] 参数多又帅，开发的时候建议用[name],减少编译时间。


## 不稳定的 chunkhash
只是计算 chunk MD5 摘要并修改 chunk 资源文件名是不够的。Chunk 的生成还涉及到依赖解析和模块 ID 分配，这是无法稳定实质上没有变化的 chunk 文件的 chunkhash 变动问题的本源。


虽然只修改了 app.js 的代码，但在最终的构建结果中，vendor.js 的 chunkhash 也被修改了，尽管 vendor.js 的内容没有实质变化。
原因为：
1. webpack runtime 中包含 chunks ID 及其对应 chunkhash 的对象，但 runtime 被集成到 vendor.js 中；
2. entry 内容修改后，由于 webpack 的依赖收集规则导致构建产生的 entry chunk 对应的 ID 发生变化，webpack runtime 也因此被改变。


**核心在于生成稳定的模块 ID，避免频繁的 chunk 内容变动。**
可能会了解到 webpack-md5-hash 插件可以解决这个问题，甚至 webpack 2 的文档中也提示用这个插件解决。 但建议不要使用。。。


[webpack-md5-hash 的问题](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/#webpackmd5hash)

webpack-md5-hash 的问题:浏览器依然会下载旧的 vendor，直接导致发版失误！

webpack-md5-hash 并没有解决之前的问题：

1. 如何生成稳定的模块ID？
2. 如何避免频繁的 chunk 内容变动？


## 如何生成稳定的模块 ID？
模块的 ID 是 webpack 根据依赖的收集顺序递增的正整数。这是不稳定，也不适合的方式。

因为修改一个被依赖较多的模块，依赖这个模块的 chunks 内容均会跟着模块的新 ID 一起改变，但实际上我们只想让用户下载有真正改动的 chunk，而不是所有依赖这个新模块的 chunk 都重新更新。

**使用插件 HashedModuleIdsPlugin **
这是 NamedModulesPlugin 的进阶模块，它在其基础上对模块路径进行 MD5 摘要，**不仅可以实现持久化缓存，同时还避免了它引起的两个问题（文件增大，路径泄露）。用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化！**


```
new webpack.HashedModuleIdsPlugin()
```
**如果使用了 HashedModuleIdsPlugin，NamedModulesPlugin 就不要再添加了。**

webpack1中也可以使用，需要自己下载插件了 [ HashedModuleIdsPlugin.js ](https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js)
```
const HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin')
// ...
new HashedModuleIdsPlugin()
```


# 如何避免频繁的 chunk 内容变动？

过去我们总是简单的吧公共模块全部提取到 vendor 中 
```
{
  entry: { entry },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'entry']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    })
  ]
}
```
**这样无法做到较好的持久化缓存，我们需要更合理地划分并提取公共模块。**

## 合理划分公共模块

|类型	|公用率	|使用频率	|更新频率	|例|
|  ------|  ------|  ------|  ------|  ------|
|库和工具	|高	|高	|低	|vue/react/redux/whatwg-fetch 等|
|定制 UI 库和工具|	高	|高	|中	|UI 组件/私有工具/语法 Polyfill/页面初始化脚本等|
|低频库/工具/代码	|低	|低	|低	|富文本编辑器/图表库/微信 JSSDK/省市 JSON 等|
|业务模块	|低	|高	|高	|包含业务逻辑的模块/View|


- 库和工具 - libs
- 定制 UI 库和工具 - vendor
- 业务模块 - entries
- 低频库/工具/代码 - 分割为 chunk

```
{
  entry: {
    libs: [
      'es6-promise/auto',
      'whatwg-fetch',
      'vue',
      'vue-router'
    ],
    vendor: [
      /*
       * vendor 中均是非 npm 模块，
       * 用 resolve.alias 修改路径，
       * 避免冗长的相对路径。
       */
      'assets/libs/fastclick',
      'components/request',
      'components/ui',
      'components/bootstrap' // 初始化脚本
    ],
    page1: 'src/pages/page1',
    page2: 'src/pages/page2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 省略部分配置
      template: 'src/pages/page1/index.html',
      chunks: ['libs', 'vendor', 'page1']
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/page2/index.html',
      chunks: ['libs', 'vendor', 'page2']
    })
  ]
}
```


## 代码分割
大块的公共模块通过lib,vendor基本搞定，
对「低频库/工具/代码」的处理，对于这类代码最好的办法是做**代码分割**（Code Splitting），做到按需加载.


webpack 提供了几种添加分割点的方法：

- CommonJs: require.ensure
- AMD: require
- ES6 Modules (webpack 1 不支持)

如何分割
[Code Splitting - Using import - webpack 2](https://webpack.js.org/guides/code-splitting-import/)
[Code Splitting - Using RequireJS - webpack 2](https://webpack.js.org/guides/code-splitting-require/)
[code splitting - webpack 1](https://webpack.github.io/docs/code-splitting.html#defining-a-split-point)

添加分割点可以主动将指定的模块分离成另一个 chunk，而不是随当前 chunk 一起打包。对于这几种情况处理非常好：

比较大，且不常用的库/工具，如 D3.js、Draft.js、微信 JSSDK、querystring 等；
单页应用中不常用的 router view，即某些不常访问的介面。

以模块动态加载querystring为例
```js
const { search } = window.location  
import('./components/querystring.js')  
  .then(querystring => {
    const searchquery = querystring.parse(search)
    // ...
  })
  .catch(err => {
    Toast.error(err)
    console.error(err)
  })
```

# 提取公用模块

提取公共模块要使用 Commons-chunk-plugin，对于持久化缓存来说，我们只需要将共用的模块打包到 libs/vendor 中即可。


# CommonsChunkPlugin 的使用
在这里有必要对CommonsChunkPlugin来了解多一些

在Webpack的配置中，我们可以通过CommonsChunkPlugin插件对指定的chunks进行公共模块的提取。我们指定好生成文件的名字，以及想抽取哪些入口js文件的公共代码，webpack就会自动帮我们合并好。:

```js
var chunks = Object.keys(entries); 
plugins: [ 
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk 
        chunks: chunks, 
        minChunks: chunks.length // 提取所有entry共同依赖的模块 
        }) 
],
```


## 将公共业务模块与类库或框架分开打包
```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        common1: ['jquery'],
        common2: ['vue']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'//不使用[name]，并且插件中没有filename，
        //这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ["chunk","common1","common2"],//页面上使用的时候common2
            //必须最先加载
            // filename:"chunk.js"//忽略则以name为输出文件的名字，
                //否则以此为输出文件名字
            minChunks: 2
        })
    ]
};
```

![将公共业务模块与类库或框架分开打包](http://upload-images.jianshu.io/upload_images/2125695-c393f6cb60aed289.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


webpack用插件CommonsChunkPlugin进行打包的时候，
将**符合引用次数(minChunks)的模块**打包到name参数的数组的第一个块里（chunk）,
然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，
**最后一个块包含webpack生成的在浏览器上使用各个块的加载代码**，所以页面上使用的时候最后一个块必须**最先加载**)


# 在来看看效果
![](http://olanznwsg.bkt.clouddn.com/JD3NLK%5BV2%60X%5BF5YMK_H%29YZF.png)
![](http://olanznwsg.bkt.clouddn.com/UH%29IS_L2_%5DNK0VT7X2S8YEH.png)
