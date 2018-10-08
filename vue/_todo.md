[vue2 + koa2 + webpack4 的 SSR 之旅](https://juejin.im/post/5ab7bfe3f265da237b220e1e)
[面试官: 实现双向绑定 Proxy 比 defineproperty 优劣如何?](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)
[可能是 vue-cli 最全的解析了……](https://juejin.im/post/5b2872516fb9a00e8626e34f#heading-1)

[Vue-html5-editor 是一个 Vue 的富文本编辑器插件，简洁灵活可扩展，适用于 vue2.0 以上版本](https://github.com/PeakTai/vue-html5-editor)

vue 中，弹窗滚动，不影响底部页面

```js
    //区域选择弹窗出现的时候应该阻止body的滚动，否则让body滚动，
    //参考方案:https://uedsky.com/2016-06/mobile-modal-scroll/
    isShowModal(newValue, oldValue) {
      if (this.isShowModal) {
        document.body.style["position"] = "fixed";
        document.body.style["width"] = "100%";
      } else {
        document.body.style["position"] = "static";
      }
    },

   showModal: false,//模态框显示 

    showModal(newValue, oldValue) {
      if (this.showModal) {
        this._top = document.body.scrollTop || document.documentElement.scrollTop
        document.body.style["position"] = "fixed";
        document.body.style["top"] = -this._top + "px";
        document.body.style["width"] = "100%";
      } else {

        document.body.style["position"] = "static";
        document.body.style["top"] = null;
        document.body.scrollTop = document.documentElement.scrollTop = this._top;
      }
    },

    // 点击弹窗事件
    showRulesModal() {
      this.showModal = true;
      MessageBox({
        title: "指标规则",
        message: this.rule,
        showCancelButton: false,  
        closeOnClickModal: false,  //<---
        confirmButtonText: "知道了"
      }).then(action => {
        this.showModal = false;
      })
    },
```


# vue 如何动态添加图片
[vue img src动态添加问题](https://segmentfault.com/q/1010000009553629)