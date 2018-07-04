# vue 记录

## 将子组件参数返回给父组件。

```js
beforeRouteLeave(to, from, next) {
  if (to.name == 'Two') {
    to.query.temp = this.selVal;
  }
  next();
}
```
复制代码
　　在 `/one `页面的` mounted` 方法中获取相应的值

```js
  mounted() {
    if (this.$route.query.temp) {
      this.temp = this.$route.query.temp;
    }
  }
```


## 微信返回按钮 “拦截”

有时候我们在微信进行返回的时候，希望实现的只是如去掉当前页面的弹出层 ，或者其他的操作框。只有也没有操作框了，才是真正的返回
 

 ::: warning
 微信左上角的返回按钮其实无法被拦截，但是可以监听到这个返回事件。
 :::

 真正拦截返回事件，可以当前页面先向 window.history 中添加一个记录(实际只是在历史记录堆栈中添加一条记录 pushState，浏览器并不会真正去加载这个路径)，当点击返回时，监听到返回事件处理自己想处理的逻辑，反正微信它是一定要执行返回，刚添加的那条记录就会从 window.history 拿出并将此路径替换当前页面路径。注意：这里只是路径的替换，只是将路径换了个名字，并不是会真正去加载这个路径。

 1. 在第二个页面 mounted 方法中加入，添加监听返回事件方法。当返回按钮被点击时，这里让弹出的蒙层隐藏；

 ```js
 mounted() {
    let that = this;
    // 添加返回事件监听
    window.addEventListener("popstate", function(e) {
      that.isShowTestDiv = false;
    }, false);
  },
```

2. 监听蒙层，当它显示时，在window.history(历史堆栈)中添加一条记录；
```js
 watch: {
    isShowTestDiv: function(newVal, oldVal) {
      if (newVal === true) {
        this.pushHistory();
      }
    }
  }
```

```js
 pushHistory() { // 修改history
      var state = {
        title: "",
        url: "/two" // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
      };
      window.history.pushState(state, state.title, state.url);
    },

```


3. 最后弹出的蒙层如果用户点蒙层上相关操作将蒙层关闭，那么要手动将自己添加的那条记录从 history 中移除，在 vue 中将路由 back 一下即可。
```js
helloClick() { // 点击弹出来的hello蒙板
  this.isShowTestDiv = false;
  this.$router.back(); // 将添加记录从history中移除
}

```

4. 还可以再优化

`window.addEventListener` 添加的事件回调会一直存在，因为 Vue 实例销毁时，window 对象并不会销毁。可以在它的回调里打印，会发现在 two 之外的页面点返回也会进入它的方法。但因为 two 页面内对象数据都已销毁，所以进了此方法也无任何问题。如果不想让其进入，可以用存储一些全局变量加入 if 判断，在 two 页面 destroyed 等相关勾子函数将这个全局变量置成想要状态；或者在全局路由勾子方法中设置相关全局变量也可以。
```

<!-- 　　之前有尝试在 two 的 destroyed 方法内，通过 window.removeEventListener 移除添加的方法，但发现无效果。可能 popstate 是微信内置方法，不能被移除。 -->
```
