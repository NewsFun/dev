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
            PageEvent({
                change:self._initHS,
                addMem:self._initHS,
                submit_list:self.submitSearch.bind(this)
            });
            $('#addBrc').on('click', function(){
                self._addBrc('260px','../common/pop_branch.html');
            });
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
        submitSearch:function(tg){
            var self = this;
            var name = $('input[name="searchName"]').val();
            var id = $('#group').attr('data-id');
            //console.log(name, id);
            $.ajax({
                url:tg.data('url'),
                data:{id:id,searchName:name},
                type:'get',
                success:function(data){
                    if(data.code == 200){
                        self.domTags(data.list);
                    }
                }
            });
        },
        _initHS:function(){
            layer.open({
                type: 2,
                title: false,
                closeBtn: 1, //显示关闭按钮
                shade: [0.5,'#000'],
                area: ['650px', '500px'],
                offset: 'auto', //居中弹出
                time: 0, //不自动关闭
                shift: 2,
                content: ['../common/pop_upload.html', 'no'] //iframe的url，no代表不显示滚动条
            });
        },
        _addBrc:function(height, path){
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
        _addPath:function(data){
            var html = '', path = data.path;
            for(var i = 0;i<path.length;i++){
                html += '<span>'+path[i]+' </span>';
            }
            $('#group').html(html).attr('data-id', data.id);
            $('#search-id').attr('value', data.id);
        }
    };

    new MyList().init();
});
