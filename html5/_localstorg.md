# localStorage
[localStorage 还能这么用](https://juejin.im/entry/59db9bac51882578db27ad4f)
[HTML5 本地存储 localStorage、sessionStorage 的遍历、存储大小限制处理](https://blog.csdn.net/cengjingcanghai123/article/details/49737007)
```js

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
```
