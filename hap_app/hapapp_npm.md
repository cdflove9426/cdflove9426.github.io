# npm 命令

## 区分开发生产环境
在hap-toolkit npm 包的源码中可以找到
```js
/**
 * 解析NODE环境的参数
 */
function parseEnv () {
  const config = {
    // 平台：na
    NODE_PLATFORM: process.env.NODE_PLATFORM,
    // 阶段: dv|qa|ol
    NODE_PHASE: process.env.NODE_PHASE,
    // 是否注入测试框架
    NODE_TEST: process.env.NODE_TEST
  }
  colorconsole.info(`配置环境：${JSON.stringify(config)}`)
  return config
}
```

所以可以推断出在js环境中可以或多这些静态配置

```bash
//
npm run release
# 配置环境：{"NODE_PLATFORM":"na","NODE_PHASE":"ol"}


npm run build
#  配置环境：{"NODE_PLATFORM":"na","NODE_PHASE":"dv"}

```
在js环境中如何获得环境参数
```js
console.log(ENV_PLATFORM);  //na
console.log(ENV_PHASE);     // build: dv ||   release||ol
console.log(process.env.NODE_ENV);
console.log(JSON.stringify(process));
console.log(JSON.stringify(process.env));
```