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



# 通过vue-router 进行全局分析配置
```js
// wxShare.js
import Vue from 'vue'

// 在组件外使用vux集成的微信jssdk
import { WechatPlugin, AjaxPlugin } from 'vux'

Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)  //这个是vux 封装的axios 


export default function wxShare ({title, desc, link, imgUrl} = {}) {
    Vue.wechat.config({
      debug: false,
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
    Vue.wechat.ready(() => {
      Vue.wechat.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc || '默认分享文案', // 分享描述
        link: link || window.location.href, // 分享链接
        imgUrl: imgUrl || '图标地址（必须是有效的Link）' // 分享图标
      })
      Vue.wechat.onMenuShareTimeline({
        title:  desc || '默认分享文案', 
        link: link || window.location.href, // 分享链接
        imgUrl: imgUrl || '图标地址（必须是有效的Link）' // 分享图标
      })
    })
    Vue.wechat.error((res) => {
    })
}

// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
// Vue.prototype.$wxShare = wxShare

```


在router -》meta 中进行设置分享
```js
// router.js 每个模块都有自己内部的路由配置
const routes = [
    {
        path: '/index',
        name: 'index',
        redirect: '/index/homepage',
        children: [
          {
            path: '/index/homepage',
            name: 'homepage',
            component: homepage
            meta: { 
                wxshare:{
                  title: '分享标题', 
                  desc: 'desc',
                  // link:'http://baidu.com',
                  imgUrl: 'http://baidu.com/png/123123.png'
                }
            }
          },
        ]
      }
]


```
```js

// routerRule，公共路由配置，所有模块共用一个路由控制策略

import wxShare from '@/utils/wxShare'

export default function routerRule (router) {
   
    router.afterEach(( to, from ) => {
      if(to.meta&&to.meta.wxshare){
          wxShare({ title: to.meta.title, desc: to.meta.desc, link: to.meta.shareLink, logo: to.meta.imgUrl})
      }
    })

}
```



## 根据业务逻辑设置的分享内容
```js
// homepage.vue

<script>

export default {

    created() {
        getHomepageInfo()
            .then( res => {
                this.$wxShare({
                    title: `user.name要请您一起来${res.title}`,
                    desc: res.desc,
                    imgUrl: res.logo
                })
            } )
    }
}

</script>
```



如果项目采用非history模式，则需要去掉url上#后的部分传给后端换取微信签名。
根据微信官方说明：
> 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用…
由于SPA应用，url变化之后，需要重新config一次，重新注入当前页面的配置信息，因此这个步骤必须在router.afterEach中调用！因为根据vue-router的说明，在导航被确认之后，再调用全局的afterEach钩子，这个时候导航已经确认了，url已经改变，可以针对更新后的url重新获取微信签名了。

每一次跳转url变化都都需要重新获得签名,这个每次都去请求后端获得新url相互匹配的签名。
感觉有点麻烦，但暂时没有其他办法。。
