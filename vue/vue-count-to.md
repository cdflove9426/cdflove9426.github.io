
# vue-count-to

[ count to--Doc](https://github.com/PanJiaChen/vue-countTo)

```shell
npm install vue-count-to
```

```html
  <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>
```
```html
<count-to :start-val='0' :end-val='2017' :duration='4000' :decimals='0' :separator=',' :prefix='¥ ' :suffix=' rmb' :autoplay=false>
```
```js

import countTo from 'vue-count-to';
  export default {
    components: { countTo },
    data () {
      return {
        startVal: 0,
        endVal: 2017
      }
    }
  }
```
## 提供方法
mountedCallback |  when mounted will emit mountedCallback
------- | -------
start | start the countTo
pause | pause the countTo
reset | reset the countTo

```html
<count-to ref="example" class="example" :start-val="_startVal" :end-val="_endVal" :duration="_duration" :decimals="_decimals"
      :separator="_separator" :prefix="_prefix" :suffix="_suffix" :autoplay="false"></count-to>
```

```js
 methods: {
    start() {
      this.$refs.example.start()
    },
    pauseResume() {
      this.$refs.example.pauseResume()
    }
  }
```

