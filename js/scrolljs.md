
滚动到顶部：

$('.scroll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
滚动到指定位置：

$('.scroll_a').click(function(){$('html,body').animate({scrollTop:$('.a').offset().top}, 800);});
滚动到底部：

 $('.scroll_bottom').click(function(){$('html,body').animate({scrollTop:$('.bottom').offset().top}, 800);});



[vue ](https://blog.csdn.net/bbsyi/article/details/77897776)