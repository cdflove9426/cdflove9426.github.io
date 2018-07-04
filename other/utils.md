# 常用代码段
格式化时间 
```js

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}


export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
```



（刚刚、2分钟前、12：00）
```js
/**
    * 使用方式:1、时间戳毫秒级 <div  v-z3-time="{ time: '1521279696000', type: '1' }"></div>
              2、日期格式<div  v-z3-time="{ time: '2018-03-22 10:21:12', type: '2' }"></div>
              3、type=1 & type=2
                     （1）新闻的资讯按照时间1小时以内的是“多少分钟前”，1分钟内的资讯显示“刚刚”表示
                     （2）当天内显示“小时:分钟”， 如“1:00”
    */
      Vue.directive('z3-time', (el, binding, vnode, oldVnode) => {
      var dateTimeStamp = binding.value.time // 传入时间戳
      var dateType = parseInt(binding.value.type)
      if (dateTimeStamp.indexOf('-') == -1) {
        dateTimeStamp = parseInt(binding.value.time)
      }

      if (dateTimeStamp != undefined && dateTimeStamp != null && dateTimeStamp != '') {
        if (dateTimeStamp.length == 13) {
          dateTimeStamp = parseInt(binding.value)
        } else {
          var timestamp = Date.parse(new Date(dateTimeStamp))
          dateTimeStamp = timestamp
        }
        var now = new Date().getTime()
        var day_conver = 1000 * 60 * 60 * 24
        var hour_conver = 1000 * 60 * 60
        var min_conver = 1000 * 60
        var time_conver = now - dateTimeStamp
        var temp_conver
        var date = new Date(dateTimeStamp)
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        if (dateType === 1) {
          if ((time_conver / day_conver) < 1) {
            temp_conver = (time_conver / hour_conver)
            if (temp_conver >= 1) {
              el.innerHTML = parseInt(temp_conver) + "小时前"
            } else {
              temp_conver = (time_conver / min_conver)
              if (temp_conver >= 1) {
                el.innerHTML = parseInt(temp_conver) + "分钟前"
              } else {
                el.innerHTML = "刚刚"
              }
            }
          } else {
            el.innerHTML = M + D + h + m
          }
        } else {
          var curTimeMillis = new Date().getTime() // 系统当前时间戳
          let yesterdayDate = formatDate(dateTimeStamp,'MM:dd') //传入日期
          let todayDate = formatDate(curTimeMillis,'MM:dd') //今天日期
          var curDate = new Date(curTimeMillis)
          var todayHoursSeconds = curDate.getHours() * 60 * 60
          var todayMinutesSeconds = curDate.getMinutes() * 60
          var todaySeconds = curDate.getSeconds()
          var todayMillis = (todayHoursSeconds + todayMinutesSeconds + todaySeconds) * 1000
          var todayStartMillis = curTimeMillis - todayMillis
          var oneDayMillis = 24 * 60 * 60 * 1000
          var yesterdayStartMilis = todayStartMillis - oneDayMillis
          if (todayDate > yesterdayDate) {
            el.innerHTML = "昨天 " + h + m
            if(dateTimeStamp <= yesterdayStartMilis){
              el.innerHTML = M + D + h + m
            }
          }else if(todayDate === yesterdayDate){
            el.innerHTML = h + m
          }
        }
      } else {
        el.innerHTML = "--"
      }
    })
```


# 数字前面添加 0
```js
function leftpad (str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
```
