# _wx_webdev
 
[微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)
[移动端页面分享到微信的方案](http://feizhaojun.com/?p=761)
[实现手机网页调起原生微信朋友圈分享的工具nativeShare.js](https://blog.wangjunfeng.com/archives/618)
[传说中的WeixinJSBridge和微信rest接口](http://www.cnblogs.com/grimm/p/5489972.html)

[点击网页分享按钮，触发微信分享功能](http://www.cnblogs.com/grimm/p/5489936.html)

[HTML5网页如何调用浏览器APP的微信分享功能？](https://segmentfault.com/q/1010000002539562?_ea=313592#a-1020000002912654)



有人是这样调用微信接口
```
if(document.addEventListener){
   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else if(document.attachEvent){
   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
}
```

## 微信分享(自己写的)
直接使用
```js
var _wxShare = new WxShare({
    link: location.href,
    getLocation: true, //
    title: "关注“华南康师傅经典奶茶”公众号更多精彩活动等你来",
    desc: "关注“华南康师傅经典奶茶”公众号更多精彩活动等你来"
});

//使用地理坐标
var locInfo = _wxShare.loactionInfo || {};
//  latitude: locInfo.latitude,
//  longitude: locInfo.longitude
```

```js
// new WxShare({
//     link: location.href,
//     title: "modaeran ",
//     desc: "",
//     canShare:true  //默认为true
//      getLocation:false,  //_wxshar.loactionInfo
//     // imgUrl:""
// })

function WxShare(conf) {
    this.getURLParam = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };

    this.loactionInfo = null;
    this.config = {
        appId: "wx20b08768217a65d8",
        timestamp: "1465296399", // 必填，生成签名的时间戳
        nonceStr: "1846399426", // 必填，生成签名的随机串
        url: conf && conf.url || '', //接口地址
        imgUrl: conf.imgUrl || "http://ridli.cn/web/images/ksf_wx_fenx1.jpg",
        title: conf && conf.title || '华南康师傅经典奶茶',
        link: conf.link || 'http://ridli.cn/index.html',
        desc: conf.desc || '华南康师傅经典奶茶',

        // 不开启分享接口
        canShare: conf.canShare == false ? false : true,
        getLocation: conf.getLocation == true ? true : false,
        // circleFunction: conf && conf.circleFunction || function() {},
        // friendFunction: conf && conf.friendFunction || function() {},
        afterReady: conf && conf.afterReady || function(d) {}
    };
    this.init();
}


WxShare.prototype.init = function() { //获取用户信息
    var self = this;
    $.ajax({
        url: "../ajax/userAjaxController/shareWx",
        type: "post",
        data: { url: window.location.href },
        success: function(data) {
            if (data.resultCode == 0) {
                self.config.signature = data.resultData // 必填，签名，见附录1   
            }
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: self.config.appId, // 必填，公众号的唯一标识
                timestamp: self.config.timestamp, // 必填，生成签名的时间戳
                nonceStr: self.config.nonceStr, // 必填，生成签名的随机串
                signature: self.config.signature, // 必填，签名，见附录1
                jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        // 'onMenuShareQZone',
                        // 'startRecord',
                        // 'stopRecord',
                        // 'onVoiceRecordEnd',
                        // 'playVoice',
                        // 'pauseVoice',
                        // 'stopVoice',
                        // 'onVoicePlayEnd',
                        // 'uploadVoice',
                        // 'downloadVoice',
                        // 'chooseImage',
                        // 'previewImage',
                        // 'uploadImage',
                        // 'downloadImage',
                        // 'translateVoice',
                        // 'getNetworkType',
                        // 'openLocation',
                        'getLocation',
                        // 'hideOptionMenu',
                        // 'showOptionMenu',
                        // 'hideMenuItems',
                        // 'showMenuItems',
                        // 'hideAllNonBaseMenuItem',
                        // 'showAllNonBaseMenuItem',
                        // 'closeWindow',
                        // 'scanQRCode',
                        // 'chooseWXPay',
                        // 'openProductSpecificView',
                        // 'addCard',
                        // 'chooseCard',
                        // 'openCard'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function() {

                // $("#testWx").click(function(e) {
                //     e.preventDefault();
                //     //分享朋友
                //     wx.onMenuShareAppMessage({
                //         title: title, // 分享标题
                //         desc: desc, // 分享描述
                //         link: link, // 分享链接
                //         imgUrl: imgUrl, // 分享图标
                //         success: function() {
                //             alert("感谢分享");
                //         },
                //         cancel: function() {
                //             // 用户取消分享后执行的回调函数
                //         }
                //     });

                // });
                // 

                // 地理位置
                // 
                if (self.config.getLocation) {
                    self.loactionInfo = self.getLoaction();
                }

                //分享到朋友圈
                //


                if (self.config.canShare) {

                    wx.onMenuShareTimeline({
                        title: self.config.title, // 分享标题
                        link: self.config.link, // 分享链接
                        imgUrl: self.config.imgUrl, // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            console.log("分享朋友成功");
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到qq
                    wx.onMenuShareQQ({
                        title: self.config.title, // 分享标题
                        desc: self.config.desc, // 分享描述
                        link: self.config.link, // 分享链接
                        imgUrl: self.config.imgUrl, // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            console.log("分享QQ")
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享朋友
                    wx.onMenuShareAppMessage({
                        title: self.config.title, // 分享标题
                        desc: self.config.desc, // 分享描述
                        link: self.config.link, // 分享链接
                        imgUrl: self.config.imgUrl, // 分享图标
                        success: function() {
                            console.log("分享朋友");
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                }
            });

        }

    });
}


WxShare.prototype.getLoaction = function() {
    var self = this;
    wx.getLocation({
        success: function(res) {
            console.log(JSON.stringify(res));
            self.loactionInfo = res;
            return res;
        },
        cancel: function(res) {
            console.log('用户拒绝授权获取地理位置');
        }
    });
}

```
