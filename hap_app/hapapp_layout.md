# 快应用布局

## 盒模型
框架使用border-box模型，暂不支持content-box模型与box-sizing属性

布局所占宽度Width：

Width = width(包含padding-left + padding-right + border-left + border-right)

布局所占高度Height:

Height = height(包含padding-top + padding-bottom + border-top + border-bottom)


**快应用整体基于 Flex 布局：**

display 默认 flex，支持的参数为 flex | none；
position 默认 none，支持的参数为 fixed | none；
宽、高、长度值只能使用 px 或 %。

```css
/* 有剩余空间时，允许被拉伸 */
flex-grow: 1;
/* 空间不够用时，不允许被压缩 */
flex-shrink: 0;
```


## 长度单位
框架目前仅支持长度单位px和%。与传统web页面不同，px是相对于项目配置基准宽度的单位，已经适配了移动端屏幕，其原理类似于rem。
项目配置基准宽度：项目的配置文件（<ProjectName>/src/manifest.json）中config.designWidth的值，默认为750

> 所以px 不是px ,他会根据 `config.designWidth` 进行变化




# 动态样式

动态修改样式有多种方式，与传统前端开发习惯一致，包括但不限于以下：

修改class：更新组件的class属性中使用的变量的值
修改内联style：更新组件的style属性中的某个CSS的值
示例如下：
```html
<template>
  <div style="flex-direction: column;">
    <!-- 修改class -->
    <text class="normal-text {{className}}" onclick="changeClassName">点击我修改文字颜色</text>
    <!-- 修改内联style -->
    <text style="color: {{textColor}}" onclick="changeInlineStyle">点击我修改文字颜色</text>
  </div>
</template>

<style>
  .normal-text {
    font-weight: bold;
  }
  .text-blue {
    color: #0faeff;
  }
  .text-red {
    color: #f76160;
  }
</style>

<script>
  export default {
    private: {
      className: 'text-blue',
      textColor: '#0faeff'
    },
    onInit () {
      this.$page.setTitleBar({ text: '动态修改样式' })
    },
    changeClassName () {
      this.className = 'text-red'
    },
    changeInlineStyle () {
      this.textColor = '#f76160'
    }
  }
</script>
```


# 引入预编译
less语法可以参考外部文档Less.js中文文档等，这里不做过多讲解

使用less请先安装相应的类库：less、less-loader，详见文档style样式 --> 样式预编译；然后在<style>标签上添加属性lang="less"

引入sass
```bash
cnpm i node-sass sass-loader -D
```


示例如下：
```html
<template>
  <div class="tutorial-page">
    <text id="title">less示例!</text>
  </div>
</template>

<style lang="less">
  /* 引入外部less文件 */
  @import './style.less';
  /* 使用less */
  .tutorial-page {
    justify-content: center;
    background-color: #00beaf;

    #title {
      color: #FF0000;
    }
  }
</style>
```

# 伪类
任何组件中，如果某个属性是boolean类型且默认值为false时，均可通过该属性名字来声明伪类，当属性变为true时伪类生效，例如所有组件的disabled属性、input组件的checked属性等

另外部分组件会有其他形式的伪类支持，比如input组件可以通过主动调用focus方法，或者用户操作获得焦点，使得focus伪类生效，详情请参考各组件内部说明

在1010+版本上提供了active伪类的支持，当用户按下组件时该伪类生效。其中默认可点击的组件（input, a, picker, switch等）声明即有效，非默认可点击组件（image, text, div, stack等）声明该伪类后须同时监听click事件才有效果
```html
<template>
  <div class="doc-page">
    <input type="button" class="btn" disabled="{{btndisabled}}" value="Click" onclick="btnClick" />
  </div>
</template>

<style>
  .doc-page {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .btn {
    width: 360px;
    height: 120px;
    background-color: red;
  }
  .btn:disabled{
    background-color: green;
  }
</style>

<script>
  export default {
    data: {
      btndisabled: false
    },
    btnClick () {
      this.btndisabled = true
    }
  }
  </script>

```
当组件的disabled属性变为true时，disabled伪类的样式生效，叠加到原有样式上，例子中background-color会从红色变成绿色