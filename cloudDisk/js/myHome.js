/**
 * Created by bobo on 2016/9/13.
 */
$(document).ready(function(){
    var BODY = $('body'),
        W = BODY.width(),
        H = BODY.height(),
        V = jQuery.fn.jquery,
        WEST = $('#ui-layout-west'),
        EAST = $('#ui-layout-center'),
        NORTH = $('#ui-layout-north'),
        SOUTH = $('#ui-layout-south');
    var fun = {};
    EAST.on('click', function(e){
        var tg = $(e.target);
        var name = tg.data('name');
        var TG = tg.hasClass('JS_target');
        if(!TG){/*更改目标DOM*/
            $('.JS_target').removeClass('JS_target');
            tg.addClass('JS_target');
        }
        fun[name]&&fun[name](tg);/*触发目标事件*/
    });
    window.PageEvent = function (con){
        for ( var i in con) {
            fun[i] = con[i];/*页面注册事件*/
        }
    };
    function Disk(){}
    Disk.prototype = {
        init:function(){
            var self = this;
            self.initEast();
            PageEvent({
                qr:self.initQrBtn,
                checkbox:self.initCBox,
                check_all:self.initCAll,
                search:self.initSearchBox,
                del_mem:self.initDelMem.bind(this)
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
        initCAll:function(tg){/*全选按钮点击事件*/
            var ca = tg.is(':checked');
            var box = $('.tb-checkbox');
            if(box.length>0){
                box.each(function(){
                    var ct = $(this).is(':checked');
                    if(ct!==ca) $(this).trigger('click');
                });
            }
        },
        initCBox:function(tg){/*选择框点击事件*/
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
        initDelMem:function(tg){/*删除按钮点击事件*/
            var self = this;
            var ids = self._delMemData();
            if(ids.accounts.length>0){
                var url = tg.data('url');
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
        },
        initQrBtn:function(){/*二维码点击事件*/
            var pid = $('#group').attr('data-id');
            //console.log(pid);
            if(pid){
                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 1, //显示关闭按钮
                    shade: [0.5,'#000'],
                    area: ['650px', '560px'],
                    offset: 'auto', //居中弹出
                    time: 0, //不自动关闭
                    shift: 2,
                    //content: ['addMembersForward.do', 'no']
                    content: ['../common/pop_add.html', 'no'] //iframe的url，no代表不显示滚动条
                });
            }
        },
        initSearchBox:function(tg){/*搜索框点击事件*/
            tg.val('');
        },
        _delMemData:function(){/*删除成员数据打包*/
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
                id:$('#group').attr('data-id'),
                accounts:ids
            };
        }
    };

    new Disk().init();
});