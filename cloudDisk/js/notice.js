/**
 * Created by bobo on 2016/11/11.
 */
$(function(){
    var getData = true, fps = 30000;
    setInterval(hasNotice, fps);
    function hasNotice(){
        if(getData){
            var url = 'get_notice_num.do';
            $.ajax({
                type:'get',
                url:url,
                dataType:'json',
                success:function(data){
                    var notice = data.notice;
                    if(notice && notice>0){
                        $('#tips_num').text(notice).show();
                    }
                }
            });
        }
    }

    function Notice(){
        this.tips = $('#tips');
        this.more = $('#notice-more');
        this.close = $('#notice-close');
        this.page = 0;
        this.isRead = 'true';
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
                self.getNotice();
                getData = false;
            });
            self.close.on('click', function(){
                $('#notice').removeAttr('style');
                getData = true;
            });
            self.more.on('click', function(){
                self.getNotice();
            });
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
        },
        getNotice:function(){
            var self = this;
            //var url = 'get_notice.do?page='+self.page+'&&isRead='+self.isRead;
            var url = '../json/notice.json?page='+self.page+'&&isRead='+self.isRead;
            $.ajax({
                type:'get',
                url:url,
                dataType:'json',
                success:function(data){
                    if(data.code == 200){
                        var notice = data.data;
                        if(notice.length>0){
                            self.addNotice(notice);
                            self.page ++;
                        }else{
                            self.more.find('.pop-color').text('没有更多').css('cursor','not-allowed');
                        }
                    }
                }
            });
        },
        addNotice:function(data){
            var html = '';
            for(var i = 0;i<data.length;i++){
                html += '<li><div class="time"><span>'+data[i].sendDate+'</span></div><div class="msg">' +
                    '<span>'+data[i].content+'</span></div><div class="operate">' +
                    '<a class="pop-color" href="'+data[i].params+'">查看</a><a class="pop-color">确认</a></div></li>';
            }

            $('#data').append(html);
        }
    };

    new Notice().init();
});