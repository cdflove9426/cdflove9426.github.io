
# vue 父子组件时间传递

## 父组件传递数据给子组件
父组件数据如何传递给子组件呢？可以通过props属性来实现

父组件：
```html
<parent>
    <child :child-msg="msg"></child>//这里必须要用 - 代替驼峰
</parent>
```
```js
data(){
    return {
        msg: [1,2,3]
    };
}
```


子组件通过props来接收数据:
- 方式1：

`props: ['childMsg']`

- 方式2 :
```js
props: {
    childMsg: Array //这样可以指定传入的类型，如果类型不对，会警告
}
```

- 方式3：

```js
props: {
    childMsg: {
        type: Array,
        default: [0,0,0] //这样可以指定默认的值
    }
}
```



## 子组件与父组件通信
 如果子组件想要改变数据呢？

 这在vue中是不允许的，因为vue只允许单向数据传递。

 **通过触发事件来通知父组件改变数据，从而达到改变子组件数据的目的.**

**子组件:**
```html
<template>
    <div @click="up"></div>
</template>
```

```js
methods: {
    up() {
        this.$emit('upup','hehe'); //主动触发upup方法，'hehe'为向父组件传递的数据
    }
}
```


父组件:
```js
<div>
    <child @upup="change" :msg="msg"></child> //监听子组件触发的upup事件,然后调用change方法
</div>
methods: {
    change(msg) {
        this.msg = msg;
    }
}
```

## 非父子组件通信

这个使用直接用 **vuex**
如果2个组件不是父子组件那么如何通信呢？这时可以通过eventHub来实现通信.
所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.

`let Hub = new Vue();` //创建事件中心
组件1触发：
```js
<div @click="eve"></div>
methods: {
    eve() {
        Hub.$emit('change','hehe'); //Hub触发事件
    }
}

```

组件2接收:
```js
created() {
    Hub.$on('change', () => { //Hub接收事件
        this.msg = 'hehe';
    });
```



