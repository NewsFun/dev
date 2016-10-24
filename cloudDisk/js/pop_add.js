/**
 * Created by Administrator on 2016/10/24.
 */
function AddMember(){
    this.init = function(){
        var self = this;
        new Tree({
            openClass:'icon_hollow',
            closeClass:'icon_solid',
            domTags: self.domTags
        }).init();
    };
    this.domTags = function(data, pid){
        var html = '';
        for(var i = 0;i<data.length;i++){
            if(data[i].user){/*加载数据*/
                html += '<li><div class="tree_title"><span class="tree_name" data-name="name">'+data[i].name+'</span></div></li>';
            }
        }
        $('#'+pid).prepend(html);
    }
}
AddMember.prototype = {

};
new AddMember().init();