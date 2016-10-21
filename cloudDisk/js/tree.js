/**
 * Created by bobo on 2016/9/19.
 */
(function(){
    function Tree(con){
        this.title = null;
        this.baseH = con.baseH;
        this.openClass = con.openClass;
        this.closeClass = con.closeClass;
        this.path = [];
    }
    Tree.prototype = {
        init:function(){
            var self = this;
            $('#tree_content').on('click', function(e){
                var tar = $(e.target);
                if(tar.hasClass('tree_icon')){
                    self.path = [];
                    self._openTree(tar);
                }
                self._getPath(tar);
                self._addPath(self.path);
            });
        },
        _getPath:function(node){
            var self = this;
            var ps = node.next('.tree_name').text();
            self.path.unshift(ps);

            var pid = node.data('pid');/*查找父节点*/
            if(pid){
                var next = $('#'+pid).prev('.tree_title').children('.tree_icon');
                self._getPath(next);
            }
            //console.log(self.path);
        },
        _openTree:function(node){
            var self = this;
            var pid = node.data('id');
            if(node.hasClass(self.closeClass)){/*打开树节点*/
                node.removeClass(self.closeClass).addClass(self.openClass);
                node.parent().parent('li').removeAttr('style');
                if(!node.opened){
                    var url = '/json/tree'+pid+'.json';
                    //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do?parentId='+pid;
                    $.get(url, function(data){
                        self._addNode(data, pid);
                    },'json');
                    node.opened = true;
                }
            }else{/*关闭树节点*/
                node.removeClass(self.openClass).addClass(self.closeClass);
                node.parent().parent('li').css('height', self.baseH);
            }
        },
        _addNode:function(data, pid){
            var html = '', node = '';
            for(var i = 0;i<data.length;i++){
                if(data[i].user){/*加载数据*/
                    html += '<tr>' +
                    '<td class="tb-check"><label><input class="tb-checkbox" type="checkbox"></label></td>' +
                    '<td class="tb-name"><span>'+data[i].name+'</span><span class="tb-id"> ('+data[i].pinyin+') </span></td>' +
                    '<td class="tb-post"><span>'+data[i].job+'</span></td>' +
                    '<td class="tb-phone"><span>'+data[i].mobile+'</span></td>' +
                    '<td class="tb-email"><span>'+data[i].email+'</span></td></tr>';
                }else{/*加载节点*/
                    node += '<li>' +
                    '<div class="tree_title"><a class="tree_icon icon_solid" data-id="'+data[i].id+'" data-pid="'+pid+'"></a>' +
                    '<span class="tree_name">'+data[i].name+'</span></div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }
            }
            $('#'+pid).html(node);
            $('#data').html(html);
        },
        _addPath:function(path){
            var html = '';
            for(var i = 0;i<path.length;i++){
                html += '<span>'+path[i]+' </span>'
            }
            $('#path').html(html);
        }
    };
    window.Tree = Tree;
})();