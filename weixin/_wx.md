# 微信 jssdk
## 关键词
微信jssdk 外联链接地址
```html
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
```
- **access_token** 令牌 
    access_tonke是公众号全局唯一票据，有效期 2个小时（7200s）秒需要定期刷新，重复获取导致上次获取的失效。

- **jsapi_ticket** 票据
    通过获得access_token 然后 用http GET方式获取`jsapp_ticket`(7200s有效期)

- **singnature** 签名

注意

签名用的noncestr 和timestamp 必须和wx.config中的nonceStr和timestamp 相同。
签名用的url必须是调用JS接口页面的完整URL
为安全考虑，开发真在服务器端实现签名逻辑吧


## 封装 jssdk
获取令牌`token`， 因为令牌每天的限制调用次数和频率，有效期了`7200S` 所以一般前端和后台缓存1个小时也就可以了。

通过`access_token` 获取`jsapi`的`ticket`

获取签名，主要算法是件ticket、noncestr、timestamp 和当前URL(不包含#和后面的内容) 按字母顺序连起来进行`SHA1`签名

如果想验证签名是否符合JSSDK的相关规则或者是否生效，可以访问
[微信JS接口签名校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)

```js
var wxJSSDK ={//声明微信全局变量，防止污染外部环境
    version:"1.0",//版本号
    appName:"", //使用当前库的开发者，可以配置应用名字
    isReady:false,//微信JS SDK是否初始化完毕
    access_token:"",//令牌
    ticket:"",//微信临时票据
    readySuccessCall:[],//微信初始化成功后的执行事务
    config:{
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx60cc0b8b6bb0e83b', // 必填，公众号的唯一标识
        timestamp: Math.ceil(new Date().getTime()/1000).toString(), // 必填，生成签名的时间戳
        nonceStr: 'html5waibao_wxJSSDK', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    },
    /*
     函数功能：初始化
     */
    init:function(){
        if(!wx){//验证是否存在微信的js组件
            alert("微信接口调用失败，请检查是否引入微信js！");
            return;
        }
        var that = this;//保存当前作用域，方便回调函数使用
        //获取令牌
        this.wx_get_token(function(data){
            if(data.access_token){
                Cookie.Set("access_token", data.access_token, 3600);
                that.access_token = data.access_token;
            }
            //获取票据
            that.wx_get_ticket(function(data){
                if(data.ticket){
                    Cookie.Set("ticket", data.ticket, 3600);
                    that.ticket = data.ticket
                }
                //获取签名
                that.wx_get_signature(function(data){
                    that.config.signature = data;
                    that.initWx(function(){//初始化微信接口
                        //初始化完成后的执行
                    });
                });
            });
        });
    },
    //获取令牌
    wx_get_token:function(call){
        this.access_token =  Cookie.Get("access_token");
        if(!Cookie.Get("access_token")){
            $.get("../API/wx_get_token.php", {},
                function(data){
                    call && call(data);
                },"json");
            return;
        }
        call && call({});
    },
    //获取票据
    wx_get_ticket:function(call){
        this.ticket =  Cookie.Get("ticket");
        if(!this.ticket){
            $.get("../API/wx_get_jsapi_ticket.php", {access_token: this.access_token},
                function(data){
                    call && call(data);
                },"json");
            return;
        }
        call && call({});
    },
    //获取签名
    wx_get_signature:function(call){
        $.get("../API/wx_get_signature.php", {
                ticket: this.ticket, // 必填，生成签名的时间戳
                timestamp: this.config.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.config.nonceStr, // 必填，生成签名的随机串
                url: window.location.href // 必填，生成签名的随机串
            },
            function(data){
                call && call(data);
            });
    },
    initWx:function(call, errorCall){//初始化微信接口
        var that = this;
        wx.config(this.config);//初始化配置
        /*config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
         *config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
         *则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
         *则可以直接调用，不需要放在ready函数中。
         * */
        wx.ready(function(){
            that.isReady = true;
            console.log("初始化成功");

            if(that.readySuccessCall.length > 0) {//成功初始化后吗，执行的事务
                $.each(that.readySuccessCall, function(i, n){
                    n();
                });
            }

            call && call();
        });
        /*config信息验证失败会执行error函数，如签名过期导致验证失败，
         *具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
         * 对于SPA可以在这里更新签名。
         * */
        wx.error(function(res){
            that.isReady = "false";
            errorCall && errorCall();
        });
    }
}
//执行初始化
wxJSSDK.init();
```

## 判断是否支持接口
```js
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [

	]
  });
  wx.ready(function () {
    // 在这里调用 API
	wx.checkJsApi({
    jsApiList:['chooseImage'],
    success: function(res) {
          alert(JSON.stringify(res));
		}
    });
  });
```


## 分享

```js
wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
	"onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone"
	]
  });
  wx.ready(function () {
    // 在这里调用 API
        var title = "生活如此多娇",
        link = "http://www.shenghuo.com,
        imgUrl = "http://www.shenghuo.com/images/logo.png",
        desc = "生活如此多娇-xxxxxxxxxxxxx string",
        success = function(){
            alert("分享成功回调");
        },
        cancel = function(){
            alert("分享失败回调");
        };
       wx.onMenuShareTimeline({//分享到朋友圈
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();

            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl:  "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        });
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        });
		wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        });
  });
```


## 关于分享需要注意的是
::: warning
分析失败排错

1. [微信JS接口签名校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign) 进行签名校验
2. config中的nonceStr(js中驼峰大写S),timestamp和生成签名的中的noncestr timestamp一致
3. url 地址确认 `local.href.split('#')[0]`
4. 确认 config 中的 appid 与用来获取 jsapi_ticket 的 appid 一致。
:::


the permission value is offline verifying这个错误是因为config没有正确执行

permission denied该公众号没有权限使用这个JSAPI，或者是调用的JSAPI没有传入config的jsApiList参数中


## 图片上传
方法1. chooseImage方法，再判断是android还是ios并且是否使用WKWebview内核，最后再分别处理返回值将之转为base64编码的数据，再上传到服务器上。
    这种方法需要后台对base64进行解码逻辑

方法2. 先上传到微信服务器，再到后台服务器端从微信服务器下载回来保存到文件服务器

上传图片接口
:::warning
上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
:::

这里我们采用第二种方法
```html
<input type="button" id="uploadBtn">
```

```js



wx.config({
     debug: false,
     appId: '<%=RequestParam.APP_ID%>',
     timestamp: '<%=params.get("time") %>', //生成签名的时间戳
     nonceStr: '<%=params.get("randomStr") %>', //生成签名的随机串
     signature: '<%=params.get("signature") %>', //签名
     jsApiList: [
       'chooseImage',
       'previewImage',
       'uploadImage',
       'downloadImage'
     ]
 });

wx.ready(function() {
  // 点击上传图片的事件也可以填写在此处
});


$('#uploadBtn').click(function () {  
    wx.chooseImage({  
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {  
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片  
            that.uploadImg(localIds[0]);  
        }  
    });  
});  
  
//具体上传图片  
uploadImg: function (e) {  
    wx.uploadImage({  
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得  
        isShowProgressTips: 1, // 默认为1，显示进度提示  
        success: function (res) {  
            serverId = res.serverId;  
            $.ajax({  
                url: "/uploadImg",  
                dataType: "json",  
                async: false,  
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",  
                data: {"mediaId": serverId},  
                type: "POST",  
                timeout: 30000,  
                success: function (data, textStatus) {  
                    $('#imgUrl').val(data);  
                    $.toast('上传成功', 'text');  
                },  
                error: function (XMLHttpRequest, textStatus, errorThrown) {  
                    $.toast('上传错误,请稍候重试!', 'text');  
                }  
            });  
        },  
        fail: function (error) {  
            $.toast('上传错误,请稍候重试!', 'text');  
        }  
    });  
}


```



## 微信扫一扫

调起微信扫一扫接口

```js
wx.scanQRCode({
  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
  success: function (res) {
  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
  }
});
```


## 微信支付


[为微信开发填坑：微信网页支付的开发流程及填坑技巧](https://gitbook.cn/books/5966d57b118fa209584fbb7a/index.html)
```js
wx.chooseWXPay({
  timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
  nonceStr: '', // 支付签名随机串，不长于 32 位
  package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
  signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  paySign: '', // 支付签名
  success: function (res) {
  // 支付成功后的回调函数
  }
});
```

备注：prepay_id 通过微信支付统一下单接口拿到，paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。

微信支付开发文档：[https://pay.weixin.qq.com/wiki/doc/api/index.html](https://pay.weixin.qq.com/wiki/doc/api/index.html)





**支付页面**需要拿到`openid`和`支付金额`两个参数传递给订单页面去使用，

`支付金额`是用户输入的内容，直接获取就可以，
`openid`最直接的方式就是通过网页授权接口获取。将支付页面的访问地址配置成微信公众号的底部菜单，当用户点击菜单时，进入微信支付页面，我们通过这个请求，就可以拿到openid，或者直接调用网页授权接口来获取openid。


获取网页授权的接口文档：`https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842`

网页授权有两种模式，`snsapi_base（基础授权）`和 `snsapi_userinfo（用户信息授权）`，我们这里只需要拿openid，所以`snsapi_base（基础授权）`就可以。



**订单页面**

订单支付分为两部分，一个是前端页面，一个是后端业务接口。微信网页支付主要是依赖前端js方法实现，后端接口仅是给前端js方法提供必要的参数。

前端页面

```html
<script type='text/javascript' src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
```

```js
function pay(){
    var clientUrl = window.location.href;
    //请求后台，获取jssdk支付所需的参数
    $.ajax({
        type : 'post',
        url : '<%=basePath%>/wx/pay/savexxx',
        dataType : 'json',
        data : {
            "totleFee" : '${totleFee}', //订单金额
            "youhui" : '${youhui}', //优惠金额gasPrice
            "code" : '${fee}', //应付金额
            "goodsId" : '${goodsId}', //商品id
            "gasPrice" : '${gasPrice}', //商品价格
            "openId" : '${openId}', // openId
            "clientUrl" : clientUrl
            //当前页面所在的浏览器URL全路径,由于该支付为jssdk支付，所以需要url地址.参与后台sign签名
        },
        cache : false,
        error : function() {
            alert("系统错误，请稍后重试");
            return false;
        },
        success : function(payReq) {
            payReq=$.parseJSON(payReq); 
            //JSSDK支付所需的配置参数，首先会检查signature是否合法。
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: payReq.appid, // 必填，公众号的唯一标识
                timestamp: payReq.timestamp , // 必填，生成签名的时间戳
                nonceStr:  payReq.noncestr, // 必填，生成签名的随机串
                signature:   payReq.signature,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            //上方的config检测通过后，会执行ready方法
            wx.ready(function() {
                wx.chooseWXPay({
                    timestamp:payReq.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr:payReq.noncestr, // 支付签名随机串，不长于 32 位
                    package: payReq.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: payReq.paySign, // 支付签名
                    success: function (res) {
                    window.location.href = '<%=basePath%>/wx/pay/orderInfo?orderId='+payReq.orderId; //成功后，跳转到自定义的支付成功的页面
                },
                    //该complete回调函数，相当于try{}catch(){}异常捕捉中的finally，无论支付成功与否，都会执行complete回调函数。即使wx.error执行了，也会执行该回调函数.
                    complete : function(res) {
                        //  /!*注意：res对象的errMsg属性名称，是没有下划线的，与WeixinJSBridge支付里面的err_msg是不一样的。而且，值也是不同的。*!/
                        if (res.errMsg == "chooseWXPay:ok") {
                            //window.location.href = data[0].sendUrl;
                        } else if (res.errMsg == "chooseWXPay:cancel") {
                            alert("你手动取消支付");
                        } else if (res.errMsg == "chooseWXPay:fail") {
                            alert("支付失败");
                        } else if (res.errMsg == "config:invalid signature") {
                            alert("支付签名验证错误，请检查签名正确与否 or 支付授权目录正确与否等");
                        }
                    }
                });
            });
            wx.error(function(res) {
                if (res.errMsg == "config:invalid url domain") {
                    alert("微信支付(测试)授权目录设置有误");
                } else {
                    alert("检测出问题:" + res.errMsg);
                }
            });
        }
    });
}
```


这里做了一个ajax的异步请求，在订单页面，当用户确认支付信息无误，就点击确认付款按钮，这时调用后端接口，后端接口进行“封装订单，封装微信支付参数”的处理后，将微信支付参数返回到前端页面。如果参数无误，则会自动调起微信支付，用户输入支付密码后，完成支付。

这里，主要是`wx.config`和`wx.chooseWXPay`两个方法，第一个方法进行微信支付验证，验证用户身份，支付参数是否合法。

当第一个方法验证通过后，就可以调用wx.chooseWXPay，如果这个方法的参数也都准确无误，则会自动弹出微信支付页面。


:::warning
支付时如何获取用户的openId？

通过微信网页授权获取用户信息接口来获取openId。
:::


[附录5-常见错误及解决方法](https://blog.csdn.net/zxf13598202302/article/details/58028192)

[极速开发微信公众号--【推荐】](https://www.jianshu.com/p/a172a1b69fdd)
[微信公众号开发之授权获取用户信息]()
[理解OAuth2.0](http://www.cnblogs.com/zyw-205520/p/5549527.html)
