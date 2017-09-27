(function (win,$,undefined) {
	var modList = [];
	var xhfor = 'xh-for';
	var teststr = '<div class="info-unfold" id="J-info-unfold" xh-for="e">abcdefg<em class="layout-icons layout-icons_down-arrow"></em></div>';
	var endt = '</em></div>';
	var testd = {
		a:'a',
		b:'b',
		c:'c',
		d:'d',
		e:[{
			e1:'e1',
			e2:'e2'
		}]
	};

	var reg = /\{\{((?:.|\n)+?)\}\}/g;
	var tagname = /<\s*(\w+)/g;
	var endtag = /<\s*\//g;
	var forexp = attrRegExp(xhfor);
	var subtag = /<[^<]*/g;

	win.staticHtml = function(el, data){
		var mel = $(el), text = '';
		if(mel.length<1) return false;
		text = mel.html();
		mel.html(dataInject(text, data));
	};
	function dataInject(text, data){
		while(true){
			var c = reg.exec(text);
			if(c === null) return text;
			text = text.replace(c[0], data[c[1]]);
		}
	}
	function getForStr(str) {
		var fe = forexp.exec(str);
		// console.log(fe);
		if(fe === null) return;
		var tn = tagname.exec(str)[1];
		modList.push();
	}
	
	function attrRegExp(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","g");
	}
	function parseStr(str) {
		var substr = subtag.exec(str);
		getForStr(substr);
	}
	parseStr(teststr);

})(window, jQuery);