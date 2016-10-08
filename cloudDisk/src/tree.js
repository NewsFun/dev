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
                self.path = self._getPath(tar);
                self._addPath(self.path);

                if(tar.hasClass('tree_icon')){
                    self._openTree(tar);
                }else if(tar.hasClass('tree_leaf')){
                    self._getBuddy(tar);
                }
            });
        },
        _getPath:function(node){
            var ps = node.parents('.tree_branch');
            var path = [];
            for(var i = ps.length-1;i>=0;i--){
                var p = $(ps[i]).find('.tree_name')[0];
                path.push($(p).text());
            }
            return path;
        },
        _openTree:function(node){
            var self = this;
            var pid = node.data('id');
            if(node.hasClass(self.closeClass)){
                node.removeClass(self.closeClass).addClass(self.openClass);
                //console.log(node.parent().parent('li'));
                node.parent().parent('li').removeAttr('style');
                if(!node.opened){
                    var url = '/json/tree'+pid+'.json';
                    //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do?parentId='+pid;
                    $.get(url, function(data){
                        self._addNode(data, pid);
                    },'json');
                    node.opened = true;
                }
            }else{
                node.removeClass(self.openClass).addClass(self.closeClass);
                node.parent().parent('li').css('height', self.baseH);
            }
        },
        _getBuddy:function(node){
            var self = this;
            var pid = node.data('id');
            var url = '/json/tree'+pid+'.json';
            //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do?parentId='+pid;
            $.get(url, function(data){
                self._addBuddy(data, pid);
            },'json');
        },
        _addNode:function(data, pid){
            var html = '';
            for(var i = 0;i<data.length;i++){
                if(data[i].user){/*加载数据*/
                    html += '<li>' +
                    '<div>' +
                    '<a class="tree_name tree_leaf" data-id="'+data[i].id+'">'+data[i].name+'</a>' +
                    '</div></li>';
                }else{/*加载节点*/
                    html += '<li>' +
                    '<div class="tree_title"><a class="tree_icon icon_solid" data-id="'+data[i].id+'"></a>' +
                    '<span class="tree_name">'+data[i].name+'</span></div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }
            }
            $('#'+pid).html(html);
        },
        _addBuddy:function(data){
            var html = '';
            for(var i = 0;i<data.length;i++){
                html += '<tr>' +
                '<td class="tb-check"><label><input class="tb-checkbox" type="checkbox"></label></td>' +
                '<td class="tb-name"><span>'+data[i].name+'</span><span class="tb-id"> ('+data[i].pinyin+') </span></td>' +
                '<td class="tb-post"><span>'+data[i].job+'</span></td>' +
                '<td class="tb-phone"><span>'+data[i].mobile+'</span></td>' +
                '<td class="tb-email"><span>'+data[i].email+'</span></td>' +
                '<td class="tb-search"></td></tr>';
            }
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