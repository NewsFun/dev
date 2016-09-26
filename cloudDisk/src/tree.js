/**
 * Created by bobo on 2016/9/19.
 */
(function(){
    function Tree(con){
        this.title = $('.tree_title');
        this.baseH = con.baseH;
        this.openClass = con.openClass;
        this.closeClass = con.closeClass;
        this.target = null;
    }
    Tree.prototype = {
        init:function(){
            this.openTree();
            //this.initCookie();
        },
        openTree:function(){
            var self = this;
            self.title.each(function(){
                if($(this).addOpen) return true;
                $(this).on('click', function(){
                    self._nodeClick($(this));
                    $(this).addOpen = true;
                });
            });
        },
        _getData:function(url, pid){
            var self = this;
            $.get(url, function(data){
                //console.log(data);
                self._addHtml(data, pid);
            },'json');
        },
        _operate:function(){
            var names = $('tree_name');
        },
        _nodeClick:function(node){
            var self = this;
            var pid = node.data('id');
            var title = node.children('.tree_icon');
            if(title.hasClass(self.closeClass)){
                title.removeClass(self.closeClass).addClass(self.openClass).html('-');
                node.parent().removeAttr('style');
                if(!$(this).data('opened')){
                var url = '/json/tree'+pid+'.json';
                //var url = 'http://localhost.home.news.cn:8080/xhVdisk2/vdisk/control/address/get_child_address.do?parentId='+pid;
                self._getData(url, pid);
                node.data('opened', 'true');
                }
            }else{
                title.removeClass(self.openClass).addClass(self.closeClass).html('+');
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
        _addHtml:function(data, pid){
            var self = this;
            var html = '';
            for(var i = 0;i<data.length;i++){
                if(data[i].user){
                    html += '<li>' +
                    '<div class="tree_title" data-id="'+data[i].id+'">' +
                    '<span class="tree_name">'+data[i].name+'</span>' +
                    '</div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }else{
                    html += '<li>' +
                    '<div class="tree_title" data-id="'+data[i].id+'">' +
                    '<span class="tree_icon icon_solid">+</span><span class="tree_name">'+data[i].name+'</span>' +
                    '</div>' +
                    '<ul id="'+data[i].id+'" class="tree_branch"></ul></li>';
                }
            }
            $('#'+pid).html(html);

            self.title = $('.tree_title');
            self.openTree();
        },
        initCookie:function(){
            var cookie = document.cookie;
            if(cookie.length>0){
                var ticket = cookie.indexOf('ticket');
            }else{
                console.log('no cookie');
            }
        }
    };
    window.Tree = Tree;
})();