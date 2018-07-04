# Code Splitting实现按需加载

## code splitting 
在最开始使用Webpack的时候, 都是将所有的js文件全部打包到一个build.js文件中(文件名取决与在webpack.config.js文件中output.filename)。

但是在大型项目中, build.js可能过大, 导致页面加载时间过长。这个时候就需要**code splitting, code splitting**就是将文件分割成块(chunk), 我们可以定义一些分割点(split point), 根据这些分割点对文件进行分块, 并实现按需加载.

##  Code Splitting的作用

1. 第三方类库单独打包:
  由于第三方类库的内容基本不会改变, 可以将其与业务代码分离出来, 这样就可以最大化的利用浏览器的缓存机制, 减少请求.
  
2. 按需加载:
  Webpack支持定义分割点, 通过require.ensure进行按需加载.


## 单独打包第三方类库
第三方类库的内容基本不会改变, 可以将其与业务代码分离出来, 这样就可以最大化的利用浏览器的缓存机制,

在webpack.config.js进行配置

```js
//webpack.config.js

//在entry中添加相应第三方类库
entry: {
    bundle: './src/main.js',
    vendor: ['./src/lib/jquery-2.3.1.min.js', './src/lib/respond.min.js']
}
  
 //在plugins中添加CommonChunkPlugin
plugins:[
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendor',  
        filename: 'vendor.bundle.js'  
    })
]
 
```

执行 build, 此时dist目录下生成了两个文件, 分别是build.js和vendor.bundle.js
**在index.html中引入, 注意: vendor.bundle.js优先于build.js引入**
```html
//index.html

<script src="/dist/vendor.bundle.js"></script>
<script src="/dist/build.js"></script>
```


## 按需加载
vue 中通过 router 配置, 实现组件的按需加载, 在一些单个组件文件较大的时候, 采用按需加载能够减少build.js的体积, 优化加载速度(如果组件的体积较小, 那么采用按需加载会增加额外的http请求, 反倒增加了加载时间)

```js
//app.js

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//AMD规范的异步载入
const ComA = resolve => require(['./components/A.vue' ], resolve);
const ComB = resolve => require(['./components/B.vue' ], resolve);
const ComC = resolve => require(['./components/C.vue' ], resolve);

const router = new VueRouter({
  routes: [
    {
      name: 'component-A',
      path: '/a',
      component: ComA
    },
    {
      name: 'component-B',
      path: '/b',
      component: ComB
    },
    {
      name: 'component-C',
      path: '/c',
      component: ComC
    }
  ]
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
 
```

vue-cli 以及配置好 不用修改
```js
//webpack.config.js

output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
    //添加chundkFilename
    chunkFilename: '[name].[chunkhash:5].chunk.js'
}
 
```


异步加载 代码风格
```js

//AMD风格的异步加载
const ComA = resolve => require(['./components/A.vue' ], resolve);
const ComB = resolve => require(['./components/B.vue' ], resolve);
const ComC = resolve => require(['./components/C.vue' ], resolve);

//CMD风格的异步加载
const ComA = resolve => require.ensure([], () => resolve(require('./components/A.vue')));
const ComB = resolve => require.ensure([], () => resolve(require('./components/B.vue')));
const ComC = resolve => require.ensure([], () => resolve(require('./components/C.vue')));

```  

也可以在工厂函数中返回一个 Promise，所以把 **webpack 2 和 ES2015** 语法加在一起，我们可以写成这样：
```js
// 这个 `import` 函数会返回一个 `Promise` 对象。
Vue.component(
  'async-webpack-example',() => import('./my-async-component')
)
```
