# Vue-router 路由的基本使用 以及优雅使用keep-alive
[$route-api](https://router.vuejs.org/zh-cn/api/route-object.html)
```shell
# npm install vue-router
```

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```


```js
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router';
// Vue.config.productionTip = false;
Vue.config.productionTip = true;

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')


//router.js
import Vue from "vue";
import Router from "vue-router";
import Skills from "./components/Skills.vue";
import About from './components/About.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: __dirname,
  routes: [
      
    {
      path: "/",
      name: "skills",
      component: Skills
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
```


通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：
```js
// Home.vue
export default {
  computed: {
    username () {
      
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```



## 动态路由匹配
 
模式 | 匹配路径 | $route.params
---|------|--------------
/user/:username | /user/evan | { username: 'evan' }
/user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123 }

```js
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/' },
    // params are denoted with a colon ":"
    { path: '/params/:foo/:bar' },
    // a param can be made optional by adding "?"
    { path: '/optional-params/:foo?' },
    // a param can be followed by a regex pattern in parens
    // this route will only be matched if :id is all numbers
    { path: '/params-with-regex/:id(\\d+)' },
    // asterisk can match anything
    { path: '/asterisk/*' },
    // make part of th path optional by wrapping with parens and add "?"
    { path: '/optional-group/(foo/)?bar' }
  ]
})
```



### 响应路由参数的变化
 使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，原来的组件实例会被**复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，**这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 `watch（监测变化） $route `对象：
```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}


//或者使用 2.2 中引入的 beforeRouteUpdate 守卫：
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```



#### 匹配优先级
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。


## 嵌套路由
要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

提供案例的[可运行代码请移步这里](https://jsfiddle.net/yyx990803/L7hscd8h/)。
```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
  <router-link to="/user/1">/user</router-link>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
 11111111111 <br/>
  <router-view></router-view>
  111111111111111<br/>
</div>


const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      222222222222222<br/>
      <router-view></router-view>
      222222222222222<br/>
    </div>
  `
}

```



```js
const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
```




## 编程式的导航
` <router-link> `创建 a 标签来定义导航链接，还可以借助 router 的实例方法，通过编写代码来实现。
`router.push(location, onComplete?, onAbort?)`

  注意：在 Vue 实例内部，你可以通过` $router` 访问路由实例。因此你可以调用 this.$router.push`。

导航到不同的 URL，则使用 `router.push `方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` **等同于调用** `router.push(...)。`



声明式 | 编程式
------- | -------
`<router-link :to="...">` | `router.push(...)`
```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})   

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

    注意：如果提供了  path，params会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123


// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

> 在 2.2.0+，可选的在 router.push 或 router.replace 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 **(在所有的异步钩子被解析之后)** 或终止 **(导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由)** 的时候进行相应的调用。

> 注意：如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。

 
`router.replace(location, onComplete?, onAbort?)`
跟` router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。






声明式 | 编程式
----|----
`<router-link :to="..." replace>` | `router.replace(...)`

**router.go(n)**

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```


## 命名路由
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```
这跟代码调用 router.push() 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```
这两种方式都会把路由导航到 /user/123 路径。
[完整的例子请移步这里。](https://github.com/vuejs/vue-router/blob/next/examples/named-routes/app.js)

## 命名视图

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```


### 嵌套 命名视图
```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```


## 重定向和别名
### 重定向
重定向也是通过 routes 配置来完成，下面例子是从`/a `重定向到` /b`：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})

//重定向的目标也可以是一个命名的路由：

const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
//甚至是一个方法，动态返回重定向目标：

const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

### 别名

『重定向』的意思是，当用户访问` /a`时，URL 将会被替换成 `/b`，然后匹配路由为` /b`，那么**『别名』**又是什么呢？

`/a` 的别名是` /b`，意味着，当用户访问 `/b` 时，URL 会保持为 /b，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

上面对应的路由配置为：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。



# keep-alive
vue 项目中，路由缓存是一个常见的需求和功能，官方文档里面有说到，如果要保存某个组件的状态或避免重新渲染，可以使用 keep-alive 组件，文档里面说的比较简单，就只是用 keep-alive 组件包裹某个或几个组件，这样做的话功能是可以实现，但未免不够优雅（如果我有很多组件都需要做缓存处理，或者某个需要缓存的组件在很多地方都要用到，难道需要在每个使用的地方都写上 keep-alive 吗？太麻烦了，有没有更好的实现方式。）
```html
      <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
```

然后通过设置路由的使用使用 meta 中的参数
```js
       {
            path: '/guideList',
            name: 'GuideList',
            meta: {keepAlive: true, title: 'title'},
            component: GuideList
        },
```
