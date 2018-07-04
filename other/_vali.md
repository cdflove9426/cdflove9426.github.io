# 验证

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>判断输入密码强度</title>
<script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.9.1.js"></script>
</head>

<body>
<form>
<label>密码：<input class="password" type="password"></label>
</form>
<script>
(function($){
    $.fn.extend({
        checkPsw:function(){
            var streng_span=$('<span class="streng" style="display:none; margin-left:5px;"></span>');
            var promptmsg_div=$('<div class="promptmsg" style="display:none; color:red; margin-left:50px;"></div>');
            this.parent().append(streng_span);
            this.parent().append(promptmsg_div);
            this.focus(function(){
                $(this).siblings('.promptmsg').hide();
                $(this).siblings('.streng').hide();
                })
            this.blur(function(){
                var streng;
                var value=$(this).val();
                var promptmsg=(value=='') ? '请输入密码!':'';
                if(value.match(/^\w+$/)==null && value!=''){
                    promptmsg='请输入正确的密码格式，密码格式只能包含数字，字母和下划线！'
                }
                if(value.match(/^\w+$/)!=null && value!=''){
                        promptmsg='';
                        if(value.match(/^\d+$/)!=null || value.match(/^[a-z]+$/i)!=null || value.match(/\_+/g)!=null ){//密码输入的如果全是“数字”或“字母”或“下划线”
                            streng='弱';
                            }
                        if(value.match(/[a-z]+/gi)!=null && (value.match(/\d+/g)!=null || value.match(/\_+/g)!=null)  ){//密码输入的密码如果是“字母”和“数字”，或“字母”和“下划线”
                            streng='强';
                            }
                        if(value.match(/\d+/g)!=null && value.match(/\_+/g)!=null ){//输入的密码如果是“数字”和“下划线”
                            streng='强';
                            }
                        if(value.match(/[a-z]+/gi)!=null && value.match(/\d+/g)!=null && value.match(/\_+/g)!=null ){//输入的密码如果包含“数字”和“下划线”和“字母”
                            streng='很强'
                            }
                        if(value.length<6 ){
                            promptmsg='输入的密码不能小于6位!';
                            streng='';
                            $(this).siblings('.streng').text(streng).hide();
                            }
                        if(value.length>16 ){
                            promptmsg='输入的密码不能大于16位!';
                            streng='';
                            $(this).siblings('.streng').text(streng).hide();
                            }
                    }
                if(promptmsg!=''){
                    $(this).siblings('.promptmsg').text(promptmsg).show();
                    return false;
                    }else{
                        $(this).siblings('.promptmsg').text(promptmsg).hide();
                        }
                if(streng!=''){
                    $(this).siblings('.streng').text(streng).show();
                    return true;
                    }
                })
            return true;
            }
        })
    })(jQuery)
$('.password').checkPsw();
</script>
</body>
</html>
```
