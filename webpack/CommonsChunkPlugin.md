# webpack CommonsChunkPlugin  
 

<!-- toc -->
<!-- more -->

# CommonsChunkPlugin 打包规则
[webpack CommonsChunkPlugin详细教程](http://www.jianshu.com/p/ee372e344d6d)

webpack用插件CommonsChunkPlugin进行打包的时候，
将**符合引用次数(minChunks)的模块**打包到name参数的数组的第一个块里（chunk）,
然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，
**最后一个块包含webpack生成的在浏览器上使用各个块的加载代码**，所以页面上使用的时候**最后**一个块必须**最先加载**

# CommonsChunkPlugin 的使用
**CommonsChunkPlugin 和web持久化缓存一起使用，效果杠杠的。**

在Webpack的配置中，我们可以通过CommonsChunkPlugin插件对指定的chunks进行公共模块的提取。我们指定好生成文件的名字，以及想抽取哪些入口js文件的公共代码，webpack就会自动帮我们合并好。:

```
var chunks = Object.keys(entries); 
plugins: [ 
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk 
        chunks: chunks, 
        minChunks: chunks.length // 提取所有entry共同依赖的模块 
        }) 
],
```

# 将公共业务模块与类库或框架分开打包
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

![](http://upload-images.jianshu.io/upload_images/2125695-c393f6cb60aed289.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 参数minChunks: Infinity

看一下下面的配置会是什么结果
```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        jquery:["jquery"]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "jquery",
            minChunks:2
        })
    ]
};
```

main.js,main1.js共同引用的chunk1和chunk2会被打包到jquery.js里

但是如果修改为 minChunks：Infinity
minChunks:2修改为minChunks:Infinity后，chunk1和chunk2都打包到main.js,main1.js里

# 参数chunks
```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        jquery:["jquery"]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "jquery",
            minChunks:2,
            chunks:["main","main1"]
        })
    ]
};
```

只有在main.js和main1.js中都引用的模块才会被打包的到公共模块（这里即jquery.js）
也就是指打包main,main1 中的公共模块到jquery.js

# 通过webapck-CommonsChunkPlugin生成 mainfest实现持久化缓存
[用 webpack 实现持久化缓存](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/#webpackmd5hash)

过去我们使用webapck-CommonsChunkPlugin 提取公共模块，
是希望能够将公共模块进行缓存，

```js
module.exports = {
	entry: {
		app: './app.js',
		vendor: ['react', 'react-dom', 'moment' /*等等其他的模块*/]
	},
	//其他配置
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
	]
}
```

但发现vendor的hash在每次不管修改哪个文件后重新打包其实都在变化的

这里我们肯定遗漏了知识点，

>webpack用插件CommonsChunkPlugin进行打包的时候，
将**符合引用次数(minChunks)的模块**打包到name参数的数组的第一个块里（chunk）,
然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，
**最后一个块包含webpack生成的在浏览器上使用各个块的加载代码**，所以页面上使用的时候**最后**一个块必须**最先加载**

也就是说，我们每次打包，及时公共模块没有修改，但是当修改其他模块，同时webpack生成的新的 **各个模块的加载码添加到vendor文件**，也就相当也verdor这个公共模块是有改变的，自然hash每次打包都不同了。

**解决办法就是 提取出每次都变化的 加载码（mainfest）**

[webpack2 -Caching](https://webpack.js.org/guides/caching/)

中有讲述到持久化缓存的问题。

正如 文档[# Manifest File - Code Splitting - Libraries](https://webpack.js.org/guides/code-splitting-libraries/#manifest-file)中描述的那样，我们可以通过增加一个指定的公共 chunk 来提取 runtime，从而进一步实现持久化缓存：

```js
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
new webpack.optimize.CommonsChunkPlugin({  
  // 将 `manifest` 优先于 libs 进行提取，
  // 则可以将 webpack runtime 分离到这个块中。
  names: ['manifest', 'libs', 'vendor'].reverse()  //注意这里使用了reverse()
  // manifest 只是个有意义的名字，也可以改成其他名字。
})
```

这样在我们构建之后，就会多打包一个特别小（不足 2kb）的 manifest.js，
解决了 libs 经常「被」更新的问题。

但是 manifest.js 实在是太小了，以至于不值得再为一个小 js 增加资源请求数量。


[script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin)
[Manifest inlining](https://webpack.js.org/guides/caching/#manifest-inlining)

webpack每次build的时候都会生成一些运行时代码。当只有一个文件时，运行时代码直接塞到这个文件中。当有多个文件时，运行时代码会被提取到公共文件中，也就是楼主的vendor,为了阻止这种情况，我们需要将运行环境提取到一个单独的manifest文件里。及时我们创建了另一个bundle，但从长远来看，这种消耗比单独放在一个vendor中获得的收益要大

# 注意

在提取 maninfest 的时候 ，不要使用 `new webpack.HotModuleReplacementPlugin(),`
否则会出现错误

```bash
Cannot use [chunkhash] for chunk in '[name].[chunkhash].js' (use [hash] instead)
```


# webpack 内联css/js
[[webpack] 如何把代码内联进html中？](https://juejin.im/post/587476168d6d810058a0a18a)
上文将到的内联 Manifest 
