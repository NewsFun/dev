(function (win,$,undefined) {
	var Rd = Math.round;
	var calendar = $('#calendar');
	var days = getDays(80);
	var age = 27;
	function getProportion(age) {
		var pass = getDays(age);
		console.log(pass);
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
	createGrid(days);
	getProportion(age);
})(window,jQuery);