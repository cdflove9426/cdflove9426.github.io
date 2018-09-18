# 路径优化

快应用的 webpack 的配置封装在 npm 包中,通过修改,可以实现以下功能

1. 统一 src 路径

```js
// util.js   -> src/util
import util from '~/util';
```

2. 统一 styles 路径
sass 文件中
```css
@charset "utf-8";
@import '~styles/variables';
.demo-page {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```


## 修改hap-toolkit 中 webpack.config.js文件
hap-toolkit 1010版本

希望1010++ 的版版本不用这样。。。

`node_modules`中找到`hap-toolkit` 包中的`tools` 修改webpack.config.js

定义 `resolve` 中的 `alias`

这里就不要用`@` ,因为已经是被快应用用了。

```js
......
//以这个为基础  
// 项目目录
const pathProject = process.cwd()

//定义一个路径方法
function resolve (dir) {
//   console.log(path.join(pathProject, dir));
  return path.join(pathProject, dir)
}
//
......
// rosolve
resolve: {
    modules: [
      'node_modules',
      // 测试用例在test目录下
      path.join(pathProject, 'test')
    ],


    // ----------------添加的部分------------
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': resolve('src'),
      'styles': resolve('src/assetc/sass'),
      // 'static': resolve('static'),
      'common': resolve('src/common'),
    },
    // ----------------添加的部分  end  ------------
    extensions: ['.webpack.js', '.web.js', '.js', '.json'].concat(FILE_EXT_LIST)
  },
```


# 设置标题

# 菜单按钮
```js
<script>
  export default {
    private: {
      text: '欢迎打开详情页'
    },
    /**
     * 当用户点击菜单按钮时触发，调用app中定义的方法showMenu
     * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
     */
    onMenuPress() {
      this.$app.$def.showMenu()
    }
  }
</script>
```

# 绝对定位，吸顶
[list --吸顶](https://doc.quickapp.cn/tutorial/widgets/list-tutorial.html)

利用`stack`组件 使"列表中的吸顶元素对应的Mask"覆盖列表

猜想： 这样弹窗，和绝对定位的元素应该就有戏了

```html
<template>
  <!-- 利用stack组件，使"列表中的吸顶元素对应的Mask"覆盖列表 -->
  <stack class="tutorial-page">
    <list class="list">
      <!-- 通过监听"列表中的顶部元素"的元素的appear和disappear事件，控制"列表中的吸顶元素对应的Mask"的显示 -->
      <list-item type="top" ondisappear="showMask" onappear="hideMask">
        <div class="height-300 bg-blue">
          <text>列表中的顶部元素</text>
        </div>
      </list-item>
      <!-- 列表中的吸顶元素 -->
      <list-item type="ceiling">
        <div class="height-300 bg-red">
          <text>列表中的吸顶元素</text>
        </div>
      </list-item>
      <!-- 普通列表元素 -->
      <list-item for="list" type="common" class="list-item">
        <text class="text">{{$item}}</text>
      </list-item>
    </list>

    <!-- 列表中的吸顶元素对应的Mask -->
    <div show="{{maskShow}}">
      <div class="height-300 bg-red">
        <text>列表中的吸顶元素</text>
      </div>
    </div>
  </stack>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
    .list {
      width: 750px;
      flex-grow: 1;
      .list-item {
        height: 150px;
        border-bottom-width: 1px;
        border-bottom-color: #0faeff;
        .text {
          flex: 1;
          text-align: center;
        }
      }
    }
    .height-300 {
      height: 300px;
    }
    .bg-red {
      flex-grow: 1;
      justify-content: center;
      background-color: #f76160;
    }
    .bg-blue {
      flex-grow: 1;
      justify-content: center;
      background-color: #0faeff;
    }
  }
</style>

<script>
  export default {
    private: {
      maskShow: false,
      appearCount: 0,
      list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    },
    onInit(){
      this.$page.setTitleBar({ text: '效果展示：吸顶' })
    },
    showMask () {
      this.maskShow = true
    },
    hideMask () {
      // 加载页面时，所有元素的appear事件都会被触发一次。因此，需要过滤第一次的appear事件
      if (this.appearCount) {
        this.maskShow = false
      } else {
        ++this.appearCount
      }
    }
  }
</script>
```