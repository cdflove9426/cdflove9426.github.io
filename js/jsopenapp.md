# web链接跳转到app
web页面判断是否安装某app,分别跳转到h5页面或者在相应的app中打开
 
# URL scheme
URL Scheme是为方便app之间互相调用而设计的。我们可以通过系统的OpenURL来打开该app，并可以传递一些参数。

客户端应用可以向操作系统**注册一个URL scheme**，浏览器或其他应用中通过该**scheme**启动本应用。通过指定的 URL 字段，让应用被调起后直接打开特定页面，
比如订单详情页、消息通知页、促销广告页等等。也可以执行某些指定动作，如订单支付等。也可以在应用内通过 html 页来直接调用显示 app 内的某个页面。

例子：你在Safari里输入www.alipay.com，就可以直接打开你的支付宝app，前提是你的手机装了支付宝。如果你没有装支付宝，应该显示的是支付宝下载界面，点击会跳到AppStore的支付宝下载界面。

weixin://
weixin://dl/moments（朋友圈）


# URL scheme 的格式
客户端自定义的URL作为从一个应用调用另一个的基础，遵循RFC 1808 (Relative Uniform Resource Locators)标准。这跟我们常见的网页内容URL 格式一样。
URL 分为几个部分，scheme、host、relativePath、query。

```js
scheme://host[:port][/path][?query][#fragment]  
scheme://host/relativePath?query
```

如
**例子1**
`zqprojectmobile://project/carDetail?car_id=123456`
scheme：  zqprojectmobile
host：  project
relativePath：  /carDetail
query：  car_id=123456




**例子2**
`http://www.baidu.com/s?rsv_bp=1&rsv_spt=1&wd=NSurl&inputT=2709`
scheme 为 http，host 为www.baidu.com，relativePath 为 /s，query 为 rsv_bp=1&rsv_spt=1&wd=NSurl&inputT=2709。

uumobile://mobile/carDetail?car_id=123456
scheme 为 uumobile，host 为mobile，relativePath 为 /carDetail，query 为 car_id=123456。


**例子3**
```
NSURL *url = [NSURL URLWithString:@"http://www.testurl.com:8080/subpath/subsubpath?uid=123&gid=456"];  
```
scheme    :为http
host    :为www.testurl.com
port    :为8080
path    :为/subpath/subsubpath
lastPathComponent    :为subsubpath
query    :为uid=123&gid=456


# 前端要如何处理呢

[ web页面判断是否安装某app，并判断是否打开该应用](http://blog.csdn.net/qq_30740239/article/details/51969660)
提供了一个android 的注册使用过程

### android 中注册scheme
在androidmanifest.xml中定义scheme
```xml
<!-- 启动页 -->
<activity
    android:name="com.qiyuan.congmingtou.activity.SplashActivity"
    android:label="@string/app_name">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />

    </intent-filter>
    <!-- 要想在别的App上能成功调起App，必须添加intent过滤器 -->
    <intent-filter>
        <!-- 协议部分，随便设置 -->
        <data android:scheme="cmt" android:host="splash"/>
        <!-- 下面这几行也必须得设置 -->
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <action android:name="android.intent.action.VIEW" />
    </intent-filter>
</activity>
```

### 统一接口  调用sheme
最后通过封装，统一接口

```js
export default function jsCallApp() {
     var sys = {},
         u = window.navigator.userAgent,
         ua = window.navigator.userAgent.toLowerCase();

     var config = {
         /*scheme:必须*/
         // scheme_IOS: 'IfInstalledCongMingTou://congmingtou',
         // scheme_Adr: 'cmt://splash',
         // assistant_url: 'www.you_downLload_url.com',
         scheme_IOS: 'weixin://',
         scheme_Adr: 'weixin://',
         assistant_url: 'http://baidu.com',
         timeout: 600
     };

     sys.isWeixinBrowser = /micromessenger/.test(ua) ? true : false;
     sys.isQQBrowser = ua.match(/QQ/i) == "qq" ? true : false;
     sys.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
     sys.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     sys.isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
     sys.isChrome =  !!u.match(/chrome/);

     //友好的提示页面
     if (sys.isWeixinBrowser || sys.isQQBrowser) {
         console.log('weixin QQ');
         // $('.layer').show();
         return false;
     }

     var openIframe = document.createElement('iframe');
     openIframe.style.display = 'none';
     document.body.appendChild(openIframe);

     //ios
     if (sys.isiOS) {
         //由于部分ios中打开app后，WAP页面会被挂起，定时器不会被执行。因此可以做下优化：
         //WAP页重新被聚焦后，如果超过1s，认为APP被打开了，重新聚焦时就不必再跳转到APP下载页
         window.location.href = config.scheme_IOS; //ios scheme
         var loadDateTime = Date.now();
         setTimeout(function () {
             var timeOutDateTime = Date.now();
             if (timeOutDateTime - loadDateTime < 1000) {
                 window.location.href = config.assistant_url;
             }
         }, 25);
     } else if (sys.isAndroid) {
         //判断是否是android，具体的判断函数自行百度
         if (sys.isChrome) {
             //chrome浏览器用iframe打不开得直接去打开，算一个坑
             console.log('Chrome');
             window.location.href = config.scheme_Adr;
         } else {
             //app中打开
             console.log("Android");
             openIframe.src = config.scheme_Adr;
             console.log(config.scheme_Adr);
             //跳转assistant_url
             setTimeout(function () {
                 window.location.href = config.assistant_url;
             }, 500);
         }
     } else {
         //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
         openIframe.src = config.scheme_Adr;
         setTimeout(function () {
             window.location.href = config.assistant_url;
         }, 500);
     }
 }



```



[ios-注册shceme](http://www.cnblogs.com/fshmjl/p/5857237.html)
[ios -URL Scheme笔记](http://www.jianshu.com/p/e8a433147dfc)
[URL Schemes 使用详解](https://sspai.com/post/31500)

[怎么在网页中打开你的app](https://segmentfault.com/a/1190000005967865?utm_source=tuicool&utm_medium=referral)
[IOS9通用链接（universal link）](http://fegirl.com/2016/06/27/IOS9%20%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5%EF%BC%88universal%20link%EF%BC%89/)
