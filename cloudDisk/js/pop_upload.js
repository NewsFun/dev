/**
 * Created by bobo on 2016/11/8.
 */
function Upload(){
    this.doc = parent.document;
    this.tar = $(this.doc.getElementsByClassName('JS_target')[0]);
    this.path = $(this.doc.getElementById('group'));
    this.url = this.tar.data('url');
    this.init = function(){
        this.initPath();
        this.initForm();
    }
}
Upload.prototype = {
    initForm:function(){
        var self = this;
        var name = self.tar.data('name');
        if(name == 'change'){
            var data = self.getMemData();
            self.setFormData(data);
        }
    },
    initPath:function(){
        var self = this;
        var pid = self.path.data('id');
        $('#path').html(self.path.html());
        $('#pid').attr('value', pid);
    },
    getMemData:function(){
        var self = this, msg = [];
        var papa = self.tar.parents('tr');
        var data = papa.find('span');
        data.each(function(k, v){
            var text = $(this).text();
            if(k==1){
                text = text.substring(text.indexOf("(")+1,text.indexOf(")"));
            }
            msg.push(text);
        });
        return msg;
    },
    setFormData:function(data){
        var self = this;
        var form = $('form');
        var inputs = form.find('.input');
        inputs.each(function(k, v){
            $(this).attr('value', data[k]);
        });
        if(self.url) form.attr('action', self.url);
    }
};

new Upload().init();

function Checkout(){
    this.inputs = $('.checkout').find('.input');
    this.msg = null;
    this.init = function(){
        var self = this;
        self.inputs.each(function(){
            self.setResultCss($(this));
            $(this).on('blur',function(){
                self.checkCode($(this));
            });
        });
    };
}
Checkout.prototype = {
    checkCode:function(tg){
        var self = this;
        var req = tg.attr('required');
        var name = tg.attr('name');
        if(req) self.checkEmpty(tg);
        switch (name){
            case "email":
                self.checkEmail(tg);
                break;
            case "mobile":
                self.checkMobile(tg);
                break;
            default :
                self.checkLength(tg);
                break;
        }
        self.setCheckMsg(tg, self.msg);
    },
    setResultCss:function(node){
        var result = '<div class="checkout-result"></div>';
        node.after(result);
        var next = node.next('.checkout-result');
        var width = next.width(),
            height = next.height();
        next.css({
            left:width+'px',
            top:-height+'px'
        });
        if(node.attr('required')) next.text('*');
    },
    checkLength:function(tg){
        var self = this;
        var max = tg.data('max');
        var val = tg.val();
        if(max && val.length>max){
            self.msg = '最多输入'+max+'个字符';
        }
    },
    checkEmpty:function(tg){
        var self = this;
        var val = tg.val();
        if(val){
            var reg = "^[ ]+$";
            var re = new RegExp(reg);
            var result = re.test(val);
            //console.log(result);
            self.msg = result?"不能为空":null;
        }else{
            self.msg = '不能为空';
        }
    },
    checkEmail:function(tg){
        var self = this;
        var val = tg.val().trim();
        if(val.length>0){
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var res = reg.test(val);
            //console.log(res);
            self.msg = res?null:"请输入正确的邮箱";
        }
    },
    checkMobile:function(tg){
        var self = this;
        var val = tg.val().trim();
        if(val.length>0){
            var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var res = reg.test(val);
            self.msg = res?null:"请输入正确的手机号码";
        }
    },
    setCheckMsg:function(tg, message){
        var self = this;
        var next = tg.next('.checkout-result');
        //var msg = message.replace(/(^\s*)|(\s*$)/g, "");
        message?next.removeClass('pass').text(message):next.addClass('pass').text('√');
        self.msg = null;
    }
};
new Checkout().init();