/**
 * Created by bobo on 2016/9/29.
 */
$(function(){
    function Share(){
        this.operate = false;
        this.init = function(){
            this.initClick();
            this.initTab();
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
                var id = $(this).data('id');
                self.getData(id);
            });
        },
        initTab:function(){
            var self = this;
            $('#data').on('click', function(e){
                var tar = $(e.target), name = tar.data('name');
                switch (name){
                    case 'limit':
                        self.eventLimit(tar);
                        break;
                    case 'admin':
                        self.eventAdmin(tar);
                        break;
                    case 'del':
                        self.eventDel(tar);
                        break;
                    default :break;
                }
            });
        },
        getData:function(id){
            var self = this;
            var url = '../json/table'+id+'.json';
            $.get(url, function(data){
                var da = data.list;
                if(da){
                    self.addTab(da);
                }else{
                    console.log('no data');
                }

            },'json');
        },
        addTab:function(data){
            var self = this, html = '';
            for(var i = 0;i<data.length;i++){
                html += '<tr><td class="tb-check"><label><input class="tb-checkbox" type="checkbox"></label></td>' +
                '<td class="tb-name">'+(data[i].isManager?'<img class="icon" src="../images/u328.png">':'')+'<span>'+data[i].name+'</span></td>' +
                '<td class="tb-phone"><span>'+data[i].phone+'</span></td>' +
                '<td class="tb-email"><span>'+data[i].email+'</span></td>' +
                '<td class="tb-permission" data-state="false">' +self.getAccess(data[i].accesslevel) +
                '<div data-name="admin" class="button color-blue">管理权限</div></td><td class="tb-search"></td></tr>';
            }
            $('#data').html(html);
        },
        getAccess:function(string){
            var access = string.split(''),
                limit = ['上传','下载','预览','重命名','删除','创建'];
            var html = '';
            for(var i = 0;i<limit.length;i++){
                if(access[i]=='1'){
                    html += '<div data-name="limit" class="button">'+limit[i]+
                    '<input type="hidden" value="1" name="'+limit[i]+'"><div data-name="del" class="del"></div></div>';
                }else{
                    html += '<div data-name="limit" class="button off">'+limit[i]+
                    '<input type="hidden" value="0" name="'+limit[i]+'"><div data-name="del" class="del"></div></div>';
                }
            }
            return html;
        },
        eventLimit:function(node){
            var operate = node.parents('.tb-permission').data('state');
            //console.log(operate);
            if(operate){/*管理下*/
                node.children('input').val('1');
                node.removeClass('off');/*显示按钮*/
            }
            node.children('.del').addClass('on');
        },
        eventDel:function(node){
            var operate = node.parents('.tb-permission').data('state');
            node.removeClass('on');
            var parent = node.parent('.button');
            if(!operate) parent.addClass('off');/*非管理下删除权限*/
            parent.children('input').val('0');
        },
        eventAdmin:function(node){
            var parent = node.parents('.tb-permission');
            var limits = parent.find('.off'), operate = parent.data('state');
            if(!operate){
                node.html('关闭管理');
                parent.data('state', true);
                limits.each(function(){
                    $(this).show();
                });
            }else{
                node.html('管理权限');
                parent.data('state', false);
                limits.each(function(){
                    $(this).removeAttr('style');
                });
            }

        }
    };
    new Share().init();
});