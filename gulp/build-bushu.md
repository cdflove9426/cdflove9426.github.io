---
title: CDN部署静态资源 --非覆盖式部署
tags:
  - html5
  - webpack
  - js
  - build
  - CDN
date: 2017-03-13 14:35:00
category:
---

<!-- toc -->
<!-- more -->

[变态的静态资源缓存与更新 ](http://div.io/topic/745)
[前端工程之CDN部署 ](http://div.io/topic/930)

CDN:

>不同地区的用户会访问到离自己最近的相同网络线路上的CDN节点，当请求达到CDN节点后，节点会判断自己的内容缓存是否有效，如果有效，则立即响应缓存内容给用户，从而加快响应速度。如果CDN节点的缓存失效，它会根据服务配置去我们的内容源服务器获取最新的资源响应给用户，并将内容缓存下来以便响应给后续访问的用户。因此，一个地区内只要有一个用户先加载资源，在CDN中建立了缓存，该地区的其他后续用户都能因此而受益。


>将静态资源部署到不同网络线路的服务器中，以加速对应网络中CDN节点无缓存时溯源的速度。
加载静态资源时使用与页面不同的域名，一方面是便于接入为CDN而设置的智能DNS解析服务，另一方面因为静态资源和主页面不同域，这样加载资源的HTTP请求就不会带上主页面中的Cookie等数据，较少了数据传输量，又进一步加快网络访问。


# 非覆盖式部署
[图片来自--云龙](http://div.io/topic/745)
 ![](http://divio.qiniudn.com/FgxeSXNnyGYs3tfmbA_qnZ9rksxE)

给静态资源 使用数据摘要要算法，对文件求摘要信息，摘要信息与文件内容一一对应，就有了一种可以精确到单个文件粒度的缓存控制依据了。
让后将静态资源部署到CDN。通过这种方式，新静态资源基本上不会覆盖掉旧的。
而静态页面的文件名保持不变，部署到服务器。

通过这种方式，就再也不会因为 旧的静态页面，加载了新的静态资源导致页面， 或者新的静态页面缓存着旧的静态资源的情况出现


# 使用webpack 给资源进行打包

**在webpack配置中添加hash**

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
