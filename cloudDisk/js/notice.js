/**
 * Created by bobo on 2016/11/11.
 */
$(function(){
    var getData = true, fps = 30000;
    setInterval(getNotice, fps);
    function getNotice(){
        if(getData){
            console.log(1);
            var url = '';
            $.ajax({
                type:'get',
                url:url,
                success:function(data){

                }
            });
        }
    }

    function Notice(){
        this.tips = $('#tips');
        this.more = $('#notice-more');
        this.close = $('#notice-close');
        this.init = function(){
            this.initClick();
        }
    }
    Notice.prototype = {
        initClick:function(){
            var self = this;
            self.tips.on('click', function(){
                $('#tips_num').hide();
                $('#notice').show();
                self.setPosition();
                getData = false;
            });
            self.close.on('click', function(){
                $('#notice').removeAttr('style');
                getData = true;
            })
        },
        getNotice:function(){
            if(getData){
                var url = '';
                $.ajax({
                    type:'get',
                    url:url,
                    success:function(data){
                        var notice = data.notice;
                        if(notice>0){
                            $('#tips_num').text(notice).show();
                        }
                    }
                });
            }
        },
        setPosition:function(){
            var self = this, notice = $('#notice');
            var width = notice.width(),
                height = self.tips.height(),
                top = self.tips.offset().top,
                left = self.tips.offset().left;
            notice.css({
                top:top+height+'px',
                left:left-~~(width/2)+'px'
            });
        }
    };

    new Notice().init();
});