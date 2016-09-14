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
            this._initEast();
        },
        _initEast:function(){
            var pd = EAST.css('padding')?parseInt(EAST.css('padding')):0;
            var sh = SOUTH.height()?SOUTH.height(): 0,
                ew = W-WEST.width()-pd*2,
                eh = H-NORTH.height()-sh-pd,
                wh = H-NORTH.height()-sh;
            WEST.css('height', wh+'px');
            EAST.css('width',ew+'px').css('height',eh+'px');
        }
    };

    new Disk().init();
});