# flyio 支持快应用了
[fly- github](https://github.com/wendux/fly)
[fly 帮助文档](https://wendux.github.io/dist/#/doc/flyio/readme)


> Fly.js 一个基于 Promise 的、强大的、支持多种 JavaScript 运行时的 http 请求库. 有了它，您可以使用一份 http 请求代码在浏览器、微信小程序、Weex、Node、React Native、快应用中都能正常运行。同时可以方便配合主流前端框架 ，最大可能的实现 Write Once Run Everywhere。

**为了方便 axios 使用者迁移，fly.js API 设计风格和 axios 相似（但不完全相同）！**

## 在快应用中引入

为了方便 axios 使用者迁移，fly.js API 设计风格和 axios 相似（但不完全相同）！

```js
  "features": [
     ...
    {"name": "system.fetch"}
  ]



//依赖快应用中的fetch模块，需要在
 var fetch = require("@system.fetch")
 var Fly=require("flyio/dist/npm/hap")
 var fly=new Fly(fetch)
```

# 例子

下面示例如无特殊说明，则在所有支持的平台下都能执行。

## 发起GET请求
```js
//通过用户id获取信息,参数直接写在url中
fly.get('/user?id=133')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```

query参数通过对象传递
```js
fly.get('/user', {
      id: 133
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```
## 发起POST请求

```js
fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 发起多个并发请求
```js
function getUserRecords() {
  return fly.get('/user/133/records');
}

function getUserProjects() {
  return fly.get('/user/133/projects');
}

fly.all([getUserRecords(), getUserProjects()])
  .then(fly.spread(function (records, projects) {
    //两个请求都完成
  }))
  .catch(function(error){
    console.log(error)
  })
```



## 直接通过 request 接口发起请求

直接调用request函数发起post请求
```js
fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //超时设置为5s
 })
.then(d=>{ console.log("request result:",d)})
.catch((e) => console.log("error", e))

```


##  发送URLSearchParams
```js
const params = new URLSearchParams();
params.append('a', 1);
fly.post("",params)
.then(d=>{ console.log("request result:",d)})
```



# 全局配置
Fly配置支持实例级配置和单次请求配置,/定义公共headers
```js
fly.config.headers={xx:5,bb:6,dd:7}
//设置超时
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL="https://wendux.github.io/"

```

单次请求配置只对当次请求有效：
```js
fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //本次请求超时设置为5s
})
```


# 拦截器
Fly支持请求／响应拦截器，可以通过它在请求发起之前和收到响应数据之后做一些预处理
```js
//添加请求拦截器
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
    request.headers["X-Tag"]="flyio";
  	//打印出请求体
  	console.log(request.body)
  	//终止请求
  	//var err=new Error("xxx")
  	//err.request=request
  	//return Promise.reject(new Error(""))
  
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
)

```


# 挂载在app对象上
```js
  var fetch = require("@system.fetch")
  var Fly=require("flyio/dist/npm/hap")
  var fly=new Fly(fetch)
  fly.config.baseURL = 'http://www.dtworkroom.com/doris/1/2.0.0/'
  export default {
    showMenu: util.showMenu,
    createShortcut: util.createShortcut,
    onCreate(){
      this.$http=fly;
    }
  }

```

```js
this.$app.$http.post("test").then((d)=>{
    this.data=d.data;
   //console.log(JSON.stringify(d))
})
```