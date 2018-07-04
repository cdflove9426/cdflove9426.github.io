[微信JSSDK实现微信分享](https://www.jianshu.com/p/b228ef31f8ba)

[如何用本机调试微信jssdk](https://www.jianshu.com/p/60cf31144c10)
[微信分享jssdk的误区](https://www.jianshu.com/p/cc7475a102df)
[微信网页授权、JSSDK授权](https://www.jianshu.com/p/db76edb7b615)

[导致微信JSSDK 自定义分享内容接口失效的一种原因](https://www.jianshu.com/p/c7c88b182d4d)
```js
function is_weixin() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        var isWeixin = is_weixin();
```

// main.js
Vue.prototype.SDKRegister = (that, callback) => {
  // 接入微信JSSDK
  // 获取微信JSSDK配置
  let url = that.webUrl
  that.$http.get(url).then(res => {
    res = res.body
    that.$wechat.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名，见附录1
      jsApiList: res.jsApiList
      // jsApiList: [
      //   'checkJsApi',
      //   'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      //   'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      //   'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
      //   'onMenuShareWeibo' // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      // ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
  that.$wechat.ready((res) => {
    that.$wechat.showAllNonBaseMenuItem()
    // 分享到朋友圈
    let link = ''
    let title = ''
    let imgUrl = ''
    let desc = ''
    ...删掉了我业务相关变量的内容定义
    that.$wechat.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success () {
        // 用户确认分享后执行的回调函数
        that.$alert('分享成功', 'success')
      },
      cancel () {
        // 用户取消分享后执行的回调函数
      }
    })
    // 分享给朋友
    that.$wechat.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        that.$alert('分享成功', 'success')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
    // 如果需要定制ready回调方法
    if(callback){
      callback.call(that)
    }
  })
}

// 要用到定位的页面
beforeCreate () {
  this.SDKRegister(this, () => {
    this.$wechat.getLocation({
      success (res) {
        let citylocation = new qqMap.CityService({
          complete (results) {
            let location = results['detail']['detail'].split(',')
            that.$store.commit('city', location[1])
            window.localStorage.city = location[1]
          }
        })
        let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
        let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
        // 设置经纬度信息
        let latLng = new qqMap.LatLng(latitude, longitude)
        // 调用城市经纬度查询接口实现经纬查询
        citylocation.searchCityByLatLng(latLng)
      },
      cancel: function () {
        // 这个地方是用户拒绝获取地理位置
      }
    })
  })
}


 
<!-- toc -->
<!-- more -->
[微信浏览器调用手机摄像头录像](http://blog.csdn.net/u014718731/article/details/53156186)
[HTML5 实现扫描识别二维码 生成二维码](http://blog.csdn.net/jerome_s/article/details/47981825)


http://bbs.csdn.net/topics/391813841?page=1

https://webqr.com/index.html

[h5端呼起摄像头扫描二维码并解析](http://www.cnblogs.com/yisuowushinian/p/5145262.html)
[web/html5调用摄像头实现二维码扫描](http://blog.csdn.net/xuewufeifang/article/details/49756099)
