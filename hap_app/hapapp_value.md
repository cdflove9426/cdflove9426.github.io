# 数据传递
[](https://doc.quickapp.cn/tutorial/framework/switching-pages-and-passing-parameters.html)
接收参数
现在，开发者已经掌握了通过组件a和接口router在页面之间传递参数的方法，如何接收参数呢？

其实很简单，组件a和接口router传递的参数的接收方法完全一致：在页面的ViewModel的protected属性中声明使用的属性

注意：

protected内定义的属性，允许被应用内部页面请求传递的数据覆盖，不允许被应用外部请求传递的数据覆盖
若希望参数允许被应用外部请求传递的数据覆盖，请在页面的ViewModel的public属性中声明使用的属性



## 回传参数

假设存在页面A和页面B，先从页面A跳转至页面B，然后从页面B返回到页面A时，需要传递参数

此时，组件a和接口router传参不能满足需求，可以借助于app级别的对象：this.$app.$data

页面A实现代码如下：
```html
<template>
  <div class="tutorial-page">
    <a href="/PageParams/returnParams/pageb">跳转到页面B</a>
    <text>{{msg}}</text>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    margin-top: 75px;
    font-size: 30px;
    color: #09ba07;
    text-decoration: underline;
  }
</style>

<script>
  export default {
    private: {
      msg: ''
    },
    onInit () {
      this.$page.setTitleBar({ text: '页面A' })
    },
    onShow () {
      // 页面被切换显示时，从数据中检查是否有页面B传递来的数据
      if (this.$app.$data.dataPageB && this.$app.$data.dataPageB.gotoPage === 'pageA') {
        // 从数据中获取回传给本页面的数据
        const data = this.$app.$data.dataPageB.params
        this.msg = data.msg
      }
    }
  }
</script>
```
页面B实现代码如下：

```html
<template>
  <div class="tutorial-page">
    <text>页面B</text>
    <input style="width: 450px;" placeholder="请输入回传给页面A的信息" onchange="updateMsg"/>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
  export default {
    private: {
      msg: ''
    },
    onInit () {
      this.$page.setTitleBar({ text: '页面B' })
    },
    onHide () {
      // 页面被切换隐藏时，将要传递的数据对象写入
      this.$app.$data.dataPageB = {
        gotoPage: 'pageA',
        params: {
          msg: this.msg
        }
      }
    },
    updateMsg (e) {
      // 更新input输入的信息文本
      this.msg = e.text
    }
  }
</script>
```