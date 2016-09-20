/**
 * Created by bobo on 2016/9/19.
 */
(function(){
    function Tree(){
        this.title = $('.tree_title');
        this.baseH = $('.tree_content li').css('line-height');
        this.openClass = 'icon_hollow';
        this.closeClass = 'icon_solid';
        this.level = 0;
    }
    Tree.prototype = {
        init:function(){
            this.openTree();
        },
        openTree:function(){
            var self = this;
            self.title.on('click', function(){
                var title = $(this).children('.tree_icon');
                if(title.hasClass(self.closeClass)){
                    title.removeClass(self.closeClass).addClass(self.openClass).html('-');
                    $(this).parent().removeAttr('style');
                    if(!$(this).data('opened')){
                        //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do';
                        //self._getData(url);
                        $(this).data('opened', 'true');
                    }
                }else{
                    title.removeClass(self.openClass).addClass(self.closeClass).html('+');
                    $(this).parent().css('height', self.baseH);
                }
                self._getPath($(this));
            });
        },
        _getData:function(url, callback){
            $.ajax({
                url:url,
                type:'get',
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(callback) callback(data);
                }
            });
        },
        _operate:function(){
            var names = $('tree_name')
        },
        _getPath:function(node){
            var parents = node.parents('.tree_branch');
            var path = '';
            for(var i = parents.length-1;i>=0;i--){
                var p = $(parents[i]).find('.tree_name')[0];
                path += $(p).text();
            }
            console.log(path);
        }
    };

    new Tree().init();
})();