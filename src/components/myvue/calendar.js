(function (win,$,undefined) {
	var Rd = Math.round;
	var calendar = $('#calendar');
	var days = getDays(80);
	var age = 27;
	var now = new Date();
	var born = '2000/1/1 00:00:00';
	function test() {
		var bday = new Date(born).getTime();
		var date = now.getTime();
		console.log(bday);
	}
	function getProportion(age) {
		var pass = getDays(age);
		var divs = calendar.children('div');
		divs.each(function (k,v) {
			if(k<pass) $(this).addClass('passed');
		});
	}
	function createGrid(age) {
		var html = '';
		for(var i = 0;i<age;i++){
			html+='<div></div>';
		}
		calendar.append(html);
	}
	function getDays(years) {
		var exs = 48*60+46;
		var exh = 5+exs/3600;
		var exd = 365+exh/24;
		return Rd(exd*years);
	}
	function timeDelta(start, end) {
		if(!end) end = new Date();
		var st = new Date(start).getTime();
		var et = new Date(end).getTime();
		var td = et-st;
	}
	// createGrid(days);
	// getProportion(age);
	// test();
})(window,jQuery);