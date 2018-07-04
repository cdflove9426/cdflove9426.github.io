# h5_video& audio
 
# audio

[HTML 5 音频](http://www.w3school.com.cn/html5/html_5_audio.asp)
[HTML 5 音频对象](http://www.w3school.com.cn/jsref/dom_obj_audio.asp)
```html
<audio src="song.ogg" controls="controls">
Your browser does not support the audio tag.您的浏览器不支持 audio 标签。
</audio>


<audio controls="controls">
  <source src="song.ogg" type="audio/ogg">
  <source src="song.mp3" type="audio/mpeg">
Your browser does not support the audio tag.
</audio>
```

 Ogg 文件，适用于Firefox、Opera 以及 Chrome 浏览器。
要确保适用于 Safari 浏览器，音频文件必须是 MP3 或 Wav 类型。
audio 元素允许多个 source 元素。


```html
<video controls="controls" autoplay="autoplay">
  <source src="movie.ogg" type="video/ogg" />
  <source src="movie.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
```
### 属性

src ：视频的链接
preload：预加载  出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
autoplay：自动播放
loop：循环播放
controls：浏览器自带的控制条
muted:	规定视频输出应该被静音。


### 事件


### H5宣传页面上的自动播放
```js
(function() {
        var audio = document.getElementById('myAudio1');
        audio1 = audio;
        audio.src = source;
        audio.loop = true;
        audio.autoplay = true;
        audio.play();
        audio.addEventListener('canplay', canPlay, false);
    })();

(function() {
        var audio = document.createElement("AUDIO");
        audio2 = audio;
        audio.setAttribute("src", source);
        audio.setAttribute("loop", 'true');
        audio.setAttribute("controls", 'controls');
        audio.setAttribute("autoplay", 'true');
        audio.setAttribute("id", 'myAudio2');
        audio.addEventListener('canplay', canPlay, false);
        document.getElementById('example2').appendChild(audio);
        audio.play();
    })();    

//不用dom标签也是可以的
(function() {
        var audio = new Audio();
        audio3 = audio;
        audio.src = source;
        audio.loop = true;
        audio.id = 'myAudio3';
        audio.autoplay = true;
        audio.addEventListener('canplay', canPlay, false);
        audio.play();
    })();
```
但是这样做， 在iphone[【苹果developer】](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW1)和部分 android 上实现自动播放
使用了上述方法之后，发现在Iphone手机（详细说明）和部分android手机仍然不能，自动播放。
 
一句话:他的播放条件是：**必须有用户行为操作**，才能进行播放。

- 给document或者body绑定一个touchstart事件，这样用户只要触碰到页面就可以触发播放
- 页面上创建audio标签，使用JS调整audio相关属性和值，然后控制音频播放。

 

 ## 在h5 页面中自动播放音乐

 ### 监听微信接口
 监听WeixinJSBridgeReady事件、DOMContentLoaded事件。
 微信的JS API建立在微信壳浏览器的内置JS对象WeixinJSBridge上，WeixinJSBridge并不是WebView一打开就有了，客户端需要初始化这个对象，当这个对象准备好的时候，客户端会抛出事件"WeixinJSBridgeReady"。 
 
 发现部分机型，监听DOMContentLoaded和load事件，在回调中也可以播放音乐； 同时监听两个事件，以增强其适用性。  
 
```html
 <audio style="display:none; height: 0" id="bg-music" preload="auto" src="../static/videos/bg-music.mp3" loop="loop"></audio>
```

```js 
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('bg-music');
            audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
});

wx.ready(function(){
    document.getElementById('audio').play();
});
```

### 通过手势事件播放音乐

```js
var musbtn = document.querySelector('.music-btn');
musbtn.addEventListener('touchstart', function () {
    console.log(bgAudio.pause);
    if(bgAudio.paused){
        bgAudio.play();
        musbtn.classList.add('play');

    }else{
        bgAudio.pause();
         musbtn.classList.remove('play');
    }
});


 var  bgAudioPlay =function(){
        bgAudio.play();
        musbtn.classList.add('play')
        document.body.removeEventListener('touchstart',bgAudioPlay);
}
document.body.addEventListener('touchstart',  bgAudioPlay);

```


### 插件推荐
[howler.js: ](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library)
[buzz.js: ](http://buzz.jaysalvat.com/)
[audio.js: ](http://kolber.github.io/audiojs/)
[jPlayer.js: ](http://jplayer.org/)
--------------

# video

src ：视频的链接
poster：视频封面，没有播放时显示的图片
preload：预加载
autoplay：自动播放
loop：循环播放
controls：浏览器自带的控制条
width：视频宽度
height：视频高度

```js
<script>
var myVideo=document.getElementById("video");
var btn=document.getElementById("button");
btn[0].click=function(){
    myVideo.muted=true;(是否静音：是)
}
btn[1].click=function(){
    myVideo.muted=true;(是否静音：否)
}
btn[2].click=function(){
    myVideo.play();(播放)
}
btn[3].click=function(){
    myVideo.pause();(停止播放)
} 
btn[4].click=function(){
    myVideo.webkitrequestFullscreen();(全屏显示)
}  
</script>
```

视频的总时长(duration) video.duration
当前时间位置(currentTime) video.currentTime;


###用表单元素控制音频音量
```js
<input type="range" min="0" value="50" max="100" id="range" />
var ran=document.getElementById("range");

:video.volume=range.value/100;
```
[html5之video探索](http://azq.space/blog/video/)
