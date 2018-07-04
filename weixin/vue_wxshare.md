# Vue项目全局配置微信分享实践

区分一般和特殊，一般情况，全局配置默认分享文案；特殊情况分两种，一种是分享内容不需要异步获取，则在路由跳转时配置，另一种是分享内容需要异步获取，则需要待异步内容获取后更新分享内容。
不需要异步获取的内容我们采用定义在路由元信息的方式，直接在每次路由跳转之后调用公共函数更新分享内容。


```js
isweixin() {
   const ua = window.navigator.userAgent.toLowerCase();
   if(ua.match(/MicroMessenger/i) == 'micromessenger'){
     return true;
   } else {
     return false;
   }
 },
```

## vue-cli中怎么引入微信分享的sdk，
```bash
npm install weixin-js-sdk --save-dev
```
```js
import wx from 'weixin-js-sdk';
```

微信分享中最重要的是获取到签名，才能够实现微信的分享

再根据当前的url去获取到所需要的参数来完成签名的验证，参数主要用appId、nonceStr、timestamp、signature

然后通过wx对象的config方法去进行配置验证签名
```js
wx.config({
    debug: false,
    appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
    timestamp:timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
    jsApiList: [
     'onMenuShareAppMessage','onMenuShareTimeline',
     'onMenuShareQQ','onMenuShareQZone'
    ]
   });
```
```js
//处理验证失败的信息
wx.error(function (res) {
 logUtil.printLog('验证失败返回的信息:',res);
});
//处理验证成功的信息
wx.ready(function () {
//       alert(window.location.href.split('#')[0]);
 //分享到朋友圈
 wx.onMenuShareTimeline({
  title: _this.newDetailObj.title, // 分享标题
  link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: _this.newDetailObj.thu_image, // 分享图标
  success: function (res) {
   // 用户确认分享后执行的回调函数
   logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
   _this.showMsg("分享成功!")
  },
  cancel: function (res) {
   // 用户取消分享后执行的回调函数
   logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
  }
 });
 //分享给朋友
 wx.onMenuShareAppMessage({
  title: _this.newDetailObj.title, // 分享标题
  desc: _this.desc, // 分享描述
  link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: _this.newDetailObj.thu_image, // 分享图标
  type: '', // 分享类型,music、video或link，不填默认为link
  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  success: function (res) {
   // 用户确认分享后执行的回调函数
   logUtil.printLog("分享给朋友成功返回的信息为:",res);
  },
  cancel: function (res) {
   // 用户取消分享后执行的回调函数
   logUtil.printLog("取消分享给朋友返回的信息为:",res);
  }
 });
 //分享到QQ
 wx.onMenuShareQQ({
  title: _this.newDetailObj.title, // 分享标题
  desc: _this.desc, // 分享描述
  link: window.location.href.split('#')[0], // 分享链接
  imgUrl: _this.newDetailObj.thu_image, // 分享图标
  success: function (res) {
   // 用户确认分享后执行的回调函数
   logUtil.printLog("分享到QQ好友成功返回的信息为:",res);
  },
  cancel: function (res) {
   // 用户取消分享后执行的回调函数
   logUtil.printLog("取消分享给QQ好友返回的信息为:",res);
  }
 });
 
 //分享到QQ空间
 wx.onMenuShareQZone({
  title: _this.newDetailObj.title, // 分享标题
  desc: _this.desc, // 分享描述
  link: window.location.href.split('#')[0], // 分享链接
  imgUrl: _this.newDetailObj.thu_image, // 分享图标
  success: function (res) {
   // 用户确认分享后执行的回调函数
   logUtil.printLog("分享到QQ空间成功返回的信息为:",res);
  },
  cancel: function (res) {
   // 用户取消分享后执行的回调函数
   logUtil.printLog("取消分享到QQ空间返回的信息为:",res);
  }
 });
});
```

**config:invalid signature，说明签名不对**
看了网上很多都是url需要进行编码，我也是这样做的，但一直出现config:invalid signature
```js
// let url = encodeURIComponent(window.location.href.split('#')[0]);
 
let url = window.location.href.split('#')[0];
```
