
# webpack 设置代理

[webpack配置-devserver.proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy)
```js
proxy:{
  '/api': {
            target: 'http://localhost:8080', // 可以请求本地接口 也可以是线上接口
            //secure: false,      // 如果是https接口，需要配置这个参数
            changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置
            pathRewrite: {
              '^/api': ''
            }
        }
}

```
