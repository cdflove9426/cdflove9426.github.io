# vuepress

## 代码管理
用一个仓库 ，master存放githubpape ，用分支来保存源码

## 部署github页面
**vuepress 官网默认是代码写在 `docs`文件中**

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。 

*  如果你想要部署到 `https://<USERNAME>.github.io/`，则可以省略设置 `base`，因为它默认是` "/"`。

*  如果你想要部署到 `https://<USERNAME>.github.io/<REPO>/`（，也就是说你的仓库位于` https://github.com/<USERNAME>/REPO>）`，将 base 设置为 `"/<REPO>/"`。

2. 在项目中创建 deploy.sh，并写入如下内容（根据自己项目的情况，取消高亮行的注释），然后在部署时执行此 shell 脚本：
```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 构建
npm run docs:build

# 进入到构建输出目录 
cd docs/.vuepress/dist

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

```

##  在分支保存源码
通过分支来保持vuepress项目的配置，以及进行笔记管理

vuepress默认生成的博客页面 保存在 `.vuepress/dist/`中，源码管理不需要生产的文件

1. git init 整个博客项目
```bash
git init
```


2. `.gitignore` 忽略部分文件
```bash
# vuepress dist 去掉生成的文件
.vuepress/dist

node_modules/
.DS_Store

...

```


我们也可以自己生成sh 文件， 把代码源上传到固定的分支上去，**不是master**
```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 构建

# git init
git add -A
git commit -m 'init vuepress source'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git  master:<branchNAME>

```


## YAML front matter页面配置

### 导航栏
禁用特定页面上的侧边栏   OR
自动生成仅包含当前页面的标题链接的侧边栏
```md
---
navbar: false  
navbar: auto  
---
```
### 嵌套标题链接(nested header links)

```md
---
sidebarDepth: 2
---
```


## config.js

通过封装方法，自动将文件名下的文件归类为一个侧边栏属性 :

过滤  `/(^_|[^(md)]$)/`   _开头 和不是 md 结尾的文件 如：xxx.jpg 或者_xxx.md
```js
  sidebar: [
      gensildbarCf('gulp', 'gulp文档'),
      gensildbarCf('vue', 'vue文档'),
    ]
```

```js
let fs = require('fs');
let path = require('path');
let join = require('path').join;


// 生成类似
// {
//   title: 'Group 1',
//   collapsable: false,
//   children: [
//     '/gulp/bbb.md',
//     '/gulp/build-bushu.md',
//     '/gulp/build-gulp.md',
//   ]
// },

function gensildbarCf(dirName, title, collapsable = true) {
  //   获得路径下文件名 array
  let genFilesByDir = function (startPath) {
    let files = fs.readdirSync(startPath);
    let reg = /(^_|[^(md)]$)/; // _开头 和不是 md 结尾的
    return files.reduce((preitem, item) => {
      if (!reg.test(item)) {

        preitem.push(`/${startPath}/${item}`);
      }
      return preitem;
    }, [])
  }

  return { 
    title,
    collapsable,
    children: genFilesByDir(dirName)
  }
}

module.exports = {
  title: 'Hello VuePress CAICAI',
  description: 'Just playing around',
  // base:'/blog_vuepress/',
  searchMaxSuggestions: 6,
  head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
      ],
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/',
        items: [{
            text: 'vue',
            link: '/gulp/',
          },
          {
            text: 'Vue',
            items: [{
                text: 'Chinese',
                link: '/source/gulp/build-bushu',
              },
            ]
          }
        ]
      },
      {
        text: 'Guide',
        link: '/guide/'
      }

    ],
    sidebar: [
      gensildbarCf('gulp', 'gulp文档'),
      gensildbarCf('vue', 'vue文档'),
    ]
  }
}

 

```


## 参考
[Hexo已经看腻了，来试试VuePress搭建个人博客](http://brownhu.site/blog/Library/Hexo%E5%B7%B2%E7%BB%8F%E7%9C%8B%E8%85%BB%E4%BA%86%EF%BC%8C%E6%9D%A5%E8%AF%95%E8%AF%95VuePress%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html)

[Blog Support roadmap](https://github.com/vuejs/vuepress/issues/36)


[搭建持续集成、基于vuepress的Github Page --使用travis-ci](https://zhuanlan.zhihu.com/p/36390666)
