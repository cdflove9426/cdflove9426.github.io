# Nginx
用root 权限 监听80端口，把80端口进来的流量分配给另外的端口，实现服务代理。
一般服务器上有多个应用，借助Nginx ,实现端口的代理，负载均衡，来判断是来至哪个域名或者ip的访问。从而根据配置的规则，将请求原封不动转发给特定的端口，或者特定的机器。

服务器有可能默认使用apache2 根据情况**别把后端的环境给毁了**。。。。
```shell
sudo service apache2 stop
update-rc.d -f apache2 remove ## 删除 apache
sudo apt-get remove apache2 ## 移除apache

```

```shell
sudo apt-get update ## 更新包列表
```

## 安装Nginx
```shell
sudo apt-get install nginx

nginx -v  ## 查看版本

cd /etc/nginx/  # 进入 查看conf.d
```


## 配置Nginx
进入 `/etc/nginx/conf.d` 并通过 `sudo vi xxxxxxx.conf` 创建文件
可以这样命名:`caicai-com-8081.conf `
方便清楚对应网站、端口


通过ip 地址访问到指定端口
[配置可以参考网络(https://blog.csdn.net/nipanlong001/article/details/52639386)

caicai-com-8081.conf
```conf 
upstream projectname{
    server 127.0.0.1:8081;
}
server {
    listen 80;
    server_name 111.111.111.1;  # 所有请求这个端口都转入到upstream projectname

    location / {   # /表示根目录，该配置表示Nginx默认打开/www下的index.html 
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Nginx-Proxy true;
         
        proxy_pass http://projectname;
        proxy_redirect off;
    }
}
```


## 执行nginx
执行nginx
```shell
sudo nginx -t 
sudo nginx -s  reload  # 重启
```

如果出现以下问题：
`sudo: unable to resolve host i` 可能是，阿里云 安全组的问题， 没有在安全组中加入80端口 

又或者
[sudo 出现unable to resolve host 解决方法](https://blog.csdn.net/ichuzhen/article/details/8241847)
如果ubuntu修改文件的时候一直提示:
`sudo:unable to resolve host abc`
那么就需要修改`/etc/hosts`文件: 
如果之前为
```shell
127.0.0.1 localhost
```
变更为:
```shell
127.0.0.1 localhost
127.0.1.1 hostname
```

`hostname` 为主机名,查看文件:`/etc/hostname `获得



## 隐藏在浏览器访问的时候nginx 配置

默认浏览器访问的时候会在响应头看到这样的数据
```
Connection: keep-alive
Content-Type: text/plain
Date: Thu, 07 Jun 2018 05:05:15 GMT
Server: nginx/1.4.6 (Ubuntu)       《------
Transfer-Encoding: chunked
```

通过以下配置 进行隐藏为 `Server: nginx`
```shell
sudo vi nginx.conf

```
```conf
    ##
    # Basic Settings
    ##

    # server_tokens off;  #  去掉注释就好了
```

`sudo service nginx reload` 重载就好了。
 
