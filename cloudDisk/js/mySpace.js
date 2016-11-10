/**
 * Created by bobo on 2016/9/29.
 */
$(function(){
    function Share(){
        this.operate = false;
        this.init = function(){
            var self = this;
            this.initClick();
            PageEvent({
                add_btn:self.initAddBtn,
                admin:self.eventOfAdmin.bind(this),
                del:self.eventOfDel,
                limit:self.eventOfLimit,
                space_group:self.initDelGroup,
                submit:self.submitSearch.bind(this)
            });
        }
    }
    Share.prototype = {
        initClick:function(){
            var self = this;
            var lis = $('.my-space');
            lis.on('click',function(){
                lis.each(function(){
                    $(this).removeClass('on');
                });
                $(this).addClass('on');
                $('#group').attr('data-id',$(this).data('id'));
                $('#search-id').attr('value',$(this).data('id'));
                self.getData($(this).data('id'));
            });
            lis.first().trigger('click');
        },
        initAddBtn:function(){
            layer.open({
                type: 2,
                title: false,
                closeBtn: 1, //显示关闭按钮
                shade: [0.5,'#000'],
                area: ['650px', '560px'],
                offset: 'auto', //居中弹出
                time: 0, //不自动关闭
                shift: 2,
                content: ['../common/pop_add.html', 'no'] //iframe的url，no代表不显示滚动条
            });
        },
        initDelGroup:function(tg){
            var id = tg.data('id');
            var url = '';
            $.ajax({
                url:url,
                data:{id:[id]},
                type:'post',
                success:function(data){
                    alert(data);
                    if(data.code==200){
                        $('#data').empty();
                        tg.attr('data-id', '');
                        location.reload(true);
                    }
                }
            });
        },
        getData:function(id){
            var self = this;
            var url = '../json/table'+id+'.json';
            $.get(url, function(data){
                var da = data.list;
                if(da){
                    $('#all_mem').text('('+data.totalCount+')');
                    $('#del_group').data('id', id);
                    self.addTab(da);
                }else{
                    alert('暂无数据');
                }
            },'json');
        },
        addTab:function(data){
            var self = this, html = '';
            for(var i = 0;i<data.length;i++){
                html += '<tr><td class="tb-check"><label><input class="tb-checkbox" type="checkbox" data-name="checkbox">' +
                '<input type="hidden" value="'+data[i].account+'"></label></td>' +
                '<td class="tb-name">'+(data[i].isManager?'<img class="icon" src="../images/u328.png">':'')+'<span>'+data[i].name+'</span></td>' +
                '<td class="tb-phone"><span>'+data[i].phone+'</span></td>' +
                '<td class="tb-email"><span>'+data[i].email+'</span></td>' +
                '<td class="tb-permission JS_show">' +self.getAccess(data[i].accesslevel) +
                '<div data-name="admin" class="btn color-blue" data-old="'+data[i].accesslevel+'">管理权限</div></td></tr>';
            }
            $('#data').html(html);
        },
        getAccess:function(string){
            var access = string.split(''),
                limit = ['上传','下载','预览','重命名','删除','创建'];
            var html = '';
            for(var i = 0;i<limit.length;i++){
                if(access[i]=='1'){
                    html += '<div data-name="limit" class="btn">'+limit[i]+
                    '<input type="hidden" value="1" name="'+limit[i]+'"><div data-name="del" class="del"></div></div>';
                }else{
                    html += '<div data-name="limit" class="btn off">'+limit[i]+
                    '<input type="hidden" value="0" name="'+limit[i]+'"><div data-name="del" class="del"></div></div>';
                }
            }
            return html;
        },
        eventOfLimit:function(node){
            var show = node.parents('.tb-permission').hasClass('JS_show');
            //console.log(operate);
            if(!show){/*管理下*/
                node.children('input').attr('value','1');/*权限置为1*/
                node.removeClass('off').addClass('on');/*去除按钮隐藏样式，显示关闭按钮*/
            }
        },
        eventOfDel:function(node){
            var show = node.parents('.tb-permission').hasClass('JS_show');
            if(!show){
                var parent = node.parent('.btn');
                parent.children('input').attr('value','0');/*权限置为0*/
                parent.removeClass('on').addClass('off');/*隐藏关闭按钮*/
            }
        },
        eventOfAdmin:function(node){
            var self = this;
            var parent = node.parents('.tb-permission');
            var btn = parent.find('.btn'), show = parent.hasClass('JS_show');
            if(!show){
                node.html('管理权限');
                parent.addClass('JS_show');/*管理标识改为false*/
                btn.each(function(){/*清除添加的显示样式*/
                    $(this).removeClass('on');
                });
                /*获取要提交的信息*/
                var data = self._limitData(node);
                if(node.data('old') != data.accessLevel){
                    node.attr('data-old', data.accessLevel);
                    self._updateLimit(data);
                }
            }else{
                node.html('确定');
                parent.removeClass('JS_show');/*管理标识改为true*/
                btn.each(function(){/*权限全部显示*/
                    if(!$(this).hasClass('off')) $(this).addClass('on');
                });
                node.attr('data-old', self._limitData(node).accessLevel);
            }
        },
        submitSearch:function(tg){
            var self = this;
            var name = $('input[name="searchName"]').val();
            var id = $('#group').data('id');
            //console.log(name, id);
            $.ajax({
                url:tg.data('url'),
                data:{id:id,searchName:name},
                type:'get',
                success:function(data){
                    if(data.code == 200){
                        self.addTab(data.list);
                    }
                }
            });
        },
        _limitData:function(node){
            var tr = node.parents('tr');
            var msg = tr.find('input[type="hidden"]');
            var account = msg.first().val();
            var limit = '';
            for(var i = 1;i<msg.length;i++){
                limit += $(msg[i]).val();
            }
            return {
                id:$('#group').data('id'),
                account:account,
                accessLevel:limit
            }
        },
        _updateLimit:function(con){
            //console.log(con);
            var url = '';
            $.ajax({
                url:url,
                type:'post',
                data:con,
                dataType:'html',
                success:function(data){
                    if(data.code==200){
                        alert('权限修改成功');
                    }
                }
            });
        }
    };

    new Share().init();
});