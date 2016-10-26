/**
 * Created by bobo on 2016/10/24.
 */
function AddMember(){
    this.init = function(){
        var self = this;
        new Tree({
            openClass:'icon_hollow',
            closeClass:'icon_solid',
            domTags: self.domTags
        }).init();
        self.choseMem();
        self.deleteMem();
    };
}
AddMember.prototype = {
    domTags:function(data, pid){
        var html = '';
        for(var i = 0;i<data.length;i++){
            if(data[i].user){/*加载数据*/
                html += '<li class="leaf_'+i+'"><div class="tree_title">' +
                '<span class="tree_name" data-name="name" data-pid="'+data[i].parentId+'">'+data[i].name+'</span></div></li>';
            }
        }
        $('#'+pid).prepend(html);
    },
    choseMem:function(){
        $('#tree_content').on('click', function(e){
            var tar = $(e.target);
            var name = tar.data('name');
            if(name == 'name'){
                if(!tar.hasClass('on')){
                    tar.addClass('on');
                    var html = tar.parent().parent('li').clone();
                    //console.log(html);
                    $('#data').append(html);
                }
            }
        });
    },
    deleteMem:function(){
        $('#data').on('click', function(e){
            var tar = $(e.target);
            var name = tar.data('name');
            if(name == 'name'){
                var pid = tar.data('pid');
                var html = tar.parent().parent('li');
                var clazz = html.attr('class');
                html.remove();
                var node = $('#'+pid).find('.'+clazz);
                //console.log(node);
                node.find('.tree_name').removeClass('on');
            }
        });
    }
};
new AddMember().init();