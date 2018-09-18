# node 一些小笔记

##  Node.js process.argv

process.argv返回命令行脚本的各个参数组成的数组。

可以获取bat里面的参数


 
 * 通过process.argv读取命令行参数，其构造如下
 * 1.process.argv返回为是一个数组形式
 * 2.process.argv[0] 当前命令,一般为node，因为通过node执行
 * 3.process.argv[1] 当前命令执行的脚本完整路径
 * 4.process.argv[2,n] 命令参数
 

 
```js
//这里要实现通过命令行传参数进行求和的算法

console.log("1.当前执行的命令为：",process.argv[0]);
console.log("2.执行的脚本地址为：",process.argv[1]);
//这里截取参数数组中有效的参数列表
var params = process.argv.slice(2);
console.log("3.执行的命令参数为：",params);


```

```bash
node process-argv.js 1 2 H 3 4
1.当前执行的命令为： node
2.执行的脚本地址为： /home/code/workspace/node/core/process-argv.js
3.执行的命令参数为： [ '1', '2', 'H', '3', '4' ]
4.计算后的有效值的和为： 10

```

# node.js 命令行框架 yargs 和你的程序实现交互
[node.js 命令行框架 yargs 和你的程序实现交互](http://yijiebuyi.com/blog/a3ea13c5d7a40ac9cb55e2f29d5f4619.html)