/**
 * Created by bobo on 2016/9/13.
 */
$(document).ready(function(){
    window.PageEvent = function (con){
        $(document).unbind("click").on('click', function(e){
            console.log('c');
            var tg = $(e.target);
            var name = tg.data('name');
            for(var i in con){
                if(i == name) con[i](tg);
            }
        });
    };
    var W = $(window).width(),
        H = $(window).height(),
        V = jQuery.fn.jquery,
        WEST = $('#ui-layout-west'),
        EAST = $('#ui-layout-center'),
        NORTH = $('#ui-layout-north'),
        SOUTH = $('#ui-layout-south');
    function Disk(){}
    Disk.prototype = {
        init:function(){
            var self = this;
            self.initEast();
            //self.initCBox();
            self.initCAll();
            self.initDelMem();

            PageEvent({
                checkbox:self.initCBox
            });
        },
        initEast:function(){
            var sh = ~~SOUTH.height(),
                ew = W-WEST.width(),
                eh = H-NORTH.height()-sh,
                wh = H-NORTH.height()-sh;
            WEST.css('height', wh+'px');
            EAST.css('width', ew+'px').css('height', eh+'px');
        },
        initCAll:function(){
            $('#check-all').on('click',function(){
                var ca = $(this).is(':checked');
                var box = $('.tb-checkbox');
                if(box.length>0){
                    box.each(function(){
                        var ct = $(this).is(':checked');
                        if(ct!==ca) $(this).trigger('click');
                    });
                }
            });
        },
        initCBox:function(tg){
            /*
            $('#data').on('click', function(e){
                var tg = $(e.target);
                var name = tg.data('name');
                if(name == "checkbox"){
                    //e.preventDefault();
                    var tr = tg.parents('tr');
                    var change = tr.find('.data-change');
                    if(tg.is(':checked')){
                        tr.addClass('on');
                        change && change.show();
                    }else{
                        tr.removeClass('on');
                        change && change.removeAttr('style');
                    }
                }
            });
            */

            var tr = tg.parents('tr');
            var change = tr.find('.data-change');
            if(tg.is(':checked')){
                tr.addClass('on');
                change && change.show();
            }else{
                tr.removeClass('on');
                change && change.removeAttr('style');
            }
        },
        initDelMem:function(){
            var self = this;
            $('#dm').on('click', function(){
                var $this = $(this);
                var ids = self._delMemData();
                //console.log(ids);
                if(ids.accounts.length>0){
                    var url = $this.data('url');
                    //console.log(url);
                    $.ajax({
                        url:url,
                        type:'post',
                        data:ids,
                        traditional:true,
                        success:function(data){
                            if(data.code == 200){
                                alert('删除成功');
                            }else{
                                alert('删除失败');
                            }
                        }
                    });
                }
            });
        },
        _delMemData:function(){
            var ids = [], data = $('#data');
            var cbs = data.find('.tb-checkbox:checked'),
                ons = data.children('tr.on');
            cbs.each(function(){
                var id = $(this).next('input[type=hidden]').val();
                ids.push(id);
            });
            ons.each(function(){
                $(this).hide();
            });
            return {
                id:$('#group').data('id'),
                accounts:ids
            };
        }
    };

    new Disk().init();
});