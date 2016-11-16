/**
 * Created by bobo on 2016/9/19.
 */
(function(){
    function Tree(con){
        this.title = null;
        this.openClass = con.openClass;
        this.closeClass = con.closeClass;
        this.domTags = con.domTags;
        this.pathOperate = con.pathOperate;
        this.path = [];
        this.id = '';
        this.pid = 'tree_content';
    }
    Tree.prototype = {
        init:function(){
            var self = this;
            $('#tree_root').on('click', function(e){
                var tar = $(e.target);
                if(tar.hasClass('tree_icon')){
                    self.path = [];
                    self._openTree(tar);
                }
                var pm = self._getPath(tar);
                if(self.pathOperate) self.pathOperate(pm);
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
            return {
                id:node.data('id'),
                pid:pid,
                path:self.path
            };
            //console.log(self.path);
        },
        _openTree:function(node){
            var self = this;
            var id = node.data('id');
            //var id = self.id;
            if(node.hasClass(self.closeClass)){/*打开树节点*/
                node.removeClass(self.closeClass).addClass(self.openClass);
                $('#'+id).removeAttr('style');
                if(!node.opened){
                    //var url = 'address/get_child_address.do?parentId='+id;
                    var url = '../json/tree'+id+'.json';
                    $.get(url, function(data){
                        self._addNode(data, id);
                        if(self.domTags) self.domTags(data, id);
                    },'json');
                    node.opened = true;
                }
            }else{/*关闭树节点*/
                node.removeClass(self.openClass).addClass(self.closeClass);
                $('#'+id).css('height', 0);
            }
        },
        _addNode:function(data, pid){
            var node = '';
            for(var i = 0;i<data.length;i++){
                if(!data[i].user){/*加载节点*/
                    node += '<li>' +
                    '<div class="tree_title"><a class="tree_icon icon_solid" data-id="'+data[i].id+'" data-pid="'+pid+'"></a>' +
                    '<span class="tree_name">'+data[i].name+'</span></div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }
            }
            $('#'+pid).html(node);
        }
    };
    window.Tree = Tree;
})();