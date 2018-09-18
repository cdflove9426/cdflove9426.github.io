# 快应用

## 开发工具与条件

开发快应用的前提是拥有一台九大厂商品牌(后来是十大产商)之一的安卓手机，然后注册快应用联盟账号，接着与该手机对应品牌的开发者账号进行绑定，然后照着快应用的开发文档进行开发，最后上传至快应用官网进行测试审核并分发。
目前快应用还不能实现自动统一分发到各个平台去审核。如果想要在每个品牌的应用市场都上架自己的快应用，就需要每个平台的开发者账号都要去填写开发者信息，1-2工作日审核，然后再上架自己的快应用。

### 手机支持
一台九大厂商品牌之一的安卓手机

快应用项目初始化
请根据快应用官方文档的快速入门一节，准备好开发环境，在这里只有一点提醒：假如你的手机还没有直接支持快应用的运行环境（提示没有运行环境），请安装「快应用平台预览版」，通过它进行调试。

# 环境安装
 安装NodeJS
需安装6.0以上版本的NodeJS，请从NodeJS官网下载

## 安装hap-toolkit
通过npm仓库安装，在命令行中执行以下命令：

```bash
npm install -g hap-toolkit
hap -V
```

在命令行中执行hap -V会输出版本信息表示hap-toolkit安装成功，如下命令所示：

## 手机安装调试器


-----------

# 创建项目

```bash
hap init <ProjectName>

npm i
```


**注意**：

如果开发者在后续操作中遇到报错`Cannot find module '.../node_modules/hap-tools/webpack.config.js'`，请运行一次`hap update --force`（执行完毕后不需要按照提示再次运行`npm install`）

这是由于高版本的npm（如：NodeJS v8版本使用npm5）在npm install时，会校验node_modules目录，并删除其中的`hap-tools`文件夹，从而导致报错；开发者运行`hap update --force`，会重新复制hap-tools文件夹到node_modules中

## 怎么查看项目
 
了解项目的目录结构，编译时通过编译工具产出rpk文件，运行时通过调试器安装rpk文件；打通整个流程后，开发者就可以边开发边预览效果了

没有热编译功能，所以每一次修改都需要进行编译
所以`npm run build` ,然后监控`npm run watch ` ,同时需要手机预览`npm run  server`

### 编译
 npm run build

 编译打包成功后，项目根目录下会生成文件夹：`build、dist`

**build**：临时产出，包含编译后的页面js，图片等
**dist**：最终产出，包含rpk文件。其实是将build目录下的资源打包压缩为一个文件，后缀名为rpk，这个rpk文件就是项目编译后的最终产出。

### 自动编译项目
如果希望每次修改源代码文件后，都自动编译项目，请使用如下命令：
`npm run watch`



### 预览 & 调试
**需要先build！！！**
**需要先build！！！**
**需要先build！！！**
```bash
npm run server

# 自定义端口（如：8080）
npm run server -- --port 8080
```

1. **在手机上预览运行效果**  打开调试器 --> 点击"扫码安装"

2. 打开调试器 --> 点击右上角menu --> 设置，输入终端窗口中提示的HTTP服务器地址


# 样式预编译
<!--导入外部文件, 代替style内部样式-->
<style lang="sass" src="./sassFile.sass"></style>

<!--合并外部文件-->
<style lang="sass">
  @import './sassFile.sass';
  .page-sass {
    #testTag {
      .sass-font-text, .sass-font-comma {
        font-size: 60px;
      }
    }
  }
</style>

# 开发调试
打开工程根目录下的src文件夹的manifest.json，找到config配置，将logLevel修改为最低级别debug，即：允许所有级别的日志输出

修改后`<ProjectName>/src/manifest.json`中config配置代码如下：
```js
{
　"config": {
  　　"logLevel": "debug"
  
//   　　"logLevel": "off" //默认
  }
}
```


在js中输出日志
```js
console.debug('debug')
console.log('log')
console.info('info')
console.warn('warn')
console.error('error')
```