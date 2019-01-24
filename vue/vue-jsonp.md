# vue 中使用jsonp
[jsonp](https://www.npmjs.com/package/jsonp)

API
jsonp（url，opts，fn）
url（String）url来获取
opts（Object），可选
param（String）用于指定回调的查询字符串参数的名称（默认为callback）
timeout（Number）发出超时错误后多长时间。0禁用（默认为60000）
prefix（String）前缀用于处理jsonp响应的全局回调函数（默认为__jp）
name（String）处理jsonp响应的全局回调函数的名称（默认为prefix+递增计数器）
fn 打回来
使用err, data参数调用回调。

如果超时，err将是一个Error对象，它message是 Timeout。

返回一个函数，当被调用时，将取消正在进行的jsonp请求（fn不会被调用）。
```js

import Jsonp from "jsonp";

// https://10.9.13.71:8443/cas/messCode?callback=getcas
//返回的数据getcas('TGT-6-ZqLyAaY2A7XyXBsGBrrNUeHZ9N6KYshpQZ6aSC2dRWfDnW5Jp6-cas01.example.org')
Jsonp("https://10.9.13.71:8443/cas/messCode",{
  name:'getcas'
},function(err,data){
  console.log(data);
})
```
