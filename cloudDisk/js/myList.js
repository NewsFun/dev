/**
 * Created by bobo on 2016/9/21.
 */
$(function(){
    function MyList(){
        this.init = function(){
            var self = this;
            /*初始化文件树*/
            new Tree({
                openClass:'icon_hollow',
                closeClass:'icon_solid',
                domTags:self.domTags,
                pathOperate:self._addPath
            }).init();
            /*初始化右键菜单*/
            //self.initMenu();
            /*初始化删除按钮*/
            self.initClick();
        }
    }

    MyList.prototype = {
        initMenu:function(){
            var self = this;
            var menu = $.ligerMenu(
                { top: 0, left: 0, width: 120, items: [
                    { text: '增加', click: self._addData },
                    { text: '修改', click: self._changeData },
                    { text: '删除', click: self._deleteData },
                    { line: true },
                    { text: '关闭', click: self._close}]
                });
            $('#tree_content').bind("contextmenu", function (e) {
                menu.show({ top: e.pageY, left: e.pageX }, this);
                return false;
            });
        },
        initClick:function(){
            var self = this;
            /*$('#addMem').on('click', function(){
                self._initHS('500px','../common/pop_upload.html');
            });*/
            $('#addBrc').on('click', function(){
                self._initHS('260px','../common/pop_branch.html');
            });
            $('#ui-layout-center').on('click', function(e){
                var tg = $(e.target);
                var name = tg.data('name');
                var TG = tg.hasClass('JS_target');
                if(!TG){
                    $('.JS_target').removeClass('JS_target');
                    tg.addClass('JS_target');
                    //console.log('change target');
                }
                self._dataOperate(name);
            });
        },
        _initHS:function(height, path){
            layer.open({
                type: 2,
                title: false,
                closeBtn: 1, //显示关闭按钮
                shade: [0.5,'#000'],
                area: ['650px', height],
                offset: 'auto', //居中弹出
                time: 0, //不自动关闭
                shift: 2,
                content: [path, 'no'] //iframe的url，no代表不显示滚动条
            });
        },
        domTags:function(data, pid){
            var html = '';
            for(var i = 0;i<data.length;i++){
                if(data[i].user){/*加载数据*/
                    html += '<tr>' +
                    '<td class="tb-check"><label><input class="tb-checkbox" type="checkbox" data-name="checkbox">' +
                    '<input type="hidden" value="'+data[i].id+'"></label></td>' +
                    '<td class="tb-name"><span>'+data[i].name+'</span><span class="tb-id"> ('+data[i].account+') </span></td>' +
                    '<td class="tb-post"><span>'+data[i].job+'</span></td>' +
                    '<td class="tb-phone"><span>'+data[i].mobile+'</span></td>' +
                    '<td class="tb-email"><span>'+data[i].email+'</span><div class="data-change">' +
                    '<input class="base-bg" type="button" value="修改信息" data-name="change"></div></td></tr>';
                }
            }
            $('#data').html(html);
        },
        _dataOperate:function(name){
            var self = this;
            switch (name){
                case 'change':
                case 'addMem':
                    self._initHS('500px','../common/pop_upload.html');
                    break;
                case 'addBrc':
                    self._initHS('260px','../common/pop_branch.html');
                    break;
                case 'dm':break;
                default :break;
            }
        },
        _changeData:function(){
            //console.log(this.text);
        },
        _close:function(){
            //console.log(this.text);
        },
        _addPath:function(data){
            var html = '', path = data.path;
            for(var i = 0;i<path.length;i++){
                html += '<span>'+path[i]+' </span>';
            }
            $('#group').html(html).attr('data-id', data.id);
        }
    };

    new MyList().init();
});
