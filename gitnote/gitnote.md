# git 

[git教程](http://www.liaoxuefeng.com/)

[mac 上使用git](http://blog.csdn.net/android_ls/article/details/46287879)

[Mac系统Git生成ssh公钥](https://my.oschina.net/u/2340880/blog/658594)

## Git-将已有的项目提交到Git
[Git-将已有的项目提交到Git](http://www.w3cfuns.com/notes/16795/155b7454fed1074c7b45d657efb78db0.html)

[Coding 初级教程（二）——上传已有项目](http://www.cnblogs.com/caicaizi/p/5871062.html)


------------


## 将本地项目提交到coding上托管
Github仓库创建成功，然后开始上传项目了 
在项目的根目录下执行以下命令：

1. git init //初始化项目，执行完此命令后会生成一个.git文件夹 
2. git add . //将本地项目所有文件添加到git管理，.指全部文件 
3. git commit -m “提交描述" 
4. git remote add origin 刚刚新建的Github地址 //将本地项目与远程git仓库关联 
5. git push -u origin master //执行此命令如果出现错误，应该是README.md文件在本地项目中不存在从而导致冲突，我的一贯解决办法就是用这个命令git push -f origin master，强制将本地项目push到远程仓库。在平常的操作中，用这个强制的命令很可能会出现很多问题，建议不要用，不过此处是初始化项目，用这个命令就不会有什么问题了。
 
如果出现问题 又不想强制更新上远程仓库
6. git fetch
7. git merge origin/master 进行合并  （!wq 保存退出）
8. git push -u origin master


## 回滚
```bash
 git reset --hard d2f88f02
 git push origin xxx -force
```

##  删除分支和重新拉取
```bash
//查看本地分支
git branch 

//删除目标分支
git branch -D master

//重新拉取master分支
git checkout master
```

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
[同一台电脑关于多个SSH KEY管理](http://yijiebuyi.com/blog/f18d38eb7cfee860c117d629fdb16faf.html)

### 新生成密钥
在新增私钥的时候，通过 **指定不同的文件名来生成不同的私钥文件**

设置路径,如果不设置默认生成 `id_rsa`  和  `id_rsa.pub`

这种路径就生成 `id_rsa.github`  和  `id_rsa.github.pub`

两种命名方式：`id_rsa_github` `id_rsa.github`

```bash
ssh-keygen -t rsa -f ~/.ssh/id_rsa.work -C "Key for Work stuff"
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "Key for GitHub stuff github账号"
```

或者 跟着地址输入 一样的道理生成自定文件
```bash
ssh-keygen -t rsa 
Enter file in which to save the key (/c/Users/xxx/.ssh/id_rsa): /c/Users/xxx/.ssh/id_rsa_github  
```

### 查看系统ssh-key代理,执行如下命令
```bash
$ ssh-add -l
Could not open a connection to your authentication agent.
# 如果发现上面的提示,说明系统代理里没有任何key,执行如下操作
exec ssh-agent bash
```

如果系统已经有ssh-key 代理 ,执行下面的命令可以删除
```bash
$ ssh-add -D
```

### 把 .ssh 目录下的私钥添加的 ssh-agent
```bash
$ ssh-add ~/.ssh/id_rsa_github
$ ssh-add ~/.ssh/id_rsa_aaa
$ ssh-add ~/.ssh/id_rsa_bbb
```
依次执行把私钥添加到 ssh-key 代理里面

### 打开github 或者 开源中国 ssh 管理页面把 对应的公钥提交保存到代码管理服务器 (.pub 结尾)

### 在 .ssh 目录创建 config 配置文件
```bash
nano ~/.ssh/config
```



新增ssh的配置文件，并修改权限
```bash
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

修改config文件的内容
```yaml
Host github.com  
    IdentityFile ~/.ssh/id_rsa.github  
    User git  

......

Host *.workdomain.com  
    IdentityFile ~/.ssh/id_rsa.work  
    User lee  
 
```

当有多个ssh密钥需要管理时，一定要修改config文件的权限，否则你配置后仍然时无效的

~/.ssh/config文件的内容为：
```yaml
Host github.com
IdentityFile ~/.ssh/id_rsa.github
User git

Host git.coding.net
IdentityFile ~/.ssh/id_rsa.coding
User git
```

Host就是你的git仓库的域名或者IP。


-------------

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
