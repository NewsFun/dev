/**
 * Created by bobo on 2016/9/13.
 */
$(document).ready(function(){
    var W = $(window).width(),
        H = $(window).height(),
        WEST = $('#ui-layout-west'),
        EAST = $('#ui-layout-center'),
        NORTH = $('#ui-layout-north'),
        SOUTH = $('#ui-layout-south');
    function Disk(){}
    Disk.prototype = {
        init:function(){
            this.initEast();
        },
        initEast:function(){
            var self = this;
            var pd = self._getPadding(EAST);
            var sh = ~~SOUTH.height(),
                ew = W-WEST.width()-pd[3]-pd[1],
                eh = H-NORTH.height()-sh-pd[0]-pd[2],
                wh = H-NORTH.height()-sh;
            WEST.css('height', wh+'px');
            EAST.css('width', ew+'px').css('height', eh+'px');
        },
        _getPadding:function(jquery){
            var pd = jquery.css('padding').split(' ');
            //console.log(pd);
            var ps = {};
            ps[0] = parseFloat(pd[0]);
            ps[1] = isNaN(parseFloat(pd[1]))?ps[0]:parseFloat(pd[1]);
            ps[2] = isNaN(parseFloat(pd[2]))?ps[0]:parseFloat(pd[2]);
            ps[3] = isNaN(parseFloat(pd[3]))?ps[1]:parseFloat(pd[3]);
            //console.log(ps);
            return ps;
        }
    };

    new Disk().init();
});