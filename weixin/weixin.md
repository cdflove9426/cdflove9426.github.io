# 微信web页面常用操作

```html
<div @click="changeHead">
    <img :src="userhead" alt="头像" title="头像" />
    <i class="iconfont icon-enter"></i>
</div>
```
```js
axios.get('http://www.xxxxx').then((res) => {
    wx.config({debug: true,
                appId: res[0],
                timestamp: res[1],
                nonceStr: res[2],
                signature: res[3],
                jsApiList:['chooseImage']
    })
    wx.ready(()=>{
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
            this.userhead = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
        });        
    })
```
