#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 构建
# npm run docs:build
# yarn docs:build

# 进入到构建输出目录
# cd .vuepress/dist

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

# git init
git add -A
git commit -m '20190124'
# git commit -m 'init vuepress source'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:cdflove9426/cdflove9426.github.io.git  master:source_vuepress

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:cdflove9426/blog_vuepress.git master:gh-pages
