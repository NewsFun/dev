/**
 * Created by bobo on 2016/11/20.
 */
(function(){
    function Popup(con){
        this.initCol = con.initCol;
        this.activeCol = con.activeCol;
        this.title = con.title;
        this.table = con.table;
        this.init = function(){
            var self = this;
            self.chooseMem();
            self.deleteMem();
        };
    }
    Popup.prototype = {
        initGroupId:function(){
            var self = this;
            var init = self.title.first().data('name');
            self.chooseColumn(self.initCol || init);
            self.titleClick();
        },
        chooseColumn:function(con){
            var self = this;
            var name = con;
            self.title.each(function(){
                var tar = $(this).data('name');
                self.isActive(tar)&&(tar==name)?$(this).addClass('on'):$(this).removeClass('on');
            });
            self.table.each(function(){
                var tar = $(this).data('name');
                self.isActive(tar)(tar==name)?$(this).show():$(this).hide();
            });
        },
        titleClick:function(){
            var self = this;
            self.title.on('click', function(){
                self.chooseColumn($(this).data('name'));
            });
        },
        isActive:function (name) {
            var self = this, active = true;
            for(var i = 0;i<self.activeCol.length;i++){
                self.activeCol[i] == name?active = true:active = false;
            }
            return active;
        }
    };
    window.Popup = Popup;
    // new Popup().init();
})();