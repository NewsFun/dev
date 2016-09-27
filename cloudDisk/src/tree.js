/**
 * Created by bobo on 2016/9/19.
 */
(function(){
    function Tree(con){
        this.title = null;
        this.baseH = con.baseH;
        this.openClass = con.openClass;
        this.closeClass = con.closeClass;
        this.target = null;
    }
    Tree.prototype = {
        init:function(){
            this.openTree();
        },
        openTree:function(){
            var self = this;
            self.title = $('.tree_title');
            self.title.each(function(){
                $(this).unbind('click').on('click', function(){
                    var v = $(this);
                    self._nodeClick(v);
                });
            });
        },
        _getNode:function(url, pid){
            var self = this;
            $.get(url, function(data){
                self._addNode(data, pid);
            },'json');
        },
        _nodeClick:function(node){
            var self = this;
            var pid = node.data('id');
            var title = node.children('.tree_icon');
            if(title.hasClass(self.closeClass)){
                title.removeClass(self.closeClass).addClass(self.openClass);
                node.parent().removeAttr('style');
                if(!node.opened){
                    var url = '/json/tree'+pid+'.json';
                    //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do?parentId='+pid;
                    self._getNode(url, pid);
                    node.opened = true;
                }
            }else{
                title.removeClass(self.openClass).addClass(self.closeClass);
                node.parent().css('height', self.baseH);
            }
            self._getPath(node);
        },
        _getPath:function(node){
            var parents = node.parents('.tree_branch');
            var path = [];
            for(var i = parents.length-1;i>=0;i--){
                var p = $(parents[i]).find('.tree_name')[0];
                path.push($(p).text());
            }
            return path;
        },
        _addNode:function(data, pid){
            var self = this;
            var html = '';
            for(var i = 0;i<data.length;i++){
                if(data[i].user){
                    html += '<li>' +
                    '<div class="tree_leaf" data-id="'+data[i].id+'">' +
                    '<span class="tree_name">'+data[i].name+'</span>' +
                    '</div></li>';
                }else{
                    html += '<li>' +
                    '<div class="tree_title" data-id="'+data[i].id+'">' +
                    '<span class="tree_icon icon_solid"></span><span class="tree_name">'+data[i].name+'</span>' +
                    '</div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }
            }
            $('#'+pid).html(html);
            self.openTree();
        }
    };
    window.Tree = Tree;
})();