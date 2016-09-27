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
            var self = this;
            self.initEast();
            self.initCBox();
            self.initCAll();
        },
        initEast:function(){
            var sh = ~~SOUTH.height(),
                ew = W-WEST.width(),
                eh = H-NORTH.height()-sh,
                wh = H-NORTH.height()-sh;
            WEST.css('height', wh+'px');
            EAST.css('width', ew+'px').css('height', eh+'px');
        },
        initCAll:function(){
            $('#selectAll').on('click',function(){
                var ca = $(this).is(':checked');
                $('.tb-checkbox').each(function(){
                    var ct = $(this).is(':checked');
                    if(ct!==ca) $(this).trigger('click');
                });
            });
        },
        initCBox:function(){
            $('.tb-checkbox').on('click',function(){
                var tr = $(this).parents('tr');
                $(this).is(':checked')?tr.addClass('on'):tr.removeClass('on');
            });
        }
    };

    new Disk().init();
});