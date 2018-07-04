# pm2 
让服务后台运行 ，出错的时候自动重启。
pm2是一个进程管理工具,可以用它来管理你的node进程，并查看node进程的状态，当然也支持性能监控，进程守护，负载均衡等功能。
[NodeJs之pm2
](https://www.cnblogs.com/zqzjs/archive/2016/12/22/6210645.html#pm2)
```
npm i pm2 -g
```


开启服务

`pm2 start app.js `

`pm2 list` 查看所有服务
`pm2 show app` 查看详细服务信息
`pm2 logs` 查看打印的日志
