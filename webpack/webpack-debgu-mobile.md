# webpackp 添加移动端调试插件
[vConsole](https://github.com/WechatFE/vConsole)

插件是在 vConsole 的基础上封装的 webpack 插件，通过 webpack 配置即可自动添加 vConsole 调试功能，方便实用。

[vconsole-webpack-plugin](https://github.com/diamont1001/vconsole-webpack-plugin)
vConsole 一个轻量、可拓展、针对手机网页的前端开发者调试面板。


```bash
	
npm install vconsole-webpack-plugin --save-dev

```

```js
// 引入插件
var vConsolePlugin = require('vconsole-webpack-plugin'); 
module.exports = {
    ...
    plugins: [
        new vConsolePlugin({
            enable: true // 发布代码前记得改回 false
        }),
        ...
    ]
    ...
}
```
