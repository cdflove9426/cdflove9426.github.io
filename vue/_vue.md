# Vue 基本使用
[Vue 驱动的静态站点生成工具](https://vuepress.docschina.org/)
[Hexo已经看腻了，来试试VuePress搭建个人博客](https://juejin.im/post/5addb90af265da0b7f442935#heading-0)
[干货!各种常见布局实现+知名网站实例分析
各种页面常见布局+知名网站实例分析+相关阅读推荐](https://juejin.im/post/5aa252ac518825558001d5de)


[webpack4-用之初体验](https://juejin.im/post/5adea0106fb9a07a9d6ff6de)
[webpack4--带你走进webpack世界，成为webpack头号玩家。](https://juejin.im/post/5ac9dc9af265da23884d5543)


[Vue 服务端渲染技术](https://juejin.im/post/5ade9343518825673f0b3f17)
[如何解释vue的生命周期才能令面试官满意？](https://juejin.im/post/5ad10800f265da23826e681e)
[基于react/vue的移动端终极适配方案（更新css-modules配置）](https://juejin.im/post/5ad56aad51882532ce65affa)


[Vue还有这种骚操作？](https://juejin.im/post/5adc99f56fb9a07abd0d3ee7)

[vue多页面开发和打包的正确姿势](https://juejin.im/post/5a8e3f00f265da4e747fc700)

[滴滴 webapp 5.0 Vue 2.0 重构经验分享](https://juejin.im/post/58c8d226ac502e00587f60cd)
[[译]如何在 Vue.js 中使用第三方库 #51](https://github.com/dwqs/blog/issues/51)
# vueadmin
[/vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)

[vue-element-admin(是一个后台集成解决方案，它基于 Vue.js 和 element。)](https://github.com/PanJiaChen/vue-element-admin/blob/master/README.zh-CN.md)
用于构建应用程序：[electron-vue-admin]()

# Vue CLI

2.0的版本 
```shell
$ vue init <template-name> <project-name>
$ npm install -g vue-cli
$ vue init webpack my-project
```


3.0 版本
```
npm install -g @vue/cli
# or
yarn global add @vue/cli

vue create my-project
```


# 对象更改检测注意事项
还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})

//你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：
Vue.set(vm.userProfile, 'age', 27)
vm.$set(vm.userProfile, 'age', 27)
```


有时你可能需要为**已有对象赋予多个新属性**，比如使用` Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
```js
//bad!
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})


// Good!
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

建议一开始就先申明好属性 即使为空 
```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika',
      age:null,
      desc:''
    }
  }
})
```



# webpack vue 配置
```js
{
  dev:{
    //...
    proxyTable:{
      '/api':{
        target:'http:127.0.0.1:3000/',
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
}



this.$https.get('/api/tool')
// vue会将请求代理为 http://127.0.0.1:3000/tool
```



## 引入jquery等js库(没必要了)
由于vue-cli是直接构建出webpack打包环境，而不像angular-cli那样在外面将webpack包了起来，所以我们可以直接修改其webpack配置来达到个性化打包的目的。 
 
1.在构建的项目中build/webpack.base.conf.js的module.export对象中的resolve属性中添加：
```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': 'jquery'
    }
  },
```
2.然后在module.export对象中添加plugins属性：
```js
    new webpack.ProvidePlugin({
      jquery: "jquery",
      $:"jquery"
    })
js
```

## 计算属性和侦听器
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```


```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### 计算属性的 setter
计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
```js

// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
现在再运行 `vm.fullName = 'John Doe' `时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

## 侦听器 watch
> 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
```
```js
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为判定用户停止输入等待的毫秒数
      500
    )
  }
})
 
```

## 用 `key` 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 placeholder。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可：
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```


## `v-if` vs `v-show`
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
因此，**如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。**



# 数组更新检测
## **变异方法**
Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```
你打开控制台，然后用前面例子的 items 数组调用变异方法：example1.items.push({ message: 'Baz' }) 。

## 替换数组
变异方法 (mutation method)，顾名思义，**会改变被这些方法调用的原始数组**。相比之下，也有非变异 (non-mutating method) 方法，例如：`filter(), concat() 和 slice() `。**这些不会改变原始数组，但总是返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组：
```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
**你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。**


## 注意事项
**由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
**
当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
当你修改数组的长度时，例如`：vm.items.length = newLength`
举个例子：
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：
```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 `vm.$set` 实例方法，该方法是全局方法 Vue.set 的一个别名：

`vm.$set(vm.items, indexOfItem, newValue)`
为了解决第二类问题，你可以使用 splice：
`vm.items.splice(newLength)`


# 对象更改检测注意事项
[link](https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E6%9B%B4%E6%94%B9%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)