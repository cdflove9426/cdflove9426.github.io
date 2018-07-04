# 正则表达式
 
 
[正则表达式在线工具1](https://regex101.com/)
[正则表达式在线工具2](http://tool.lu/regex/)
[正则表达式30分钟入门教程](http://www.cnblogs.com/deerchao/archive/2006/08/24/zhengzhe30fengzhongjiaocheng.html)
[msdn](https://msdn.microsoft.com/en-us/library/az24scfc(v=vs.110).aspx)
[正则表达式前端使用手册](http://louiszhai.github.io/2016/06/13/regexp/)
[JavaScript 正则进阶之路——活学妙用奇淫正则表达式](https://juejin.im/entry/592b8e060ce463005786142b)

# 常用的操作
## 定义和使用RegExp
```js
    var reg1=/hello \w{3,12}/g;
    var reg2=new RegExp("hello \\w{3,12}",'g');
```

1. test()  
检索字符串中指定的值。返回 true 或 false。这个是我们平时最常用的方法。
```js
var reg=/hello \w{3,12}/;
 alert(reg.test('hello js'));//false
 alert(reg.test('hello javascript'));//true
```

2. exec()
检索字符串中指定的值。匹配成功返回一个数组，匹配失败返回null。
```js
var reg=/hello/;
console.log(reg.exec('hellojs'));//['hello']
console.log(reg.exec('javascript'));//null
```

3. compile()
compile() 方法用于改变 RegExp。
compile() 既可以改变检索模式，也可以添加或删除第二个参数。
```js
var reg=/hello/;
console.log(reg.exec('hellojs'));//['hello']
reg.compile('Hello');
console.log(reg.exec('hellojs'));//null
reg.compile('Hello','i');
console.log(reg.exec('hellojs'));//['hello']
```



## String拓展
除了RegExp对象提供方法之外，String对象也提供了四个方法来使用正则表达式。

1. match()
在字符串内检索指定的值,匹配成功返回存放匹配结果的数组，否则返回null。这里需要注意的一点事，如果没有设置全局匹配g，返回的数组只存第一个成功匹配的值。
```js
var reg1=/javascript/i;
var reg2=/javascript/ig;
console.log('hello Javascript Javascript Javascript'.match(reg1));
//['Javascript']
console.log('hello Javascript Javascript Javascript'.match(reg2));
//['Javascript','Javascript','Javascript']
```

2.search()
```js
在字符串内检索指定的值,匹配成功返回第一个匹配成功的字符串片段开始的位置，否则返回-1。

var reg=/javascript/i;
console.log('hello Javascript Javascript Javascript'.search(reg));//6
```

3.replace()

替换与正则表达式匹配的子串，并返回替换后的字符串。在不设置全局匹配g的时候，只替换第一个匹配成功的字符串片段。
```js
var reg1=/javascript/i;
var reg2=/javascript/ig;
console.log('hello Javascript Javascript Javascript'.replace(reg1,'js'));
//hello js Javascript Javascript
console.log('hello Javascript Javascript Javascript'.replace(reg2,'js'));
//hello js js js
```

4.split()
```js
把一个字符串分割成字符串数组。

var reg=/1[2,3]8/;
console.log('hello128Javascript138Javascript178Javascript'.split(reg));
//['hello','Javascript','Javascript178Javascript']
```



# 元字符

## 具有特殊意义的元字符
```
-\：转义字符，转义后面字符所代表的含义
-^：以某一个元字符开始
-$：以某一个元字符结束
-\n：匹配一个换行符
-.：除了\n以外的任意字符
```

```js
var reg = /^0.2$/; // 以0开头，以2结尾，中间可以是除了\n的任意字符
console.log(reg.test('0.2')); // true
console.log(reg.test('0-2')); // true
console.log(reg.test('0---2')); // false
reg = /^0\.2$/; // 将"."转义
console.log(reg.test('0.2')); // true
console.log(reg.test('0-2')); // false
```

##出现次数
```
- *：出现0到多次
- +：出现1到多次
- ?：出现0次或者1次
- {n}：出现n次
- {n,m}：出现n到m次
```

```js
var reg = /^\d+$/;
console.log(reg.test('2015')); // true
```

## 常用分组语法
```
- (exp)	匹配exp,并捕获文本到自动命名的组里
- (?<name>exp)	匹配exp,并捕获文本到名称为name的组里，也可以写成(?'name'exp)
- (?:exp)	匹配exp,不捕获匹配的文本，也不给此分组分配组号
- (?=exp)	匹配exp前面的位置
- (?<=exp)	匹配exp后面的位置
- (?!exp)	匹配后面跟的不是exp的位置
- `(?<!exp)`	匹配前面不是exp的位置
- (?#comment)	这种类型的分组不对正则表达式的处理产生任何影响，用于提供注释让人阅读
``` 

```
\d+(?=.*[a-z])    123a    => 123
(?!exp)
```

## 懒惰限定符
```js
- *?	重复任意次，但尽可能少重复
- +?	重复1次或更多次，但尽可能少重复
- ??	重复0次或1次，但尽可能少重复
- {n,m}?	重复n到m次，但尽可能少重复
- {n,}?	重复n次以上，但尽可能少重复
```
## 修饰符

```
- x|y：x或y中的一个
- [xyz]：x或y或z中的一个
- [^xyz]：除了xyz以外的任意一个字符
- [a-z]：a-z之间的任何一个字符
- [^a-z]：除了a-z之间的任何一个字符
- [^aeiou]	匹配除了aeiou这几个字母以外的任意字符
- \d：一个0~9之间的数字
- \D：除了0~9之间的数字以外的任何字符
- \b：一个边界符
- \w：数字、字母、下划线中的任意一个字符
- \s：匹配一个空白字符、空格
- ()：分组，把一个大正则本身划分成几个小的正则，例如：var reg = /^(\d+)zhufeng(\d+)$/;
```  




## 元字符的应用 –我都不会用了。。

### []的规律

[] 出现的字符 都代表本身意思的字符
```js
var reg = /^[.]$/;
console.log(reg.test('1')); // false
console.log(reg.test('.')); // true
reg = /^[\w-]$/; // 数字、字母、下划线、- 中的一个
console.log(reg.test('-')); // true
```

### 中括号不识别两位数
```
var reg = /^[12]$/; // --> 1或者2中的一个（符合[xyz]）
var reg = /^[12-68]$/; // --> 1、2-6中的一个、8  三个中的一个
```

### ()

分组的作用有很多，现在先讲其中的一个：改变x|y的默认的优先级，还有的在后面的内容会详细介绍。

```js
var reg = /^18|19$/; // 18、19、181、189、119、819、1819这些都符合
var reg = /^(18|19)$/; // 只能18或者19
```

### exec()
 
先看案例
```js
var reg = /\d+/;
var str = 'iceman2016learn2017';
 
console.log(reg.lastIndex); // 0，第一次捕获的时候，从字符串索引0处开始查找
var res = reg.exec(str);
console.log(res); // ["2016", index: 6, input: "iceman2016learn2017"]
```

数组的第一项是当前正则捕获的内容；
**有一项是index：捕获内容在字符串中开始的索引位置；**
有一项是input：捕获的原始字符串；

现在进行第二次捕获：

```js
console.log(reg.lastIndex); // 0  说明第二次捕获的时候，也要从字符串索引0处开始查找
// 第二次通过exec捕获的内容还是第一个"2016"
res = reg.exec(str);
console.log(res); //["2016", index: 6, input: "iceman2016learn2017"]

```
# 判断浏览器
```js
let url = navigator.userAgent.toLowerCase();
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
if (url.indexOf("15b202 qq") > -1) {
  //单独判断QQ内置浏览器 
  alert("QQ APP 内置浏览器，做你想做的操作");
}
if (url.indexOf("micromessenger") > -1) {
  //单独判断微信内置浏览器
  alert('微信内置浏览器，做你想做的操作');
}
if (url.indexOf("15b202") > -1) {
  //判断微信内置浏览器，QQ内置浏览器
  alert("QQ和微信内置浏览器，做你想做的操作");
}

```

# 正则收集
校验密码强度:`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
校验中文:`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
由数字、26个英文字母或下划线组成的字符串:`^\\w+$`
校验金额:`^[0-9]+(.[0-9]{2})?$`
用户名正则，4到16位（字母，数字，下划线，减号） `/^[a-zA-Z0-9_-]{4,16}$/`
密码正则，以字母开头，长度在6~18之间，只能包含字母、数字和下划线 `let isTrue =`^[a-zA-Z]\w{5,17}$`;
车牌号码正则  `/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/`;
中文正则: ` /[\u4E00-\u9FA5]/;
邮政编码正则:`[1-9]{1}(\d+){5};`
```js
/******************** 正则相关常量 ********************/
/**
 * 正则：手机号（简单）
 */
public static final String REGEX_MOBILE_SIMPLE = "^[1]\\d{10}$";
/**
 * 正则：手机号（精确）
 * <p>移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188</p>
 * <p>联通：130、131、132、145、155、156、175、176、185、186</p>
 * <p>电信：133、153、173、177、180、181、189</p>
 * <p>全球星：1349</p>
 * <p>虚拟运营商：170</p> 
 */
public static final String REGEX_MOBILE_EXACT  = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(147))\\d{8}$";
/**
 * 正则：电话号码
 */
public static final String REGEX_TEL           = "^0\\d{2,3}[- ]?\\d{7,8}";
/**
 * 正则：身份证号码15位
 */
public static final String REGEX_ID_CARD15     = "^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$";

/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
/**
 * 正则：身份证号码18位
 */
public static final String REGEX_ID_CARD18     = "^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9Xx])$";
/**
 * 正则：邮箱
 */
public static final String REGEX_EMAIL         = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
/**
 * 正则：URL
 */
public static final String REGEX_URL           = "[a-zA-z]+://[^\\s]*";
/**
 * 正则：汉字
 */
public static final String REGEX_ZH            = "^[\\u4e00-\\u9fa5]+$";
/**
 * 正则：用户名，取值范围为a-z,A-Z,0-9,"_",汉字，不能以"_"结尾,用户名必须是6-20位
 */
public static final String REGEX_USERNAME      = "^[\\w\\u4e00-\\u9fa5]{6,20}(?<!_)$";
/**
 * 正则：yyyy-MM-dd格式的日期校验，已考虑平闰年
 */
public static final String REGEX_DATE          = "^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
/**
 * 正则：IP地址
 */
public static final String REGEX_IP            = "((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)";

/************** 以下摘自http://tool.oschina.net/regex **************/

/**
 * 正则：双字节字符(包括汉字在内)
 */
public static final String REGEX_DOUBLE_BYTE_CHAR     = "[^\\x00-\\xff]";
/**
 * 正则：空白行
 */
public static final String REGEX_BLANK_LINE           = "\\n\\s*\\r";
/**
 * 正则：QQ号
 */
public static final String REGEX_TENCENT_NUM          = "[1-9][0-9]{4,}";
/**
 * 正则：中国邮政编码
 */
public static final String REGEX_ZIP_CODE             = "[1-9]\\d{5}(?!\\d)";
/**
 * 正则：正整数
 */
public static final String REGEX_POSITIVE_INTEGER     = "^[1-9]\\d*$";
/**
 * 正则：负整数
 */
public static final String REGEX_NEGATIVE_INTEGER     = "^-[1-9]\\d*$";
/**
 * 正则：整数
 */
public static final String REGEX_INTEGER              = "^-?[1-9]\\d*$";
/**
 * 正则：非负整数(正整数 + 0)
 */
public static final String REGEX_NOT_NEGATIVE_INTEGER = "^[1-9]\\d*|0$";
/**
 * 正则：非正整数（负整数 + 0）
 */
public static final String REGEX_NOT_POSITIVE_INTEGER = "^-[1-9]\\d*|0$";
/**
 * 正则：正浮点数
 */
public static final String REGEX_POSITIVE_FLOAT       = "^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$";
/**
 * 正则：负浮点数
 */
public static final String REGEX_NEGATIVE_FLOAT       = "^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$";

/****
```



- 数字/\d+(\.\d+)?/   
- 是否汉字：^[\u4E00-\u9FFF]+$
- 邮件地址：^\w+([-+.]\w+)@\w+([-.]\w+).\w+([-.]\w+)*$
- 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
