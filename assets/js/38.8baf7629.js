(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{193:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._m(1),n("p",[t._v("用一个仓库 ，master存放githubpape ，用分支来保存源码")]),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8),n("p",[t._v("通过分支来保持vuepress项目的配置，以及进行笔记管理")]),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13),t._m(14),t._m(15),t._m(16),t._m(17),n("p",[t._v("禁用特定页面上的侧边栏   OR\n自动生成仅包含当前页面的标题链接的侧边栏")]),t._m(18),t._m(19),t._m(20),t._m(21),n("p",[t._v("通过封装方法，自动将文件名下的文件归类为一个侧边栏属性 :")]),t._m(22),t._m(23),t._m(24),t._m(25),n("p",[n("a",{attrs:{href:"http://brownhu.site/blog/Library/Hexo%E5%B7%B2%E7%BB%8F%E7%9C%8B%E8%85%BB%E4%BA%86%EF%BC%8C%E6%9D%A5%E8%AF%95%E8%AF%95VuePress%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Hexo已经看腻了，来试试VuePress搭建个人博客"),n("OutboundLink")],1)]),n("p",[n("a",{attrs:{href:"https://github.com/vuejs/vuepress/issues/36",target:"_blank",rel:"noopener noreferrer"}},[t._v("Blog Support roadmap"),n("OutboundLink")],1)]),n("p",[n("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/36390666",target:"_blank",rel:"noopener noreferrer"}},[t._v("搭建持续集成、基于vuepress的Github Page --使用travis-ci"),n("OutboundLink")],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"vuepress"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vuepress","aria-hidden":"true"}},[this._v("#")]),this._v(" vuepress")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"代码管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码管理","aria-hidden":"true"}},[this._v("#")]),this._v(" 代码管理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"部署github页面"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#部署github页面","aria-hidden":"true"}},[this._v("#")]),this._v(" 部署github页面")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("vuepress 官网默认是代码写在 "),s("code",[this._v("docs")]),this._v("文件中")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("在 "),s("code",[this._v("docs/.vuepress/config.js")]),this._v(" 中设置正确的 "),s("code",[this._v("base")]),this._v("。")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ul",[n("li",[n("p",[t._v("如果你想要部署到 "),n("code",[t._v("https://<USERNAME>.github.io/")]),t._v("，则可以省略设置 "),n("code",[t._v("base")]),t._v("，因为它默认是"),n("code",[t._v('"/"')]),t._v("。")])]),n("li",[n("p",[t._v("如果你想要部署到 "),n("code",[t._v("https://<USERNAME>.github.io/<REPO>/")]),t._v("（，也就是说你的仓库位于"),n("code",[t._v("https://github.com/<USERNAME>/REPO>）")]),t._v("，将 base 设置为 "),n("code",[t._v('"/<REPO>/"')]),t._v("。")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",{attrs:{start:"2"}},[s("li",[this._v("在项目中创建 deploy.sh，并写入如下内容（根据自己项目的情况，取消高亮行的注释），然后在部署时执行此 shell 脚本：")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token comment"}},[t._v("#!/usr/bin/env sh")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 确保脚本抛出遇到的错误")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("set")]),t._v(" -e\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 构建")]),t._v("\n"),n("span",{attrs:{class:"token function"}},[t._v("npm")]),t._v(" run docs:build\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 进入到构建输出目录 ")]),t._v("\n"),n("span",{attrs:{class:"token function"}},[t._v("cd")]),t._v(" docs/.vuepress/dist\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 如果你是要部署到自定义域名")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# echo 'www.example.com' > CNAME")]),t._v("\n\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" add -A\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),n("span",{attrs:{class:"token string"}},[t._v("'deploy'")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 如果你想要部署到 https://<USERNAME>.github.io")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages")]),t._v("\n\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"在分支保存源码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在分支保存源码","aria-hidden":"true"}},[this._v("#")]),this._v(" 在分支保存源码")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("vuepress默认生成的博客页面 保存在 "),s("code",[this._v(".vuepress/dist/")]),this._v("中，源码管理不需要生产的文件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("git init 整个博客项目")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("git")]),this._v(" init\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",{attrs:{start:"2"}},[s("li",[s("code",[this._v(".gitignore")]),this._v(" 忽略部分文件")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# vuepress dist 去掉生成的文件")]),this._v("\n.vuepress/dist\n\nnode_modules/\n.DS_Store\n\n"),s("span",{attrs:{class:"token punctuation"}},[this._v("..")]),this._v(".\n\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("我们也可以自己生成sh 文件， 把代码源上传到固定的分支上去，"),s("strong",[this._v("不是master")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token comment"}},[t._v("#!/usr/bin/env sh")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 确保脚本抛出遇到的错误")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("set")]),t._v(" -e\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 构建")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# git init")]),t._v("\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" add -A\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),n("span",{attrs:{class:"token string"}},[t._v("'init vuepress source'")]),t._v("\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 如果你想要部署到 https://<USERNAME>.github.io")]),t._v("\n"),n("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" push -f git@github.com:"),n("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("USERNAME"),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("/"),n("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("USERNAME"),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(".github.io.git  master:"),n("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("branchNAME"),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"yaml-front-matter页面配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yaml-front-matter页面配置","aria-hidden":"true"}},[this._v("#")]),this._v(" YAML front matter页面配置")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"导航栏"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导航栏","aria-hidden":"true"}},[this._v("#")]),this._v(" 导航栏")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-md extra-class"},[s("pre",{pre:!0,attrs:{class:"language-md"}},[s("code",[s("span",{attrs:{class:"token hr punctuation"}},[this._v("---")]),this._v("\nnavbar: false  \n"),s("span",{attrs:{class:"token title important"}},[this._v("navbar: auto  \n"),s("span",{attrs:{class:"token punctuation"}},[this._v("---")])]),this._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"嵌套标题链接-nested-header-links"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#嵌套标题链接-nested-header-links","aria-hidden":"true"}},[this._v("#")]),this._v(" 嵌套标题链接(nested header links)")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-md extra-class"},[s("pre",{pre:!0,attrs:{class:"language-md"}},[s("code",[s("span",{attrs:{class:"token hr punctuation"}},[this._v("---")]),this._v("\n"),s("span",{attrs:{class:"token title important"}},[this._v("sidebarDepth: 2\n"),s("span",{attrs:{class:"token punctuation"}},[this._v("---")])]),this._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"config-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-js","aria-hidden":"true"}},[this._v("#")]),this._v(" config.js")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("过滤  "),s("code",[this._v("/(^_|[^(md)]$)/")]),this._v("   _开头 和不是 md 结尾的文件 如：xxx.jpg 或者_xxx.md")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("  sidebar"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),n("span",{attrs:{class:"token function"}},[t._v("gensildbarCf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'gulp'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'gulp文档'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),n("span",{attrs:{class:"token function"}},[t._v("gensildbarCf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'vue'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'vue文档'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" fs "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("require")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'fs'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" path "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("require")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'path'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" join "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("require")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'path'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),n("span",{attrs:{class:"token comment"}},[t._v("// 生成类似")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// {")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//   title: 'Group 1',")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//   collapsable: false,")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//   children: [")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//     '/gulp/bbb.md',")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//     '/gulp/build-bushu.md',")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//     '/gulp/build-gulp.md',")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("//   ]")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("// },")]),t._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("gensildbarCf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dirName"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" title"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collapsable "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token boolean"}},[t._v("true")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token comment"}},[t._v("//   获得路径下文件名 array")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{attrs:{class:"token function-variable function"}},[t._v("genFilesByDir")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("startPath"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" files "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("readdirSync")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("startPath"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" reg "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token regex"}},[t._v("/(^_|[^(md)]$)/")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// _开头 和不是 md 结尾的")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" files"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("reduce")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("preitem"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" item"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("reg"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("test")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        preitem"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("push")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token template-string"}},[n("span",{attrs:{class:"token string"}},[t._v("`/")]),n("span",{attrs:{class:"token interpolation"}},[n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("startPath"),n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{attrs:{class:"token string"}},[t._v("/")]),n("span",{attrs:{class:"token interpolation"}},[n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("item"),n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),n("span",{attrs:{class:"token string"}},[t._v("`")])]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" preitem"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    title"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    collapsable"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    children"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("genFilesByDir")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dirName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nmodule"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Hello VuePress CAICAI'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  description"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Just playing around'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{attrs:{class:"token comment"}},[t._v("// base:'/blog_vuepress/',")]),t._v("\n  searchMaxSuggestions"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("6")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  head"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'link'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" rel"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'icon'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" href"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token template-string"}},[n("span",{attrs:{class:"token string"}},[t._v("`/logo.png`")])]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'link'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" rel"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'manifest'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" href"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/manifest.json'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'meta'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'theme-color'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'#3eaf7c'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'meta'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'apple-mobile-web-app-capable'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'yes'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'meta'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'apple-mobile-web-app-status-bar-style'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'black'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'link'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" rel"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'apple-touch-icon'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" href"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token template-string"}},[n("span",{attrs:{class:"token string"}},[t._v("`/icons/apple-touch-icon-152x152.png`")])]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'link'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" rel"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'mask-icon'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" href"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/icons/safari-pinned-tab.svg'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" color"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'#3eaf7c'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'meta'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'msapplication-TileImage'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/icons/msapplication-icon-144x144.png'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token string"}},[t._v("'meta'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'msapplication-TileColor'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'#000000'")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  themeConfig"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    nav"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        text"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Home'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        link"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        items"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            text"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'vue'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            link"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/gulp/'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            text"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Vue'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            items"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                text"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Chinese'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                link"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/source/gulp/build-bushu'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n          "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        text"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'Guide'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        link"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'/guide/'")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    sidebar"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),n("span",{attrs:{class:"token function"}},[t._v("gensildbarCf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'gulp'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'gulp文档'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),n("span",{attrs:{class:"token function"}},[t._v("gensildbarCf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v("'vue'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'vue文档'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n \n\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[this._v("#")]),this._v(" 参考")])}],!1,null,null,null);s.default=e.exports}}]);