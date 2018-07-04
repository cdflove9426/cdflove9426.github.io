# 微信二维码长按无法识别问题解析
[微信二维码长按无法识别问题解析](https://www.h5anli.com/articles/201702/wxewmsbug.html)
## 微信识别二维码的原理机制

   我们先来看一下微信识别二维码的原理机制：

   “微信识别二维码采用的逻辑是截屏识别，当客户端发现用户在网页的img标签内进行长按操作时，会立刻截屏并且启动二维码识别算法。所以这里用于二维码识别的图片是截屏，而不是之前有人提到的img标签中的图片。


## 二维码识别常见的BUG及解决方法
1. 维码图片直接放在background里时无法识别
   二维码识别原理我们可以知道客户端是检测网页的img标签内进行长按操作时，会立刻截屏并且启动二维码识别算法。

2. 多张二维码图片无法在同一屏幕中共享

3. IOS系统meta缩放问题导致二维码无法识别

在安卓版的微信长按二维码可以识别（前提是你的微信版本到支持此功能），但是到了苹果版的微信就识别不了，这时候可能是缩放的问题：

（1）设置了初始缩放设置为1，最大缩放值要>=1,不支持缩放。--->可以识别。

   如<meta content="width=device-width, initial-scale=1, maximum-scale=1.2, user-scalable=0" name="viewport" />

（2）设置了初始缩放设置为小于1或者大于1，最大缩放值大于或者等于初始缩放,不支持缩放。--->不可以识别。

   如<meta content="width=device-width, initial-scale=1.1, maximum-scale=1.2, user-scalable=0" name="viewport" />

（3）设置了初始缩放设置为1，最大缩放值要>=1,支持缩放。--->页面不缩放之前可以识别，一旦页面缩放过后就不可以识别。

   如<meta content="width=device-width, initial-scale=1, maximum-scale=1.2, user-scalable=1" name="viewport" />

（4）都不设置时，不可以识别。

（5）设置了固定的宽，导致二维码的实际位置偏移到屏幕外

   <meta content="width=750, initial-scale=1, maximum-scale=1.2, user-scalable=0" name="viewport" />

（6）页面有css样式fixed --->不可以识别。


方法1：
   设置：初始缩放为1，最大缩放值要大于1，不支持缩放。如下：

   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>

 方法2：

   首先要把这张二维码添加到body的子元素 放在最后或者是最前都可以，

注意这可能影响你的布局，可设置position:absolute，进行调整，因为这才是真正用来识别的二维码，如果这个二维码位置太偏移，有可能会造成二维码无法识别。此外还需要注意的是opacity需要设为0而不是设置display属性。

   <img style="position:absolute;width: XXpx;height: XXpx;opacity: 0" src="二维码图片地址"> 

   其次，在你应该在设计稿设计的地方，放置的div里面设置你正常二维码图片的大小，以便页面呈现正常。

   <img style="你的正常大小" src="二维码图片地址" />

   这时你就会发现长按图片能够识别出来二维码。
