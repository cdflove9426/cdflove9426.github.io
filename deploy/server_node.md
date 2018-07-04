# 搭建node.js 生成环境

更新系统
```shell
sudo apt-get update
```

一次性安装多个
```shell
sudo apt-get install  vim openssl build-essential libssl-dev wget curl git
```

## 安装，配置nodejs

### 先安装 nvm
linux 管理node 可以使用 [nvm]
(https://github.com/creationix/nvm)

方便管理和升价node.js 版本

[安装指令](https://github.com/creationix/nvm#install-script)
`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`


### 通过nvm 安装制定版本的node.js
```shell
nvm install v6.9.5
nvm install v10.3.0
...#安装。。。


nvm use v6.9.5
nvm alias default v6.9.5

node -v  # 查看版本
```

### 淘宝镜像
``` shell
# 更换为淘宝镜像
npm --registry=https://registry.npm.taobao.org install -g npm

npm --registry=https://registry.npm.taobao.org install -g cnpm

#系统文件监控数目
echo fs.inotify.max_user_watches=525288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### 安装常用工具包
看需要吧
`npm i pm2 webpack gulp grunt-cli -g` 


# 阿里云遇到的问题收集
## 阿里云有默认的安全规则  有点像iptable的作用 限制了端口
[阿里云服务器端口不通的解决办法-安全组的问题](https://blog.csdn.net/Abaneo/article/details/72853513)

## linux 安装Mongodb 

[本地文件上传到Linux服务器的几种方法](http://blog.51cto.com/superw/1943250)

[ubuntu  安装 Mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

**apt 安装不到？**
如果是在阿里云的服务器 ，有时候肯能安装包有问题，可能与阿里云的镜像有关系 
只要进入 apt.conf 文件 将镜像配置用`#`注释掉
```
sudo vi /etc/apt/apt.conf
```

**安装数据源慢**
但这样在安装 mongodb源的时候就有点慢。。Ctrl-c 终止下载


在执行下列操作的时候， 其实就是在写入mongodb的源地地址 ，
```shell
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```



```
sudo vi /etc/apt/sources.list.d/mongodb-org-3.6.list 
```
把里面的源强制修改为 阿里云下的服务器的源
`https://repo.mongodb.org/apt.....` =>`http://mirrors.aliyun.com/mongodb/apt`


在更新源 `sudo apt-get update`

安装`suod apt-get install -y mongodb-org`



## 开启服务
```
sudo service mongodb start

cat /var/log/mongodb/mongod.log  # 查看日志文件  确认
```

**注意防火墙是否会禁了mongodb服务端口**


[如果遇到这个问题](https://stackoverflow.com/questions/39343682/sudo-service-mongod-start-mongod-unrecognized-service)
> sudo service mongod start : mongod: unrecognized service

If already you install the mongodb just uninstall based on mongodb config
Before going do all stuff first install mongodb server.
`sudo apt install mongodb-server  `
Then continue to install what mongodb config suggest you.
Once done your mongodb configuration you can go
`sudo service mongodb start`
Note: Its not mongod its mongodb

## 关闭服务
```
sudo service mongodb stop
```

## 修改mongodb默认端口
修改了端口，也需要修改防火墙的配置
`/etc/mongodb.conf` 文件
```shell
net:
    port: 27017  # 修改端口
```



# 设置备份
为mongodb数据库实现定时备份 --通过写定时脚本的方便

## 配置执行脚本
```shell
mkdir backup 
cd backup
mkdir appname 



cd 
mkdir tasks  # 把脚本都写到一个文件 方便管理
cd tasks
vi appname.backup.sh
```

appname.backup.sh
```sh
#!/bin/sh

backUpFolder = /home/cdf/backup/appname
date_now=`data +%Y_%m_%d_%H%M`
backFileName = appname_$data_now

cd $backUpFolder  # 备份目录
mkdir -p $backFileName 
mongodump - h 127.0.0.1:19999 -d cc-datebase -u cc-backuper -p 123123123  -o $backFileName

tar zcvf $backFileName.tar.gz $backFileName  # 压缩
rm -rf $backFileName  # 去掉临时目录

# 用户后面备份到七牛云
# NODE_ENV = $backUpFolder@$backFileName   node/home/user/tasks/uploadQiNiu.js
```


-d 数据库
-u 用户名
-p 密码
-o 指定输出文件夹


## 执行脚本


```
cd  # 到根目录
sudo sh ./tasks/appname.backup.sh
```

## 添加定时任务，定时执行备份
```bash
cd
crontab -e # 启动系统nano编辑器
```


```yaml
# m h dom mon dow command
#凌晨十一分的时候 自动执行
11 00 * * * sh /home/user/tasks/appname.backup.sh
#2点的时候 自动执行
00 2 * * * sh /home/user/tasks/appname.backup.sh
#5点的时候 自动执行
00 5 * * * sh /home/user/tasks/appname.backup.sh
```




## 上传备份到数据到七牛云
可以查看七牛 [SDK文档](https://developer.qiniu.com/sdk#official-sdk) ->node.js

`env`的参数 在xxx.backup.sh 文件中添加下面代码进传递
```shell
NODE_ENV = $backUpFolder@$backFileName   node/home/user/tasks/uploadQiNiu.js
```


**uploadQiNiu.js**

需要在同层目录下赞助 qiniu模块
```bash
npm install qiniu
```
```js
var qiniu = require("qiniu");

var parts = process.env.NODE_ENV.split('@')
var file = parts[1]+'.tar.gz'
var filePath = parts[0]+'/' +file
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key';
qiniu.conf.SECRET_KEY = 'Secret_Key';
//要上传的空间
bucket = 'Bucket_Name';
//上传到七牛后保存的文件名
key = file;
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);
//要上传文件的本地路径
// filePath = './ruby-logo.png'
//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath);
```
