# git 

[git教程](http://www.liaoxuefeng.com/)

[mac 上使用git](http://blog.csdn.net/android_ls/article/details/46287879)

[Mac系统Git生成ssh公钥](https://my.oschina.net/u/2340880/blog/658594)

#Git-将已有的项目提交到Git
[Git-将已有的项目提交到Git](http://www.w3cfuns.com/notes/16795/155b7454fed1074c7b45d657efb78db0.html)

[Coding 初级教程（二）——上传已有项目](http://www.cnblogs.com/caicaizi/p/5871062.html)


------------


## 配置个人信息
> git配置个人信息
```bash
git config user.name caidianfei  
git config user.email caidianfei@163.com  
```


全局设置
```bash
git config --global user.name xiewendong  
git config --global user.email android_ls@163.com  
```

## 本地配置git环境
[win7下配置Git的环境变量](http://jingyan.baidu.com/article/fec4bce271601ff2618d8be3.html)



## 将本地项目提交到coding上托管


Github仓库创建成功，然后开始上传项目了 
在项目的根目录下执行以下命令：

1、git init //初始化项目，执行完此命令后会生成一个.git文件夹 
2、git add . //将本地项目所有文件添加到git管理，.指全部文件 
3、git commit -m “提交描述" 
4、git remote add origin 刚刚新建的Github地址 //将本地项目与远程git仓库关联 
5、git push -u origin master //执行此命令如果出现错误，应该是README.md文件在本地项目中不存在从而导致冲突，我的一贯解决办法就是用这个命令git push -f origin master，强制将本地项目push到远程仓库。在平常的操作中，用这个强制的命令很可能会出现很多问题，建议不要用，不过此处是初始化项目，实用这个命令就不会有什么问题了。
 

## 生成SSH秘钥 公钥添加到github
首先在本地创建ssh key；
```bash
 ssh-keygen -t rsa -C "your_email@youremail.com"  //注意。your_email@youremail.com为用户名
```

`C:\Users\Adminstrator\.ssh`
打开id_rsa.pub，复制里面的key。
回到github上，进入 Account Settings（账户配置），左边选择SSH Keys，Add SSH Key,title随便填，粘贴在你电脑上生成的key。

![Alt text](http://images2015.cnblogs.com/blog/469083/201607/469083-20160722150728435-1965640645.jpg)


## 同时管理多个ssh私钥
[link](https://blog.csdn.net/zxt5105515/article/details/48007193)

首先，在新增私钥的时候，通过指定不同的文件名来生成不同的私钥文件

```bash
ssh-keygen -t rsa -f ~/.ssh/id_rsa.work -C "Key for Work stuff"
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "Key for GitHub stuff"
```


新增ssh的配置文件，并修改权限
```bash
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

修改config文件的内容
```
Host *.workdomain.com  
    IdentityFile ~/.ssh/id_rsa.work  
    User lee  
   
Host github.com  
    IdentityFile ~/.ssh/id_rsa.github  
    User git  
```

-------------
# 基本使用

## init
通过git init命令把这个目录变成Git可以管理的仓库：

```bash
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
```

>init 命令生成.git文件这个目录是Git来跟踪管理版本库的 `ls -ah 可以查看隐藏的文件`

![git init](https://leanote.com/api/file/getImage?fileId=57fcb770ab64413a7e002395)


## add  commit

```bash
$ git add readme.txt
$ git commit -m "wrote a readme file"
[master (root-commit) cb926e7] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```

## statue && diff
**git status**命令可以让我们时刻掌握仓库当前的状态

## log --pretty=oneline

## reset 版本回退
回退：
首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是**HEAD^**，上上一个版本就是**HEAD^^**，当然往上100个版本写100个^比较容易数不过来，所以写成**HEAD~100**。
```bash 
$ git reset --hard HEAD^
```

## relog 查看历史记录
```bash
$ git reflog
ea34578 HEAD@{0}: reset: moving to HEAD^
3628164 HEAD@{1}: commit: append GPL
ea34578 HEAD@{2}: commit: add distributed
cb926e7 HEAD@{3}: commit (initial): wrote a readme file
```

##  checkout --file 撤销修改
```bash
$ git checkout -- readme.txt
```
git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

## rm
命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

## 添加.gitignore
在项目更目录下添加 .gitignore 


--------

# 记录

git没有监控到该文件记录， .gitignore并也没有操作
试试以下操作，重新提交该文件。

```
git rm -rf --cached CocktailMakerModule/
git add CocktailMakerModule/
```


[你必须『收藏』的Github技巧](https://juejin.im/post/58509f8161ff4b00683a360c)
[git step by step  ](https://try.github.io)
