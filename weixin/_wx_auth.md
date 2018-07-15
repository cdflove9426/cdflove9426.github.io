# vue  微信授权
> 微信授权登录,可以很容易获取用户的一些信息,通过用户对公众号的唯一openid从而建立数据库绑定用户身份。

微信授权登录的机制这里不做详述,[微信官方文档已有详述](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842),

**简述就是通过跳转微信授权的页面,用户点击确认后,微信会跳到回调页面,此时回调页面url上会携带code参数,通过code参数,后端可以拿code换取拥护openid,或者用户信息**

**在关注者与公众号产生消息交互后，公众号可获得关注者的OpenID（加密后的微信号，每个用户对每个公众号的OpenID是唯一的。对于不同公众号，同一用户的openid不同）**


 
**网页授权的两种scope的区别说明：**

1、授权登录以`snsapi_base`为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）特点：用户无感知；

2、静默授权以`snsapi_userinfo`为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。 

特殊场景下静默授权：

对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。 
 
**关于UnionID机制**

1、请注意，网页授权获取用户基本信息也遵循UnionID机制。即如果开发者有在多个公众号，或在公众号、移动应用之间统一用户帐号的需求，需要前往微信开放平台（open.weixin.qq.com）绑定公众号后，才可利用UnionID机制来满足上述需求。

2、UnionID机制的作用说明：如果开发者拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的unionid来区分用户的唯一性，因为同一用户，对同一个微信开放平台下的不同应用（移动应用、网站应用和公众帐号），unionid是相同的。
 
--------

 

> https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wx_appid+"&redirect_uri="+api.wx_reg+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state=1,0#wechat_redirect

```js
 str = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`
```

scope :应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。

## Vue 中通过路由判断微信授权
**通过授权页面回调后 通过url 获得code**
前端控制,跳到微信授权页面,用户点击之后又回到了这个页面,

不同的是此时 **url上面已经携带了code**,前端通过字符串截取拿到code,发送给后端,后端即可通过code换取openid以及用户信息了.

请求授权后，返回的地址变成 ：` redirect_uri/?code=CODE&state=STATE。`

[错误返回码说明如下：](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842)
:::info
  code说明 ： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
:::



**通过code换取网页授权access_token**
以及 **拉取用户信息(需scope为 snsapi_userinfo)**


首先请注意，这里通过code换取的是一个特殊的网页授权access_token,与基础支持中的access_token（该access_token用于调用其他接口）不同。公众号可通过下述接口来获取网页授权access_token。如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，也获取到了openid，snsapi_base式的网页授权流程即到此为止。

如果网页授权作用域为`snsapi_userinfo`，则此时开发者可以通过`access_token`和`openid`拉取用户信息了。

尤其注意：由于公众号的`secret`和获取到的`access_token`安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也 **必须从服务器发起**。


也就是前端通过授权跳转后将获得的code  传给后端，后端同学就帮我们获得我们需要的用户信息。


对于一个vue的SPA应用,我们通常可能有很多页面,在微信公众号上我们可能配置多个菜单,多个菜单对应vue的路由页面,但是可能并不是每个页面都需要用户授权才能进入,有些页面用户不登录也需要可以预览,此时我们可以通过vue router来实现前端路由拦截,这个和vue应用中的权限管理有些类似
 

**设置登录白名单的方法**
`route.matched` :一个数组，包含当前路由的所有嵌套路径片段的路由记录 
```js
// 通过设置路由的时候设置mete 属性 
if (to.matched.some(recode => recode.meta.noAuth)) {
  next()
 }


//通过设置白名单的方法
export const whiteList = [
  '/', '/demo/a', '/login', '/home'
]

if (whiteList.indexOf(to.path) !== -1) {  //白名单的直接通过
    next()
}

```
  
```js
 let redirectUrl = window.location.href
    redirectUrl = encodeURIComponent(redirectUrl)
    console.log(redirectUrl)
    const appid='wxdff0642c2120ea39'
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`


```
这里假设 后端在获得code后 获取用户的openid 以及 access_token ,以及获得用的姓名,图片等 ，将其保存到后台服务器，并通过 自己后台生成的tokenId 进行关联。 后台返回tokenId 供前台 通过cookie 或者localstore 进行保持。

（当然一般微信登陆了 所以页面应该也就没有 login 页面了。。。 根据实际情况修改吧。）

也有可能后台不认可这种方式，觉得麻烦。。。
```js
// routerRule.js

export default function routerRule(router, whiteList = []) {   // other codes... 
    router.beforeEach((to, from, next) => {          
        if (getToken()) {          
            if (to.path === '/login') { next({ path: '/' }); return ;}   //有token  不用到登陆页面
             
            if (store.getters.name.length === 0) {
                // no have 用户信息
                try{
                    let res = await store.dispatch('GetInfo');  //通过token 获取用户信息 获取并且设置
                    //console.log(res);
                    next();
                } catch (error) {
                    let res = await store.dispatch('LogOut');
                    // Message.error(err || 'Verification failed, please login again')
                    next({ path: '/' })
                }
            } else {
                //  have 用户信息
                next()
            }
            
        } else {  //token 都没有  1。白名单 直接登陆  2. 是否有code Url参数  【有 直接传输code给后台获取后设置用户信息】【没有 跳转的微信授权页面】    
            if (whiteList.indexOf(to.path) !== -1) {  //白名单的直接通过
                next()
            } else {
                   
                if (getAuthed()) {      // 进行过微信授权之后，重定向回来的url中包含了微信的授权信息，可以将url上截取的参数发送到服务器，换取用户的token，随后进入上述有token时候的步骤
                    let res = await getWechatUserInfo();        //通过code 参数给后台 后台获得用户的openId 或者跟多资料后        
                    await store.dispatch('SetInfo',res);
                    next()   
                } else {           // 用户尚未进行微信授权，则调用微信授权的方法，进行授权登录。
                    getWechatAuth()  //url 授权跳转
                }      
            }

        }     
    }); 

  router.afterEach(( to, from ) => {
    wxShare({ title: to.meta.title, desc: to.meta.shareDesc, link: to.meta.shareLink, logo: to.meta.shareLogo})
   })
}
```


[微信公众平台开发1-OAuth2.0网页授权（含源码）](https://www.cnblogs.com/mxlbook/articles/6418621.html)
