/**
 * Created by bobo on 2016/11/8.
 */
function Upload(){
    this.doc = parent.document;
    this.tar = $(this.doc.getElementsByClassName('JS_target')[0]);
    this.path = $(this.doc.getElementById('group'));
    this.url = this.tar.data('url');
    this.init = function(){
        //console.log(this.tar);
        this.initPath();
        this.initForm();
    }
}
Upload.prototype = {
    initForm:function(){
        var self = this;
        var name = self.tar.data('name');
        //console.log(name);
        if(name == 'change'){
            var data = self.getMemData();
            self.setFormData(data);
        }
    },
    initPath:function(){
        var self = this;
        var pid = self.path.data('id');
        $('#path').html(self.path.html());
        $('#pid').attr('value', pid);
    },
    getMemData:function(){
        var self = this, msg = [];
        var papa = self.tar.parents('tr');
        var data = papa.find('span');
        data.each(function(k, v){
            var text = $(this).text();
            if(k==1){
                text = text.substring(text.indexOf("(")+1,text.indexOf(")"));
            }
            msg.push(text);
        });
        return msg;
    },
    setFormData:function(data){
        var self = this;
        var form = $('form');
        var inputs = form.find('.input');
        inputs.each(function(k, v){
            $(this).attr('value', data[k]);
        });
        if(self.url) form.attr('action', self.url);
    }
};
new Upload().init();